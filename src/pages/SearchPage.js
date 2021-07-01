import React, {useContext} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import BlockUi from 'react-block-ui';
import SearchInfo from '../Components/xm/SearchInfo';
import FacetList from '../Components/xm/FacetList';
import SMCampaign from '../Components/xm/SMCampaign';
import SearchResultsGrid from '../Components/xm/SearchResultsGrid';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import {SearchTextContext} from '../Services/SearchTextProvider';
import RecentSearch from "../Components/xm/RecentSearch";

const SearchPage = () => {
  const {executeSearch} = useContext(SearchTextContext);
  return (
    <Container>
      <Header/>
      <Row>
        <Col md='3'>
          <SearchInfo/>
          <RecentSearch/>
          <FacetList/>
        </Col>
        <Col md='9'>
          <SMCampaign/>
          <BlockUi tag='div' className={'ui-block'} blocking={executeSearch} message={'Searching...'}>
            <SearchResultsGrid/>
          </BlockUi>
        </Col>
      </Row>
      <Footer/>
    </Container>
  );
}

export default SearchPage;

