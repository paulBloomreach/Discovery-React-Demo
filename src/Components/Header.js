import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Logo from './Logo';
import {AutoSuggestProvider} from '../Services/AutoSuggestProvider';
import Search from './xm/Search';

const Header = () => {
  return (
    <Row>
      <Col md='3' className={'my-auto'}>
        <Logo/>
      </Col>
      <Col md='6' className={'my-auto'}>
        <AutoSuggestProvider>
          <Search/>
        </AutoSuggestProvider>
      </Col>
    </Row>
  );
};

export default Header;
