import React from 'react';
import { PropTypes } from 'prop-types';

const RepairForm = ({
  id, date, time, assignedUser, complete, users, handleSubmit,
}) => (
  <form className="repair-form form-horizontal" onSubmit={handleSubmit}>
    <input type="hidden" name="repairId" value={id} />
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
      <div className="col-xs-offset-4 col-xs-8">
        <label htmlFor="complete">
          <input
            type="checkbox"
            name="complete"
            defaultChecked={complete}
            ref={f => f}
          /> Complete
        </label>
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
  date: PropTypes.instanceOf(Date).isRequired,
  time: PropTypes.string.isRequired,
  assignedUser: PropTypes.object,
  complete: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

RepairForm.defaultProps = {
  assignedUser: null,
};

export default RepairForm;
