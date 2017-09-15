import React from 'react';
import { HashRouter, Route, browserHistory } from 'react-router-dom';

import RepairsPage from './pages/RepairsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';

const App = () => (
  <HashRouter history={browserHistory}>
    <div>
      <Route exact path="/" component={() => <RepairsPage />} />
      <Route path="/users" component={() => <UsersPage />} />
      <Route path="/login" component={() => <LoginPage />} />
    </div>
  </HashRouter>
);

export default App;
