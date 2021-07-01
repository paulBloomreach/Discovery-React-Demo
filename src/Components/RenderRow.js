import React from 'react';
import {CardGroup, Col} from 'react-bootstrap';
import SearchResultsProductDisplay from './SearchResultsProductDisplay';

const RenderRow = (props) => {
  return (
    <CardGroup className={'clear-both'}>
      {props.row.map((cell, index) => (
        <Col key={index} className={'mt-2 px-1'} xs={12} md={4} xl={3}>
          <SearchResultsProductDisplay key={index} row={cell} version='normal' />
        </Col>
      ))}
    </CardGroup>
  );
};

export default RenderRow;
