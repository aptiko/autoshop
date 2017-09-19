import React from 'react';
import { PropTypes } from 'prop-types';

import User from './User';

const UserList = ({ users, loading, onClickReload }) => (
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
        </tr>
      </thead>
      <tbody>
        {users.map(x => <User key={x.id} user={x} />)}
      </tbody>
    </table>
  </div>
);

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onClickReload: PropTypes.func.isRequired,
};

export default UserList;
