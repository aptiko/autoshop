import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history';
import RepairsPage from './pages/RepairsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';

const App = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={() => <RepairsPage />} />
      <Route path="/users" component={() => <UsersPage />} />
      <Route path="/login" component={() => <LoginPage />} />
    </div>
  </Router>
);

export default App;
