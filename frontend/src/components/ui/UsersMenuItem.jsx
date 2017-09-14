import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

import Throbber from './Throbber';
import C from '../../constants';

const UsersMenuItem = ({ loggedOnUser }) => {
  if (!loggedOnUser.username) {
    return <li><Throbber /></li>;
  }
  return loggedOnUser.role === C.NORMAL_USER ?
    null
    :
    <li>
      <NavLink to="/users" activeClassName="active">
        Users
      </NavLink>
    </li>;
};

UsersMenuItem.propTypes = {
  loggedOnUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default UsersMenuItem;
