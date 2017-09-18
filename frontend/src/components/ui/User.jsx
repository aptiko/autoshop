import React from 'react';
import { PropTypes } from 'prop-types';

import C from '../../constants';

const User = ({ user }) => (
  <tr id={`user-data-${user.id}`} className="user-data">
    <td className="user-id">{user.id}</td>
    <td className="user-username">{user.username}</td>
    <td className="user-role">
      {user.role === C.SUPERUSER ? 'Super user' : 'Normal user'}
    </td>
  </tr>
);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
