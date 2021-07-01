import React from 'react';
import NumberFormat from 'react-number-format';

/*
    Pretty straightforwad way to consistently display price and sale price.
    Note: does not handle currencies other than USD ($)
*/

const PriceSalePrice = (props) => {
  let price = props.price;
  let sale_price = props.sale_price;
  if (price === undefined) price = sale_price;
  let p = parseFloat(price);
  let s = parseFloat(sale_price);
  let showSale = false;

  if (sale_price && p > s) {
    showSale = true;
  }

  if (props.mode === 'tiny') {
    if (showSale) {
      return (
        <NumberFormat
          value={sale_price}
          decimalScale={2}
          fixedDecimalScale={true}
          thousandSeparator={true}
          displayType={'text'}
          prefix={'$'}
        />
      );
    } else {
      return (
        <div className='h6'>
          <span className='text-dark'>
            <NumberFormat
              value={price}
              decimalScale={2}
              fixedDecimalScale={true}
              thousandSeparator={true}
              displayType={'text'}
              prefix={'$'}
            />
          </span>
        </div>
      );
    }
  }

  if (showSale) {
    return (
      <div className='h6'>
        <del className='text-dark'>
          <NumberFormat
            value={price}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator={true}
            displayType={'text'}
            prefix={'$'}
          />
        </del>
        <span className='pl-2 text-danger'>
          <NumberFormat
            value={sale_price}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator={true}
            displayType={'text'}
            prefix={'$'}
          />
        </span>
      </div>
    );
  } else {
    return (
      <div className='h6'>
        <span className='text-dark'>
          <NumberFormat
            value={price}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator={true}
            displayType={'text'}
            prefix={'$'}
          />
        </span>
      </div>
    );
  }
};

export default PriceSalePrice;
