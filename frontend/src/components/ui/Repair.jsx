import React from 'react';
import { PropTypes } from 'prop-types';

import { NormalViewRepairButtons, SuperUserViewRepairButtons }
  from './RepairButtons';
import { statusName } from '../../lib/misc-helpers';

const Repair = ({
  repair, onRepairDelete, onMarkComplete, superUserView, onClickComments,
}) => (
  <tr id={`repair-data-${repair.id}`} className="repair-data">
    <td className="repair-id">{repair.id}</td>
    <td className="repair-date">{repair.date.toISOString().slice(0, 10)}</td>
    <td className="repair-time">{repair.time}</td>
    { superUserView ?
      <td className="repair-assigned-user">{
        repair.assignedUser ? repair.assignedUser.username : null
      }</td> : null
    }
    <td className="repair-status">{statusName(repair.status)}</td>
    <td>
      {superUserView ?
        <SuperUserViewRepairButtons
          repair={repair}
          onClickDelete={onRepairDelete}
          onClickComments={onClickComments}
        />
        :
        <NormalViewRepairButtons
          repair={repair}
          onClickMarkComplete={onMarkComplete}
          onClickComments={onClickComments}
        />
      }
    </td>
  </tr>
);

Repair.propTypes = {
  repair: PropTypes.object.isRequired,
  onRepairDelete: PropTypes.func.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
  onClickComments: PropTypes.func.isRequired,
  superUserView: PropTypes.bool.isRequired,
};

export default Repair;
