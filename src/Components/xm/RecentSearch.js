import React, {useContext} from 'react';
import {Card} from 'react-bootstrap';
import {useCookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import {SearchTextContext} from "../../Services/SearchTextProvider";

const RecentSearch = () => {
  const {setSearchInfo} = useContext(SearchTextContext);
  // Recent searches
  let recent = [];
  const [cookies] = useCookies();
  if (cookies.recentKeywordSearch?.length > 0) {
    recent = cookies.recentKeywordSearch.split('|');
    recent = recent.reverse();
  }

  if (recent.length === 0) return null;

  return (
    <Card className={'mb-2'}>
      <Card.Header className={'text-uppercase'}>Recent Searches</Card.Header>
      <Card.Body>
        <ul className='list-unstyled mb-0'>
          {recent.map((as, index) => (
            <li key={index} className={'h6'}>
              <Link to={'#'} onClick={() => setSearchInfo({
                executeSearch: true,
                submittedSearchText: as,
              })}>{as}</Link>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

export default RecentSearch;
