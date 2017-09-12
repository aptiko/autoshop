import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

import Throbber from './Throbber';
import C from '../../constants';

const UsersMenuItem = ({ user }) => {
  if (!user.username) {
    return <li><Throbber /></li>;
  }
  return user.role === C.NORMAL_USER ?
    null
    :
    <li>
      <NavLink to="/users" activeClassName="active">
        Users
      </NavLink>
    </li>;
};

UsersMenuItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default UsersMenuItem;
