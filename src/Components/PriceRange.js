import React, {useContext, useEffect, useReducer} from 'react';
import {Card} from 'react-bootstrap';
import Slider from 'rc-slider';
import {SearchResultsContext} from '../Services/SearchResultsProvider';
import {SearchTextContext} from '../Services/SearchTextProvider';

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const PriceRange = (props) => {
  const {
    facets,
    setSearchInfo
  } = useContext(SearchTextContext);

  // get overall min / max values from search results
  const {query, priceMin, priceMax} = useContext(SearchResultsContext);

  // temporary storage
  const {min: defaultMin, max: defaultMax} = props;

  // rounding down the min
  let min = Math.floor(priceMin ?? defaultMin);
  // rounding up the max
  let max = Math.ceil(priceMax ?? defaultMax);

  const [priceRangeState, setPriceRangeState] = useReducer((state, newState) => {
    return {...state, ...newState};
  }, {
    range: [min, max],
    value: [min, max],
    text: query
  });

  useEffect(() => {
    let min = priceMin ? Math.floor(priceMin) : defaultMin;
    let max = priceMax ? Math.ceil(priceMax) : defaultMax;

    if (priceRangeState.text !== query) {
      setPriceRangeState({range: [min, max], value: [min, max], text: query});
    }
  }, [query, priceMin, priceMax]);// eslint-disable-line react-hooks/exhaustive-deps

  const {range, value, text} = priceRangeState;

  return (
    <Card className={'mb-2'}>
      <Card.Header className={'text-uppercase'}>Price</Card.Header>
      <Card.Body>
        <Range
          min={range[0]}
          max={range[1]}
          value={value}
          onAfterChange={() => {
            if (text === query) {
              const priceRangeField = process.env.REACT_APP_PRICE_RANGE_FIELD; // generally either price or sale_price
              const facetsToUse = facets.filter((f) => f.facetId !== priceRangeField);
              facetsToUse.push({
                facetId: priceRangeField,
                facetName: priceRangeField,
                facetValue: '[' + value[0] + ' TO ' + value[1] + ']',
              });

              const si = {
                priceFacetSearch: true,
                facets: facetsToUse,
                start: 0,
              };
              setSearchInfo({...si, executeSearch: true});
            }
          }}
          onChange={(evt) => {
            setPriceRangeState({value: evt});
          }}
          tipFormatter={value => `$${value}`}
          trackStyle={[{backgroundColor: 'red'}]}
        />
        <div className={'w-100'}>
          <span className={'float-left'}>${range[0]}</span><span className={'float-right'}>${range[1]}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PriceRange;