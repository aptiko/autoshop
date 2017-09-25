import React from 'react';
import { PropTypes } from 'prop-types';

import C from '../../constants';
import { statusName } from '../../lib/misc-helpers';

const RepairForm = ({
  id, description, date, time, assignedUser, status, users, handleSubmit,
}) => (
  <form className="repair-form form-horizontal" onSubmit={handleSubmit}>
    <input type="hidden" name="repairId" value={id} />
    <div className="form-group">
      <label
        className="col-xs-4 control-label"
        htmlFor="description"
      >
        Description
      </label>
      <div className="col-xs-8">
        <input
          className="form-control"
          type="text"
          name="description"
          defaultValue={description}
          ref={f => f}
        />
      </div>
    </div>
    <div className="form-group">
      <label
        className="col-xs-4 control-label"
        htmlFor="date"
      >
        Date
      </label>
      <div className="col-xs-8">
        <input
          className="form-control"
          type="text"
          name="date"
          defaultValue={date.toISOString().slice(0, 10)}
          ref={f => f}
        />
      </div>
    </div>
    <div className="form-group">
      <label
        className="col-xs-4 control-label"
        htmlFor="time"
      >
        Time
      </label>
      <div className="col-xs-8">
        <input
          className="form-control"
          type="text"
          name="time"
          defaultValue={time}
          ref={f => f}
        />
      </div>
    </div>
    <div className="form-group">
      <label
        className="col-xs-4 control-label"
        htmlFor="assignedUser"
      >
        Assigned user
      </label>
      <div className="col-xs-8">
        <select
          className="form-control"
          name="assignedUser"
          defaultValue={assignedUser ? assignedUser.id : 0}
          ref={f => f}
        >
          <option key={0} value={null} />
          {users.map(u =>
            <option key={u.id} value={u.id}>{u.username}</option>,
          )}
        </select>
      </div>
    </div>
    <div className="form-group">
      <label
        htmlFor="status"
        className="col-xs-4 control-label"
      >
        Status
      </label>
      <div className="col-xs-8">
        <select
          className="form-control"
          name="status"
          defaultValue={status}
          ref={f => f}
        >
          {[C.PENDING, C.COMPLETE, C.APPROVED].map(s =>
            <option key={s} value={s}>{statusName(s)}</option>)
          }
        </select>
      </div>
    </div>
    <div className="form-group">
      <div className="col-xs-offset-4 col-xs-8">
        <input className="btn btn-default" type="submit" value="Submit" />
      </div>
    </div>
  </form>
);

RepairForm.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  time: PropTypes.string.isRequired,
  assignedUser: PropTypes.object,
  status: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

RepairForm.defaultProps = {
  assignedUser: null,
};

export default RepairForm;
