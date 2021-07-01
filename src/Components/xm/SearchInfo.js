import React, {Fragment, useContext} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {SearchResultsContext} from '../../Services/SearchResultsProvider';

/*
  Displays some info about the search / results
  If you don't want this in your demo, just remove it from LeftNav.js
*/

const SearchInfo = () => {
  const {redirectedUrl} = useContext(SearchResultsContext);

  const domainKey = process.env.REACT_APP_BRSM_DOMAIN_KEY ?? '';
  const accountId = process.env.REACT_APP_BRSM_ACCOUNT_ID ?? '';

  
  return (
    <Card className={'mb-2'}>
      <Card.Header>Search Info</Card.Header>
      <Container>
        <Row as={'dl'} className={'font-size-sm mt-2'}>
          <Col xs={6} as={'dt'}>Domain Key</Col>
          <Col xs={6} as={'dd'}>{domainKey}</Col>
          <Col xs={6} as={'dt'}>Account ID</Col>
          <Col xs={6} as={'dd'}>{accountId}</Col>
          {redirectedUrl && <Fragment>
            <Col xs={6} as={'dt'}>Redirect URL</Col>
            <Col xs={6} as={'dd'}>{redirectedUrl}</Col>
          </Fragment>}
        </Row>
      </Container>
    </Card>
  );
}

export default SearchInfo;
