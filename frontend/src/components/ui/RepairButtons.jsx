import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export const SuperUserViewRepairButtons = ({ repairId, onClickDelete }) => (
  <div>
    <Link
      to={`/repairs/${repairId}/edit`}
      className="btn btn-default btn-edit"
      aria-label="Left Align"
    >
      <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
    </Link>
    <button
      id={`delete-repair-${repairId}`}
      type="button"
      className="btn btn-default btn-remove"
      aria-label="Left Align"
      onClick={onClickDelete}
    >
      <span className="glyphicon glyphicon-ban-circle" aria-hidden="true" />
    </button>
  </div>
);

SuperUserViewRepairButtons.propTypes = {
  repairId: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export const NormalViewRepairButtons = ({ repairId, onClickMarkComplete }) => (
  <div>
    <button
      id={`mark-complete-${repairId}`}
      type="button"
      className="btn btn-default"
      aria-label="Left Align"
      onClick={onClickMarkComplete}
    >
      <span className="glyphicon glyphicon-ban-circle" aria-hidden="true" />
    </button>
  </div>
);

NormalViewRepairButtons.propTypes = {
  repairId: PropTypes.number.isRequired,
  onClickMarkComplete: PropTypes.func.isRequired,
};
