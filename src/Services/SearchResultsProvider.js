import React, {createContext, useContext, useEffect, useState} from 'react';
import * as queryString from 'querystring';
import axios from 'axios';
import {SearchTextContext} from './SearchTextProvider';
import {UserContext} from './UserProvider';
import {useCookies} from 'react-cookie';

/*
  Executes the Search for text and stores the results in its context.  It handles
  including things like view_id and facets in the query.

*/

const SearchResultsContext = createContext({
  campaign: {},
  categories: [],
  did_you_mean: [],
  facet_counts: [],
  variants: [],
  docs: [],
  numFound: 0,
  priceMin: 0,
  priceMax: 0,
  autoCorrectQuery: '',
  relaxedQuery: '',
  redirectedUrl: '',
});

const SearchResultsProvider = ({ children }) => {
  // Setting up SearchResult context
  const [searchResultsData, updateSearchResultsData] = useState({});

  // Get stuff from SearchText context
  const {
    priceFacetSearch,
    pricePreviousMin,
    pricePreviousMax,
    start,
    rows,
    executeSearch,
    facets,
    submittedSearchText,
    setSearchInfo,
  } = useContext(SearchTextContext);

  // Get stuff from User context
  const { sortSelected, currentUserView,  userID } = useContext(UserContext);

  // get recent keyword searchs from cookie
  const [cookies] = useCookies();
  let additional_ref_url = '&recentKeywordSearches=' + cookies.recentKeywordSearch;

  // some config data from index.js
  const config = {
    account_id: process.env.REACT_APP_BRSM_ACCOUNT_ID,
    domain_key: process.env.REACT_APP_BRSM_DOMAIN_KEY,
    api_url: process.env.REACT_APP_BRSM_API,
    config_rows: process.env.REACT_APP_BRSM_ROWS,
  };

  // Setting up the rows param
  let actualRows = config.config_rows;
  if (rows !== 0) {
    actualRows = rows;
  }

  // Setting up the start param
  let actualStart = 0;
  if (start) {
    actualStart = start;
  }

  // setting sort
  let sortBy = '';
  if (sortSelected) sortBy = sortSelected;

  // setting view_id
  let view_id = '';
  if (currentUserView.length > 0) view_id = currentUserView;

  // User Selection
  if (userID !== '') {
    additional_ref_url += '|' + userID;
  }

  // basic query param stuff
  const getBaseQSParams = () => {
    return {
      account_id: config.account_id,
      auth_key: '',
      domain_key: config.domain_key,
      request_type: 'search',
      view_id: view_id,
      fl: 'pid,title,price,sale_price,thumb_image,url,description,' + process.env.REACT_APP_SEARCH_EXTRA_FL_LIST,
      start: actualStart,
      rows: actualRows,
      request_id: new Date().getTime(),
      _br_uid_2: '_br_uid_2',
      'stats.field': 'sale_price',
      ref_url: window.location.origin + process.env.REACT_APP_BRSM_REF_URL + additional_ref_url,
      url: window.location.href,
    };
  };

  // generating the query URL
  const generateURL = () => {
    let searchQS = { ...getBaseQSParams() };

    let qStr = submittedSearchText;
    let searchType = 'keyword';

    // Facets selected?
    let refineString = '';
    facets.forEach((f) => {
      refineString += f.facetName + ':"' + f.facetValue + '" ';
    });

    let query = '';
    if (refineString === '') {
      query = {
        q: qStr,
        search_type: searchType,
      };
    } else {
      query = {
        q: qStr,
        fq: refineString,
        search_type: searchType,
      };
    }

    searchQS = { ...searchQS, ...query };
    return `${config.api_url}?${queryString.stringify(searchQS)}`;
  };

  useEffect(() => {

    if (executeSearch && submittedSearchText) {
      let url = generateURL();

      // SortParam
      if (sortBy) {
        url += '&sort=' + sortBy;
      }

      console.log('SEARCH URL: ', url);

      axios
        .get(url)
        .then((response) => {
          console.log('SEARCH RESPONSE: ', response.data);
          let d = response.data;

          // handle relaxedQuery (for SearchInfo display only)
          let relaxed = '';
          let meta = d.metadata;
          if (meta) {
            let q = meta.query;
            if (q !== undefined) {
              let mod = q.modification;
              if (mod !== undefined) {
                if (mod.mode === 'relaxedQuery') relaxed = mod.value;
              }
            }
          }

          // handle redirects
          let redirect = '';
          let kr = d.keywordRedirect;
          if (kr) {
            redirect = kr['redirected url'];
          }

          // setting min / max for price range facet
          let min = 0;
          let max = 0;
          if (d.stats) {
            if (d.stats.stats_fields) {
              let priceRangeField = process.env.REACT_APP_PRICE_RANGE_FIELD;
              if (priceRangeField === 'sale_price') {
                if (d.stats.stats_fields.sale_price) {
                  min = d.stats.stats_fields.sale_price.min;
                  max = d.stats.stats_fields.sale_price.max;
                }
              } else if (priceRangeField === 'price') {
                if (d.stats.stats_fields.price) {
                  min = d.stats.stats_fields.price.min;
                  max = d.stats.stats_fields.price.max;
                }
              }
            }
          }

          // if the last search was a priceFacet search, then keep the previous min / max
          if (priceFacetSearch) {
            min = pricePreviousMin;
            max = pricePreviousMax;
          }

          updateSearchResultsData({
            campaign: d.campaign,
            categories: d.facet_counts.facet_fields.category,
            did_you_mean: d.did_you_mean,
            facet_counts: d.facet_counts,
            variants: d.variants,
            docs: d.response.docs,
            numFound: d.response.numFound,
            priceMin: min,
            priceMax: max,
            autoCorrectQuery: d.autoCorrectQuery,
            relaxedQuery: relaxed,
            redirectedUrl: redirect,
          });

          // defaults for next search
          setSearchInfo({
            searchText: '',
            executeSearch: false,
          });
        })
        .catch((error) => {
          console.log('Search Error status: ' + error.response?.status);
          console.log('Search Error message: ' + error.response?.data?.message);
        });
    }
    // eslint-disable-next-line
  }, [executeSearch]);

  return <SearchResultsContext.Provider value={searchResultsData}>{children}</SearchResultsContext.Provider>;
};

export { SearchResultsContext, SearchResultsProvider };
