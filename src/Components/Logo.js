import React from 'react';
import {Link} from 'react-router-dom';

function Logo() {
  return (
    <div className='logo'>
      <Link to='/search'>
        <img alt='' width='150' src={process.env.REACT_APP_LOGO_IMAGE}/>
      </Link>
    </div>
  );
}

export default Logo;
