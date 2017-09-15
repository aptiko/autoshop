import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import UsersMenuItem from './UsersMenuItem';

const MainNav = ({ loggedOnUser }) => (
  <nav className="navbar navbar-default">
    {loggedOnUser.id ?
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li>
            <NavLink to="/" activeClassName="active">
              Repairs
            </NavLink>
          </li>
          <UsersMenuItem loggedOnUser={loggedOnUser} />
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a id="btn-logout" href="/logout/">Logout
          </a></li>
        </ul>
      </div>
      :
      <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <NavLink to="/login" activeClassName="active">Login</NavLink>
          </li>
          <li><a id="btn-register" href="/accounts/register/">Register</a>
          </li>
        </ul>
      </div>
    }
  </nav>
);

MainNav.propTypes = {
  loggedOnUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default MainNav;
