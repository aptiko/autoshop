import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import C from '../../constants';

export const SuperUserViewRepairButtons = ({
  repair, onClickDelete, onClickComments,
}) => (
  <div>
    <button
      id={`repair-comments-${repair.id}`}
      type="button"
      className="btn btn-default btn-comments"
      aria-label="Left Align"
      onClick={onClickComments}
    >
      <span className="glyphicon glyphicon-comment" aria-hidden="true" />
    </button>
    <Link
      to={`/repairs/${repair.id}/edit`}
      className="btn btn-default btn-edit"
      aria-label="Left Align"
    >
      <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
    </Link>
    <button
      id={`delete-repair-${repair.id}`}
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
  repair: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickComments: PropTypes.func.isRequired,
};

export const NormalViewRepairButtons = ({
  repair, onClickMarkComplete, onClickComments,
}) => (
  <div>
    <button
      id={`repair-comments-${repair.id}`}
      type="button"
      className="btn btn-default btn-comments"
      aria-label="Left Align"
      onClick={onClickComments}
    >
      <span className="glyphicon glyphicon-comment" aria-hidden="true" />
    </button>
    <button
      id={`mark-complete-${repair.id}`}
      type="button"
      className="btn btn-default"
      aria-label="Left Align"
      onClick={onClickMarkComplete}
      disabled={repair.status !== C.PENDING}
    >
      <span className="glyphicon glyphicon-check" aria-hidden="true" />
    </button>
  </div>
);

NormalViewRepairButtons.propTypes = {
  repair: PropTypes.object.isRequired,
  onClickMarkComplete: PropTypes.func.isRequired,
  onClickComments: PropTypes.func.isRequired,
};
