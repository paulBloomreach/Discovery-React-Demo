import React, {Fragment, useContext} from 'react';
import FacetDisplay from './FacetDisplay';
import {SearchResultsContext} from '../../Services/SearchResultsProvider';
import {SearchTextContext} from '../../Services/SearchTextProvider';
import PriceRange from "../PriceRange";

/*
 Renders the list of facets

 Note: categories and crumbs_id facets are not displayed.  You can change this in FacetDisplay

*/

const FacetList = () => {
  const {facet_counts} = useContext(SearchResultsContext);
  const {categoryId} = useContext(SearchTextContext);

  if (!facet_counts) return null;

  // get rid of range facets if they have all zero counts
  // and only keep range values with count > 0
  let facetRanges = {};
  Object.keys(facet_counts.facet_ranges).map((key) => {
    let facetRange = facet_counts.facet_ranges[key];

    let nonZeroFacetRangeItem = [];
    let hasAtLeastOneNonZeroValue = false;
    facetRange.map((facetRangeItem) => {
      let facetCount = facetRangeItem.count;
      if (facetCount > 0) {
        hasAtLeastOneNonZeroValue = true;
        nonZeroFacetRangeItem.push(facetRangeItem);
      }

      return facetCount;
    });
    if (hasAtLeastOneNonZeroValue) {
      // add to new array
      facetRanges[key] = nonZeroFacetRangeItem;
    }
    return facetRanges;
  });

  return (
    <Fragment>
      <PriceRange min={1} max={100}/>
      {Object.keys(facetRanges).map((key, index) => (
        <FacetDisplay
          key={`r` + index}
          id={`r` + index}
          facetName={key}
          facetType="range"
          facetValue={facetRanges[key]}
        />))}
      {Object.keys(facet_counts.facet_fields).map((key, index) => (
        <FacetDisplay
          key={`n` + key}
          id={`n` + key}
          facetName={key}
          facetType="normal"
          facetValue={facet_counts.facet_fields[key]}
          categoryId={categoryId}
        />
      ))}
    </Fragment>
  );
}

export default FacetList;
