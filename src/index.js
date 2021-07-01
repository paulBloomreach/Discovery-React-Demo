import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'rc-slider/assets/index.css';
import 'react-block-ui/style.css';
import {SearchTextProvider} from './Services/SearchTextProvider';
import {SearchResultsProvider} from './Services/SearchResultsProvider';
import {UserProvider} from './Services/UserProvider';
import App from './App';

import(`./scss/themes/${process.env.REACT_APP_PACIFIC_THEME || 'gfe'}/theme.scss`).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <CookiesProvider>
        <UserProvider>
          <SearchTextProvider>
            <SearchResultsProvider>
              <BrowserRouter>
                <Route path="/(.*)" component={App}/>
              </BrowserRouter>
            </SearchResultsProvider>
          </SearchTextProvider>
        </UserProvider>
      </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

