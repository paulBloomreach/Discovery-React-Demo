import {createContext, useState} from 'react';

/*
  This just stores info about search text / executions and makes that data available to
  other compoents that need it.
*/

const SearchTextContext = createContext({
  searchText: '',
  submittedSearchText: '',
  priceFacetSearch: false,
  priceSelectedMin: 0,
  priceSelectedMax: 0,
  pricePreviousMin: 0,
  pricePreviousMax: 0,
  executeSearch: false,
  start: 0,
  rows: 0,
  facets: [],
  setSearchInfo: (searchData) => {},
});

const SearchTextProvider = ({ children }) => {
  const setSearchInfo = ({
    searchText,
    submittedSearchText,
    priceFacetSearch,
    priceSelectedMin,
    priceSelectedMax,
    pricePreviousMin,
    pricePreviousMax,
    executeSearch,
    start,
    rows,
    facets,
  }) => {
    updateSearchTextData((prevState) => {
      const newState = { ...prevState };

      if (facets !== undefined) newState.facets = facets;
      if (searchText !== undefined) newState.searchText = searchText;
      if (start !== undefined) newState.start = start;
      if (rows !== undefined) newState.rows = rows;
      if (executeSearch !== undefined) newState.executeSearch = executeSearch;
      if (submittedSearchText !== undefined) newState.submittedSearchText = submittedSearchText;
      if (priceFacetSearch !== undefined) newState.priceFacetSearch = priceFacetSearch;
      if (pricePreviousMin !== undefined) newState.pricePreviousMin = pricePreviousMin;
      if (pricePreviousMax !== undefined) newState.pricePreviousMax = pricePreviousMax;
      if (priceSelectedMin !== undefined) newState.priceSelectedMin = priceSelectedMin;
      if (priceSelectedMax !== undefined) newState.priceSelectedMax = priceSelectedMax;

      return newState;
    });
  };

  const searchState = {
    searchText: '',
    submittedSearchText: '',
    priceFacetSearch: false,
    priceSelectedMin: 0,
    priceSelectedMax: 0,
    pricePreviousMin: 0,
    pricePreviousMax: 0,
    executeSearch: false,
    start: 0,
    rows: 0,
    facets: [],
    setSearchInfo,
  };

  const [searchTextData, updateSearchTextData] = useState(searchState);

  return <SearchTextContext.Provider value={searchTextData}>{children}</SearchTextContext.Provider>;
};

export { SearchTextProvider, SearchTextContext };
