import React from 'react';
import { PropTypes } from 'prop-types';

import RepairButtons from './RepairButtons';

const Repair = ({ repair, onRepairDelete }) => (
  <tr id={`repair-data-${repair.id}`} className="repair-data">
    <td className="repair-id">{repair.id}</td>
    <td className="repair-date">{repair.date.toISOString().slice(0, 10)}</td>
    <td className="repair-time">{repair.time}</td>
    <td className="repair-assigned-user">{
      repair.assignedUser ? repair.assignedUser.username : null
    }</td>
    <td className="repair-complete">
      {repair.complete ?
        <span className="glyphicon glyphicon-ok" aria-hidden="true" />
        :
        ''
      }
    </td>
    <td>
      <RepairButtons
        repairId={repair.id}
        onClickDelete={onRepairDelete}
      />
    </td>
  </tr>
);

Repair.propTypes = {
  repair: PropTypes.object.isRequired,
  onRepairDelete: PropTypes.func.isRequired,
};

export default Repair;
