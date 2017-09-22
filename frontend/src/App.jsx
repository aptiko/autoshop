import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import history from './history';
import RepairsPage from './pages/RepairsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import EditUserPage from './pages/EditUserPage';
import EditRepairPage from './pages/EditRepairPage';
import { fetchUsers, fetchRepairs } from './actions';

class App extends React.Component {
  componentDidMount() {
    /* Load users and repairs on page load */
    if (this.props.loggedOnUser.id) {
      this.props.fetchUsers();
      this.props.fetchRepairs();
    }
  }

  render() {
    return (
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
  }
}

App.propTypes = {
  loggedOnUser: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchRepairs: PropTypes.func.isRequired,
};

const AppContainer = connect(
  state => state,
  { fetchUsers, fetchRepairs },
)(App);

export default AppContainer;
