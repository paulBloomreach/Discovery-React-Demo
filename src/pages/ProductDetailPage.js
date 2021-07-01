import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import SMCampaign from '../Components/xm/SMCampaign';
import ProductDetail from '../Components/xm/ProductDetail';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const ProductDetailPage = () => {
  return (
    <Container>
      <Header/>
      <Row>
        <Col md='12'>
          <SMCampaign/>
          <ProductDetail/>
        </Col>
      </Row>
      <Footer/>
    </Container>
  );
}

export default ProductDetailPage;
