import React, {useContext} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import PriceSalePrice from '../PriceSalePrice';
import {UserContext} from '../../Services/UserProvider';

/*
  Note: if you have extra fields you want to display, you will need to add those to:
  1. index.js - FL
  3. This file for display
*/

const ProductDetail = () => {
  const { selectedItem } = useContext(UserContext);

  // pull all info to display from the selectedItem (contains all FL data for this pid)
  let title = selectedItem.title;
  let pid = selectedItem.pid;
  let price = selectedItem.price;
  let sale_price = selectedItem.sale_price;
  let thumb_image = selectedItem.thumb_image;
  let description = selectedItem.description;

  if (!pid) return null;

  let maxWidth = '60vh';
  let height = '60vh';
  let imgStyle;

  imgStyle = {
    backgroundImage: 'url("' + thumb_image + '")',
    maxWidth: maxWidth,
    height: height,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
  };

  return (
    <Container fluid className={'my-4'}>
      <Row>
        <Col lg={true}>
          <div style={imgStyle} />
        </Col>
        <Col lg={true}>
          <h2>{title}</h2>
          {description && <div className={'mt-4'} dangerouslySetInnerHTML={{__html: unescapeHTML(description)}}/>}
          <div className='text-muted mt-4'>{pid}</div>
          <h3 className={'text-primary mt-4'}>
            <PriceSalePrice price={price} sale_price={sale_price} mode='normal' />
          </h3>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

function unescapeHTML(html) {
  var escapeEl = document.createElement('textarea');
  escapeEl.innerHTML = html;
  return escapeEl.textContent;
}
