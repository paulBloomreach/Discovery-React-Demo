import React, {useContext, useEffect, useRef, useState} from 'react';
import {SearchTextContext} from '../../Services/SearchTextProvider';
import Suggest from '../Suggest';
import {useCookies} from 'react-cookie';
import {useHistory, useLocation} from 'react-router-dom';
import {Container, Form, FormControl, InputGroup, OverlayTrigger, Popover} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/*
 captures the search text and stores it in the SearchText context so other compnents
 can use that data.  For example:
    searchText - this is the text (as you type) - used for Suggest
    submittedSearchText - this is the text after you hit enter - used as the q param in the search query
    executeSearch - tells the SearchResultsProvider to execture the search
*/

const Search = () => {
  const {submittedSearchText, searchText, setSearchInfo} = useContext(SearchTextContext);
  const [cookies, setCookies] = useCookies();
  const history = useHistory();
  const location = useLocation();
  const searchBarText = useRef(null);

  const [popoverState, setPopoverState] = useState({
    showAutosuggestion: false,
    input: ''
  });

  let real_trackKeywordSearches = 'true';
  let real_suggestQueryDisplay = '15';
  let real_suggestProductDisplay = '8';
  let real_placeholderText = 'Search';
  let real_enableRecent = 'true';
  let real_hideAfterKeys = '3';

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // helps to handle back button issue
    let actualSearchText = submittedSearchText; // will still be populated when back button clicked
    if (searchText !== '') actualSearchText = searchText;

    if (real_trackKeywordSearches) {
      // logic to get most recent 5 keyword searches
      let stored = cookies.recentKeywordSearch;
      let storedArr = [];
      if (stored) storedArr = stored.split('|');

      if (storedArr.length >= 5) {
        storedArr.shift();
      }
      storedArr.push(actualSearchText);
      const json_str = storedArr.join('|');

      // add to cookie
      setCookies('recentKeywordSearch', json_str, {
        path: '/',
        maxAge: 3600, // just keep for one hour
      });
    }

    setSearchInfo({
      priceFacetSearch: false,
      executeSearch: true,
      submittedSearchText: actualSearchText,
      facets: [],
      start: 0,
    });

    history.push({
      pathname: 'search',
      search: location.search,
    });
  };

  const updateSearchBarValue = (evt) => {
    // sets the search bar text to what the user clicked in suggest
    searchBarText.current.value = evt;
  };

  useEffect(() => {
    updateSearchBarValue(submittedSearchText);
  }, [submittedSearchText]);

  const handleSearchInputEnter = (event) => {
    const target = event.currentTarget;
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      setSearchInfo({searchText: target.value});
      target.blur();
    } else {
      //event.persist();
      const input = target.value;
      setTimeout(() => {
        if (input === searchBarText.current?.value) {
          if (input === '') {
            setPopoverState({
              showAutosuggestion: false,
              input
            });
          } else {
            if (popoverState.input !== input) {
              setPopoverState({
                showAutosuggestion: true,
                input
              });
              setSearchInfo({searchText: input});
            }
          }
        }
      }, 100);
    }
  };

  const handleSearchInputFocus = (event) => {
    event.persist();
    const input = event.target.value;
    if (input === searchBarText.current?.value) {
      if (input === '') {
        popoverState.showAutosuggestion && setPopoverState({
          showAutosuggestion: false,
          input
        });
      } else {
        setPopoverState({
          showAutosuggestion: true,
          input
        });
      }
    }
  };

  const {showAutosuggestion, input} = popoverState;

  const popoverStyles = {};
  if (!showAutosuggestion) {
    popoverStyles.border = 'none';
  }

  return (
    <OverlayTrigger
      trigger={['focus']}
      placement='bottom'
      delay={{show: 250, hide: 400}}
      overlay={
        <Popover id='auto-suggestion-popover' className='no-arrow' style={{...popoverStyles}}>
          {showAutosuggestion && <Container>
            <Suggest
              updateSearchBarValue={updateSearchBarValue}
              suggestQueryDisplay={real_suggestQueryDisplay}
              suggestProductDisplay={real_suggestProductDisplay}
              enableRecent={real_enableRecent}
              hideAfterKeys={real_hideAfterKeys}
            />
          </Container>}
        </Popover>
      }>
      <div className='d-block my-auto'>
        <Form onSubmit={handleSubmit} autoComplete='off'>
          <InputGroup className='mx-auto'>
            <FormControl
              type='text'
              id='GFESearchBox' //This is not a typo. It is for completely disabling autofill
              ref={searchBarText}
              defaultValue={input}
              placeholder={real_placeholderText}
              aria-label='Search'
              onKeyUp={handleSearchInputEnter}
              onFocus={handleSearchInputFocus}
              aria-describedby='search-icon'/>
            <InputGroup.Append>
              <InputGroup.Text>
                <FontAwesomeIcon id='search-icon' icon={'search'} onClick={handleSubmit}/>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </OverlayTrigger>
  );
}

export default Search;
