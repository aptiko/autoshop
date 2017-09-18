import React from 'react';
import { PropTypes } from 'prop-types';

import User from './User';

const UserList = ({ users }) => (
  <div id="users">
    <h1>Users</h1>
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
};

export default UserList;
