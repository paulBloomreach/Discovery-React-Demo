import React, {useContext} from 'react';
import {Badge, Form, ListGroup} from 'react-bootstrap';
import {SearchTextContext} from '../../Services/SearchTextProvider';

/*
  Handles when facets are clicked - so that the selected facet gets in to the URL
*/
const FacetItemDisplay = (props) => {
  const {facets, setSearchInfo} = useContext(SearchTextContext);
  const {id, facetValueCount} = props;
  const handleClickFacet = (evt) => {
    if (evt.target.checked) {
      // fix special chars in facet value
      let fixedFacetValue = facetValue.replace('"', '\\"');

      //  add to existing facet value
      const newFacet = {
        facetId: evt.target.id,
        facetName: props.facetName,
        facetValue: fixedFacetValue,
        facetDisplay: display,
      };
      const mergedFacets = facets;
      mergedFacets[facets.length] = newFacet;

      setSearchInfo({start: 0, executeSearch: true, facets: mergedFacets});
    } else {
      //  remove this facet from facets array
      const newFacets = facets.filter((f) => f.facetId !== evt.target.id);

      setSearchInfo({start: 0, executeSearch: true, facets: newFacets});
    }
  };

  // don't show zero count items
  if (facetValueCount === 0) return <div></div>;

  // fixing some display properties
  let display = '';
  let facetValue = '';
  if (props.facetType === 'normal') {
    display = props.facetValueName;
    facetValue = props.facetValueName;
  } else if (props.facetType === 'range') {
    display = props.facetValueStart + ' - ' + props.facetValueEnd;
    facetValue = '[' + props.facetValueStart + ' TO ' + props.facetValueEnd + ']';
  }


  // handing checked value
  let checked = false;
  facets.map((f) => {
    let prepend = '';
    if (props.facetType === 'normal') prepend = 'n';
    else if (props.facetType === 'range') prepend = 'r';

    let testStr = prepend + props.facetName + '|' + props.facetValueName;

    if (f.facetId === testStr) checked = true;
    return checked;
  });

  return (
    <ListGroup.Item
      as={'li'}
      //key={valueKey}
      className='d-flex border-0 justify-content-between m-1 p-0 font-size-sm'>
      <Form.Check
        id={id}
        className='ml-2'
        checked={!!checked}
        onChange={handleClickFacet}
        label={display}/>
      <Badge
        pill
        variant='info'
        className='py-0'
        style={{
          lineHeight: '2',
          minWidth: '2rem',
          maxHeight: '1.2rem',
        }}>
        {facetValueCount}
      </Badge>
      {/*<div className="facet_item">
        <input type="checkbox" id={id} checked={!!checked} onChange={handleClickFacet} />{' '}
        <span className="facet_item_text">
          {display} ({facetValueCount})
        </span>
      </div>*/}
    </ListGroup.Item>
  );
};

export default FacetItemDisplay;
