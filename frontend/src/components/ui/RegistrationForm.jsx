import React from 'react';
import { PropTypes } from 'prop-types';

const RegistrationForm = ({ handleSubmit }) => (
  <form className="registration-form form-horizontal" onSubmit={handleSubmit}>
    <div className="form-group">
      <label
        htmlFor="username"
        className="col-xs-4 control-label"
      >
        Username
      </label>
      <input
        type="text"
        name="username"
        ref={f => f}
      />
    </div>
    <div className="form-group">
      <label
        htmlFor="email"
        className="col-xs-4 control-label"
      >
        Email address
      </label>
      <input
        type="text"
        name="email"
        ref={f => f}
      />
    </div>
    <div className="form-group">
      <label
        htmlFor="password1"
        className="col-xs-4 control-label"
      >
        Password
      </label>
      <input
        type="password"
        name="password1"
        ref={f => f}
      />
    </div>
    <div className="form-group">
      <label
        htmlFor="password2"
        className="col-xs-4 control-label"
      >
        Repeat password
      </label>
      <input
        type="password"
        name="password2"
        ref={f => f}
      />
    </div>
    <input type="submit" value="Register" />
  </form>
);

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
