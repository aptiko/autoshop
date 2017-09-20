import React from 'react';
import { PropTypes } from 'prop-types';

import C from '../../constants';
import UserButtons from './UserButtons';

const User = ({ user, onUserDelete }) => (
  <tr id={`user-data-${user.id}`} className="user-data">
    <td className="user-id">{user.id}</td>
    <td className="user-username">{user.username}</td>
    <td className="user-role">
      {user.role === C.SUPERUSER ? 'Super user' : 'Normal user'}
    </td>
    <td>
      <UserButtons
        userId={user.id}
        onClickDelete={onUserDelete}
      />
    </td>
  </tr>
);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onUserDelete: PropTypes.func.isRequired,
};

export default User;
