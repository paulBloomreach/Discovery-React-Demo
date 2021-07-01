import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {SearchResultsProvider} from './Services/SearchResultsProvider';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(fab, far, fas);

export default function App() {
  return (
    <SearchResultsProvider>
      <Switch>
        <Route exact path="/productdetail">
          <ProductDetailPage/>
        </Route>
        <Route exact path="/">
          <SearchPage/>
        </Route>
        <Route exact path="/search">
          <SearchPage/>
        </Route>
      </Switch>
    </SearchResultsProvider>
  );
}
