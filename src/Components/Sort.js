import React, {useContext} from 'react';
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {UserContext} from '../Services/UserProvider';
import {SearchTextContext} from '../Services/SearchTextProvider';

/*
  This is the Sort dropdown form.  You can change the list of users in the index.js
  file.  The results of this form are stored in the UserProvider context and used
  as the sort param for subsequent searches.  Default (nothing selected) results in
  no sort param being added to the query.

  I considerd having this be more standalone (as opposed to being inlcuded by the
  Pagination component), but I couldn't think of a reason why someone would want
  Sort but not Pagination.  They seem to go together.
*/
const gfeConfigs = require('../GfeConfigs.json');

const Sort = () => {
  const {sortSelected, setUserInfo} = useContext(UserContext);
  const {setSearchInfo} = useContext(SearchTextContext);
  const {sortOptions} = gfeConfigs;

  const handleChangeSort = (item) => {
    // set sort
    setUserInfo({sortSelected: item.value});
    // trigger search
    setSearchInfo({executeSearch: true});
  };

  const sortSelectedLabel = sortOptions.find(sortOption => sortOption?.value === sortSelected)?.label;

  return (
    <ButtonGroup className='float-right sm mr-2'>
      <DropdownButton as={ButtonGroup}
                      title={sortSelectedLabel || 'Sort By'}
                      id='bg-sort'
                      className='sm pull-right' variant='light'>
        {sortOptions.map((item, key) => (
          <Dropdown.Item
            key={key}
            name={item.label}
            value={item.label}
            active={sortSelected === item.value}
            onClick={(e) => handleChangeSort(item)}
            className='pl-2 pr-0'>
            <FontAwesomeIcon className='ml-0 mr-2 pl-0' icon={[`fas`, item.icon]}/>
            {item.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </ButtonGroup>
  );
}

export default Sort;
