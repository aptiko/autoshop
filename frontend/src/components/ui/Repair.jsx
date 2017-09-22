import React from 'react';
import { PropTypes } from 'prop-types';

import { NormalViewRepairButtons, SuperUserViewRepairButtons }
  from './RepairButtons';

const Repair = ({ repair, onRepairDelete, onMarkComplete, superUserView }) => (
  <tr id={`repair-data-${repair.id}`} className="repair-data">
    <td className="repair-id">{repair.id}</td>
    <td className="repair-date">{repair.date.toISOString().slice(0, 10)}</td>
    <td className="repair-time">{repair.time}</td>
    { superUserView ?
      <td className="repair-assigned-user">{
        repair.assignedUser ? repair.assignedUser.username : null
      }</td> : null
    }
    <td className="repair-complete">
      {repair.complete ?
        <span className="glyphicon glyphicon-ok" aria-hidden="true" />
        :
        ''
      }
    </td>
    <td>
      {superUserView ?
        <SuperUserViewRepairButtons
          repairId={repair.id}
          onClickDelete={onRepairDelete}
        />
        :
        <NormalViewRepairButtons
          repairId={repair.id}
          onClickMarkComplete={onMarkComplete}
        />
      }
    </td>
  </tr>
);

Repair.propTypes = {
  repair: PropTypes.object.isRequired,
  onRepairDelete: PropTypes.func.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
  superUserView: PropTypes.bool.isRequired,
};

export default Repair;
