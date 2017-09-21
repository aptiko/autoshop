import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const UserButtons = ({ userId, onClickDelete }) => (
  <div>
    <Link
      to={`/users/${userId}/edit`}
      className="btn btn-default btn-edit"
      aria-label="Left Align"
    >
      <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
    </Link>
    <button
      id={`delete-user-${userId}`}
      type="button"
      className="btn btn-default btn-remove"
      aria-label="Left Align"
      onClick={onClickDelete}
    >
      <span className="glyphicon glyphicon-ban-circle" aria-hidden="true" />
    </button>
  </div>
);

UserButtons.propTypes = {
  userId: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default UserButtons;
