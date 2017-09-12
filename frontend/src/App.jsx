import React from 'react';
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';

import RepairsPage from './pages/RepairsPage';
import UsersPage from './pages/UsersPage';

const App = () => (
  <BrowserRouter history={browserHistory}>
    <div>
      <Route exact path="/" component={() => <RepairsPage />} />
      <Route path="/users" component={() => <UsersPage />} />
    </div>
  </BrowserRouter>
);

export default App;
