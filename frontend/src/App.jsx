import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history';
import RepairsPage from './pages/RepairsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import EditUserPage from './pages/EditUserPage';
import EditRepairPage from './pages/EditRepairPage';

const App = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={() => <RepairsPage />} />
      <Route exact path="/users" component={() => <UsersPage />} />
      <Route path="/users/:userId/edit" component={() => <EditUserPage />} />
      <Route path="/repairs/:repairId/edit" component={() => <EditRepairPage />} />
      <Route path="/login" component={() => <LoginPage />} />
    </div>
  </Router>
);

export default App;
