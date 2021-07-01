import React, {Fragment, useContext, useEffect} from 'react';
import {SearchResultsContext} from '../../Services/SearchResultsProvider';
import {SearchTextContext} from '../../Services/SearchTextProvider';
import GridMaker from '../GridMaker';

import Pagination from '../Pagination';
import {Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function SearchResultsGrid() {
  const {docs, did_you_mean: autoCorrectQuerySet, autoCorrectQuery, relaxedQuery} = useContext(SearchResultsContext);
  const {submittedSearchText, setSearchInfo} = useContext(SearchTextContext);

  let real_cols = process.env.REACT_APP_RESULTS_COLS;
  let real_rows = process.env.REACT_APP_BRSM_ROWS;

  useEffect(() => {
    setSearchInfo({rows: real_rows});
  }, [setSearchInfo, real_rows]);

  const prefix = docs?.length === 0 ? 'No results' : 'Results';

  let title = '';
  if (autoCorrectQuery) {
    title = `${prefix} for <i>${autoCorrectQuery}</i> <i><s>${submittedSearchText}</s></i>`;
  } else {
    title = `${prefix} for <i>${submittedSearchText}</i>`;
  }

  if (relaxedQuery) {
    title = `${title} (<i>${relaxedQuery}</i>)`;
  }

  return (
    <Fragment>
      {submittedSearchText && <div className={'mb-3 component-title p-4 border rounded'}>
        <h1><small dangerouslySetInnerHTML={{__html: title}}/></h1>
        {autoCorrectQuerySet && <h6>
          <ul className={'my-2 list-inline'}>
            {autoCorrectQuerySet.length > 0 && <li className={'list-inline-item'}>Did you mean:</li>}
            {autoCorrectQuerySet.map((autoCorrectQueryTerm, key) => {
              return autoCorrectQueryTerm && <li className={'list-inline-item'} key={key}>
                <Link to={'#'} onClick={() => {
                  setSearchInfo({
                    priceFacetSearch: false,
                    executeSearch: true,
                    submittedSearchText: autoCorrectQueryTerm,
                    facets: [],
                    start: 0,
                  });
                }} key={key}>
                  <Badge pill variant='primary'>{autoCorrectQueryTerm}</Badge>
                </Link>
              </li>
            })}
          </ul>
        </h6>}
      </div>}
      <Pagination showSort='true'/>
      {docs?.length > 0 && <GridMaker docs={docs} cols={real_cols}/>}
      <Pagination showSort='false'/>
    </Fragment>
  );
}

export default SearchResultsGrid;
