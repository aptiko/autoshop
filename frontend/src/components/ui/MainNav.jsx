import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { UsersMenuItem } from './Users';

const MainNav = ({ user }) => (
  <nav className="navbar navbar-default">
    {user.id ?
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li>
            <NavLink to="/" activeClassName="active">
              Repairs
            </NavLink>
          </li>
          <UsersMenuItem user={user} />
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a id="btn-logout" href="/logout/">Logout
          </a></li>
        </ul>
      </div>
      :
      <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right">
          <li><a id="btn-login" href="/login/?next=/main">Login</a></li>
          <li><a id="btn-register" href="/accounts/register/">Register</a>
          </li>
        </ul>
      </div>
    }
  </nav>
);

MainNav.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default MainNav;
