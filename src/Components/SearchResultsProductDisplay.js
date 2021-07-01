import React, {useContext} from 'react';
import {Card} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import {UserContext} from '../Services/UserProvider';
import PriceSalePrice from './PriceSalePrice';

/*
    This is the component that displays individual products for search / suggest / MTL results.
    I think it looks OK, but someone who is better with CSS could make improvements.

    There are 2 modes supported:
      'small' - smaller version - used in Suggest results
      ' normal' - this is the larger version - like normal search results

    We truncate the description so long data doesn't overflow.  You can change this as required for
    your demo.
*/
function SearchResultsProductDisplay(props) {
  const {setUserInfo} = useContext(UserContext);
  const location = useLocation();
  const link = 'productdetail' + location.search;

  //console.log('PDISPLAY: location: ', location);
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  let title = props.row.title;
  let mode = 'normal';

  if (props.version === 'normal') {
    //display_size = props.row.display_size;
    title = truncate(props.row.title, 60);
  }

  if (props.version === 'small') {
    title = truncate(props.row.title, 50);
    mode = 'tiny';
  }

  const handleClickProduct = (evt) => {
    //window.scrollTo(0, 0);
    setUserInfo({selectedItem: props.row});
  };

  if (props.version === 'image-only') {
    return (
      <Link to={link} onClick={handleClickProduct}>
        <div className='thumbnail_noborder'>
          <img src={props.row.thumb_image} className='img-fluid' alt=''/>
        </div>
      </Link>
    );
  } else {
    return (
      <Card className='shadow h-100 product-card'>
        <div className={'card-img-top img-fluid'} style={{
          backgroundImage: 'url(' + props.row.thumb_image + ')',
        }}/>
        <Card.Body className={`text-center d-flex flex-column`}>
          <Card.Text>
            <Link to={link} onMouseDown={handleClickProduct} className={'stretched-link'}>{title}</Link>
          </Card.Text>
          <Card.Text>{props.row.sub_brand_description}</Card.Text>
          <Card.Subtitle className={'mt-auto'}>
            <PriceSalePrice price={props.row.price} sale_price={props.row.sale_price} mode={mode}/>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchResultsProductDisplay;
