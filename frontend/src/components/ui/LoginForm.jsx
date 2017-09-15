import React from 'react';
import { PropTypes } from 'prop-types';

const LoginForm = ({ username, password, error, handleChange, handleSubmit,
}) => (
  <form className="login-form" onSubmit={handleSubmit}>
    {error ?
      <p className="alert-danger">Wrong username/password or server error</p>
      :
      ''
    }
    <input
      type="text"
      name="username"
      value={username}
      onChange={handleChange}
    />
    <input
      type="password"
      name="password"
      value={password}
      onChange={handleChange}
    />
    <input type="submit" value="Login" />
  </form>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
