import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import FacetItemDisplay from './FacetItemDisplay';

const FacetDisplay = (props) => {
  // Fix Facet Title
  let facetTitle = props.facetName;

  // if only one value, don't show
  if (props.facetValue?.length <= 1) return null;

  // add facets you want to ignore here (could also be done in Dashboard...  SHOULD be drop fields in mapping)
  if (
    props.facetName === 'category' ||
    props.facetName === 'RAW_XML_RECORD' ||
    props.facetName === 'crumbs_id'
  )
    return null;


  return (
    <Card className={'mb-2'}>
      <Card.Header className={'text-uppercase'}>{facetTitle}</Card.Header>
      <Card.Body style={{
        maxHeight: '40vh',
        overflowY: 'auto'
      }}>
        <ListGroup as={'ul'} variant='flush'>
          {props.facetValue.map((facetValue, index) => (
            <FacetItemDisplay
              key={facetValue.name}
              id={props.id + '|' + facetValue.name}
              facetName={props.facetName}
              facetType={props.facetType}
              facetValueName={facetValue.name}
              facetValueStart={facetValue.start}
              facetValueEnd={facetValue.end}
              facetValueCount={facetValue.count}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default FacetDisplay;
