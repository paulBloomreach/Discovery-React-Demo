import React, {useContext} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {SearchResultsContext} from '../Services/SearchResultsProvider';
import {SearchTextContext} from '../Services/SearchTextProvider';
import Sort from './Sort';

/*
  This component changes pages by handling Previous / Next click events where those events
  set the start value and the executeSearch value.  Basically, it executes a search where
  the start value is adjusted to the previous or next page.

  I've included Sort here because the styling works well, and the functionality seems
  to go together (sorting and paging).
*/

const Pagination = (params) => {
  const {numFound, docs} = useContext(SearchResultsContext);
  const {start, setSearchInfo} = useContext(SearchTextContext);

  // showSort
  let showSort = false;
  if (params.showSort === 'true') showSort = true;

  // small fix
  let resultCount = 0;
  if (numFound > 0) resultCount = numFound;

  // some config data from index.js
  const config = {
    rows: process.env.REACT_APP_BRSM_ROWS,
  };

  const getPageCount = () => {
    const divisible = resultCount % config.rows === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(resultCount / config.rows) + valueToBeAdded;
  };

  const handleClickPrevious = () => {
    // set the starting row for the Previous page query
    let startingRecord = parseInt(start, 10) - parseInt(config.rows, 10);

    setSearchInfo({executeSearch: true, start: startingRecord});
  };

  const handleClickNext = () => {
    // set the starting row for the Previous page query
    let startingRecord = parseInt(start, 10) + parseInt(config.rows, 10);

    setSearchInfo({executeSearch: true, start: startingRecord});
  };

  // no paging to display
  if (getPageCount() < 2) return '';

  // showPrevious?
  let showPrevious = false;
  if (start !== 0) showPrevious = true;

  // showNext?
  let showNext = false;
  if (parseInt(start, 10) + parseInt(config.rows, 10) < parseInt(resultCount, 10)) showNext = true;

  // current page
  let currentPage = parseInt(start, 10) / parseInt(config.rows, 10) + 1;

  // total pages
  let totalPages = getPageCount();
  const message = `Showing ${start + 1} - ${start + docs.length} of ${numFound} products`;
  return (
    <Row className={'mt-2'}>
      {showSort && <Col xs={4} className={'my-auto'}><span>{message}</span></Col>}
      <Col xs={showSort ? 4 : 12} className={'text-center my-auto'}>
        <div>
          {showPrevious &&
          <Button variant={'link'} size={'sm'} onClick={handleClickPrevious}>
            <FontAwesomeIcon icon={'chevron-left'} className={'mr-2'}/>
          </Button>
          }
          <span className={'align-middle px-2'}>Page {currentPage} of {totalPages}</span>
          {showNext &&
          <Button variant={'link'} size={'sm'} onClick={handleClickNext}>
            <FontAwesomeIcon icon={'chevron-right'} className={'ml-2'}/>
          </Button>}
        </div>
      </Col>
      {showSort && <Col xs={4}><Sort/></Col>}
    </Row>
  );
}

export default Pagination;
