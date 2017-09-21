import React from 'react';
import { PropTypes } from 'prop-types';

import C from '../../constants';

const UserForm = ({
  id, username, role, handleSubmit,
}) => (
  <form className="user-form form-horizontal" onSubmit={handleSubmit}>
    <input type="hidden" name="userId" value={id} />
    <div className="form-group">
      <label
        className="col-xs-4 control-label"
        htmlFor="username"
      >
        Username
      </label>
      <div className="col-xs-8">
        <input
          className="form-control"
          type="text"
          name="username"
          defaultValue={username}
          ref={f => f}
        />
      </div>
    </div>
    <div className="form-group">
      <div className="col-xs-offset-4 col-xs-8">
        <label htmlFor="isSuperuser">
          <input
            type="checkbox"
            name="isSuperuser"
            defaultChecked={role === C.SUPERUSER}
            ref={f => f}
          /> Super user
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

UserForm.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UserForm;
