import React from 'react';
import { PropTypes } from 'prop-types';

const LoginForm = ({ username, password, error, handleSubmit,
}) => (
  <form className="login-form" onSubmit={handleSubmit}>
    {error ?
      <p className="alert-danger">Wrong username/password or server error</p>
      :
      ''
    }
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        defaultValue={username}
        ref={f => f}
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        defaultValue={password}
        ref={f => f}
      />
    </div>
    <input type="submit" value="Login" />
  </form>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
