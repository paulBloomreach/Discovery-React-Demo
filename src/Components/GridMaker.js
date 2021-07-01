import React from 'react';
import {CardGroup, Col} from 'react-bootstrap';
import SearchResultsProductDisplay from './SearchResultsProductDisplay';

const GridMaker = ({docs, cols}) => {
  if (!docs.length) return <div>No results</div>;

  // this breaks the list of docs into multiple arrays of size 'cols'
  //let rows = chunk(docs, cols);

  return (
    <CardGroup className={'clear-both'}>
      {docs.map((cell, index) => (
        <Col key={index} className={'mt-2 px-1'} xs={12} md={6} xl={12 / cols}>
          <SearchResultsProductDisplay key={index} row={cell} version='normal'/>
        </Col>
      ))}
    </CardGroup>
  );
};

export default GridMaker;
