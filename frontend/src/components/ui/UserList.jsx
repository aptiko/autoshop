import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import User from './User';

const UserList = ({ users, loading, onClickReload, onUserDelete }) => (
  <div id="users">
    <h1>
      Users <small>
        {
          loading ?
            'Loading...' :
            <a
              role="button"
              className="btn btn-default"
              href=""
              onClick={onClickReload}
            >Reload</a>
        }
      </small>
    </h1>
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Username</th>
          <th>Type</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          users.map(x => (
            <User
              key={x.id}
              user={x}
              onUserDelete={e => onUserDelete(e, x.id)}
            />),
          )
        }
        <tr className="add-user">
          <td>
            <Link
              to={'/users/0/edit'}
              className="btn btn-default btn-add"
              aria-label="Left Align"
            >
              <span
                className="glyphicon glyphicon-plus"
                aria-hidden="true"
              />
            </Link>
          </td>
          <td colSpan="3" />
        </tr>

      </tbody>
    </table>
  </div>
);

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onClickReload: PropTypes.func.isRequired,
  onUserDelete: PropTypes.func.isRequired,
};

export default UserList;
