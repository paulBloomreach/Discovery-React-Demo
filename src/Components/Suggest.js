import React, {useContext} from 'react';
import {CardGroup, Col, Container, Row} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {AutoSuggestContext} from '../Services/AutoSuggestProvider';
import {SearchTextContext} from '../Services/SearchTextProvider';
import SearchResultsProductDisplay from './SearchResultsProductDisplay';
/*
  AutoSuggest currently display query suggestions and products.
  This looks OK, but could use some additional CSS work to clean it up.
*/
const Suggest = ({updateSearchBarValue, suggestQueryDisplay, suggestProductDisplay, enableRecent, hideAfterKeys}) => {
  const {searchSuggestions, querySuggestions} = useContext(AutoSuggestContext);
  const {searchText, setSearchInfo} = useContext(SearchTextContext);
  const history = useHistory();

  /////////////////////////////////////
  // Query (term) Suggestions
  let queryData = [];
  if (querySuggestions) {
    queryData = querySuggestions;
    // only show XM configured query suggestions
    queryData = queryData.slice(0, suggestQueryDisplay);
  }

  /////////////////////////////////////
  // Product Suggestions
  let searchData = [];
  if (searchSuggestions) {
    searchData = searchSuggestions;
    // reduce size of product to display based on config in XM
    searchData = searchData.slice(0, suggestProductDisplay);
  }

  /////////////////////////////////////
  // User clicked a suggest item
  const handleClickQuery = (evt) => {
    console.log('Suggest - handle clicked');
    // update the search bar text in Search
    updateSearchBarValue(evt.target.textContent);

    // update the search text and execute search
    setSearchInfo({
      executeSearch: true,
      submittedSearchText: evt.target.textContent,
    });


    // to push back to search results page
    history.push({
      pathname: '/search',
    });
  };

  /////////////////////////////////////
  // User scrolled - hide suggest
  document.addEventListener('scroll', function (event) {
    if (!!suggestBox) {
      suggestBox.classList.add('js-is-hidden');
      suggestBox.classList.remove('suggest-results-wrapper');
    }
  });

  /////////////////////////////////////
  // hide if backspaced everything in search bar
  var suggestBox = document.getElementById('autoSuggestBox');
  if ((queryData.length === 0 && searchData.length === 0) || searchText.length === 0) {
    document.addEventListener('keydown', function (event) {
      if (!!suggestBox) {
        suggestBox.classList.add('js-is-hidden');
        suggestBox.classList.remove('suggest-results-wrapper');
      }
    });

    //return null;
  }

  return (
    <Container fluid className={'auto-suggestion p-2'}>
      <Row>
        <Col xs={3}>
          {queryData.length > 0 && <h5>Suggestions</h5>}
          <ul className='list-unstyled'>
            {queryData?.map((as, index) => (
              <li key={index} className={'h6'}>
                <Link to={'#'} onMouseDown={handleClickQuery}>{as.displayText}</Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={9}>
          <CardGroup className={'clear-both'}>
            {searchData?.map((as, index) => (
              <Col key={index} className={'mt-2 px-1'} xs={12} md={6} xl={3}>
                <SearchResultsProductDisplay row={as} version='small' source='suggest'/>
              </Col>
            ))}
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Suggest;

