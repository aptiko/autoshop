import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import history from './history';
import MyRepairsPage from './pages/MyRepairsPage';
import RepairsPage from './pages/RepairsPage';
import RepairDetailPage from './pages/RepairDetailPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import EditUserPage from './pages/EditUserPage';
import EditRepairPage from './pages/EditRepairPage';
import { fetchUsers, fetchRepairs } from './actions';

class App extends React.Component {
  componentWillMount() {
    /* Load users and repairs on page load */
    if (this.props.loggedOnUser.id) {
      this.props.fetchUsers().then(this.props.fetchRepairs());
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={() => <MyRepairsPage />} />
          <Route exact path="/repairs" component={() => <RepairsPage />} />
          <Route
            exact
            path="/repairs/:repairId"
            component={() => <RepairDetailPage />}
          />
          <Route exact path="/users" component={() => <UsersPage />} />
          <Route
            exact
            path="/users/:userId/edit"
            component={() => <EditUserPage />}
          />
          <Route
            exact
            path="/repairs/:repairId/edit"
            component={() => <EditRepairPage />}
          />
          <Route path="/register" component={() => <RegistrationPage />} />
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
