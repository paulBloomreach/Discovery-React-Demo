import React, {createContext, useContext, useEffect, useState} from 'react';
import * as queryString from 'querystring';
import axios from 'axios';
import {SearchTextContext} from './SearchTextProvider';

/*
    Executes the Suggest query and stores the results in its context
*/
const AutoSuggestContext = createContext({
  searchSuggestions: [],
  querySuggestions: [], // v2
  attributeSuggestions: [], // v2
  originalQuery: '',
});

const AutoSuggestProvider = ({children}) => {
  const {searchText} = useContext(SearchTextContext);
  const [autoSuggestData, updateAutoSuggestData] = useState({});

  const config = {
    account_id: process.env.REACT_APP_BRSM_ACCOUNT_ID,
    domain_key: process.env.REACT_APP_BRSM_DOMAIN_KEY,
    api_url: process.env.REACT_APP_BRSM_SUGGEST_API,
  };

  const generateURL = () => {
    let query = {
      account_id: config.account_id,
      domain_key: '',
      auth_key: '',
      request_type: 'suggest',
      catalog_views: config.domain_key,
      request_id: new Date().getTime(),
      _br_uid_2: '_br_uid_2',
      ref_url: '',
      url: window.location.href,
      q: searchText,
    };
    return `${config.api_url}?${queryString.stringify(query)}`;
  };

  useEffect(() => {
    if (searchText.length === 0) return;

    let url = generateURL();

    console.log('SUGGEST URL: ', url);

    axios
      .get(url)
      .then((response) => {
        console.log('SUGGEST RESPONSE: ', response.data);
        let d = response.data;
        let ds = d.suggestionGroups[0]?.searchSuggestions;
        let dq = d.suggestionGroups[0]?.querySuggestions;
        let da = d.suggestionGroups[0]?.attributeSuggestions;

        if (d.suggestionGroups[0]) {
          updateAutoSuggestData({
            searchSuggestions: ds ? ds : '',
            querySuggestions: dq ? dq : '',
            attributeSuggestions: da ? da : '',
            originalQuery: d.queryContext.originalQuery,
          });
        }
      })
      .catch((error) => {
        console.log('Suggest Error status: ', error);
        console.log('Suggest Error status: ', error.response?.status);
        console.log('Suggest Error message: ', error.response?.data?.message);
      });

    // eslint-disable-next-line
  }, [searchText]);

  return <AutoSuggestContext.Provider value={autoSuggestData}>{children}</AutoSuggestContext.Provider>;
};

export {AutoSuggestContext, AutoSuggestProvider};
