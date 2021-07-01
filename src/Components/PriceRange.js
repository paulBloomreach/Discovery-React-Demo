import React, {useContext, useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import Slider from 'rc-slider';
import {SearchResultsContext} from '../Services/SearchResultsProvider';
import {SearchTextContext} from '../Services/SearchTextProvider';

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const PriceRange = (props) => {
  // get settings from last search
  const {
    priceSelectedMin,
    priceSelectedMax,
    facets,
    submittedSearchText,
    setSearchInfo
  } = useContext(SearchTextContext);

  // get overall min / max values from search results
  const {priceMin, priceMax} = useContext(SearchResultsContext);

  // temporary storage
  const {min: defaultMin, max: defaultMax, priceFacetSearch} = props;

  // rounding down the min
  let min = Math.floor(priceMin ?? defaultMin);

  // rounding up the max
  let max = Math.ceil(priceMax ?? defaultMax);

  const [priceRangeValue, setPriceRangeValue] = useState([min, max]);

  useEffect(() => {
    let min = defaultMin;
    let max = defaultMax;

    if (!priceFacetSearch) {
      if (priceMin !== undefined) min = Math.floor(priceMin);
      if (priceMax !== undefined) max = Math.ceil(priceMax);
    } else {
      if (priceSelectedMin !== undefined) min = Math.floor(priceSelectedMin);
      if (priceSelectedMax !== undefined) max = Math.ceil(priceSelectedMax);
    }
    if (priceRangeValue[0] < min || priceRangeValue[1] > max) {
      setPriceRangeValue([min, max]);
    }
  }, [submittedSearchText, priceMin, priceMax, priceSelectedMin, priceSelectedMax]);// eslint-disable-line react-hooks/exhaustive-deps

  // setup the facets and execute the new query
  const handleRangeChange = (evt) => {
    if (evt !== undefined) {
      let rangeValue = '[' + evt[0] + ' TO ' + evt[1] + ']';

      let facetsToUse = facets;

      // this means the user changed the slider somehow
      if (evt[0] !== min || evt[1] !== max) {
        // need to REPLACE any existing sale_price facet with this new one
        let priceRangeField = process.env.REACT_APP_PRICE_RANGE_FIELD; // generally either price or sale_price
        const clearedFacets = facets.filter((f) => f.facetId !== priceRangeField);
        const newFacet = {
          facetId: priceRangeField,
          facetName: priceRangeField,
          facetValue: rangeValue,
        };
        facetsToUse = clearedFacets;
        facetsToUse.push(newFacet);
      }

      let si = {
        priceFacetSearch: true,
        facets: facetsToUse,
        start: 0,
        priceSelectedMin: evt[0],
        priceSelectedMax: evt[1],
        pricePreviousMin: min,
        pricePreviousMax: max,
      };

      setSearchInfo({...si, executeSearch: true});
    }
  };

  // This is triggered when the user changes the slider
  // allow a slight delay before setting values and triggering a new search
  useEffect(() => {
    // do nothing if the user hasn't changed anything
    if (priceRangeValue === undefined || (priceRangeValue[0] === min && priceRangeValue[1] === max)) {
      return;
    }

    const timeOutId = setTimeout(() => handleRangeChange(priceRangeValue), 900);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRangeValue, min, max]); // Ignoring not including handleRangeChange - couldn't find another way

  return (
    <Card className={'mb-2'}>
      <Card.Header className={'text-uppercase'}>Price</Card.Header>
      <Card.Body>
        <Range
          defaultValue={[min, max]}
          min={min}
          max={max}
          value={priceRangeValue}
          onChange={(evt) => setPriceRangeValue(evt)}
          tipFormatter={value => `$${value}`}
          trackStyle={[{ backgroundColor: 'red' }]}
        />
        <div className={'w-100'}>
          <span className={'float-left'}>${min}</span><span className={'float-right'}>${max}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PriceRange;
