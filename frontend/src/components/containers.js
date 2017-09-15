import { connect } from 'react-redux';

import LoginForm from './ui/LoginForm';
import MainNav from './ui/MainNav';
import { login, changeLoginForm } from '../actions';

export const MainNavContainer = connect(
  state => ({ loggedOnUser: state.loggedOnUser }),
)(MainNav);

export const LoginFormContainer = connect(
  state => ({
    username: state.loginForm.username,
    password: state.loginForm.password,
    error: state.loginForm.error,
  }),
  dispatch => ({
    handleChange(x) {
      dispatch(changeLoginForm(x.target.name, x.target.value));
    },
    handleSubmit(x) {
      dispatch(login(x.target.username.value, x.target.password.value));
    },
  }),
)(LoginForm);
