import { connect } from 'react-redux';

import LoginForm from './ui/LoginForm';
import MainNav from './ui/MainNav';
import UserList from './ui/UserList';
import { login, logout, changeLoginForm, fetchUsers } from '../actions';

export const MainNavContainer = connect(
  state => ({ loggedOnUser: state.loggedOnUser }),
  dispatch => ({
    handleLogout(e) {
      e.preventDefault();
      dispatch(logout());
    },
  }),
)(MainNav);

export const LoginFormContainer = connect(
  state => ({ ...state.loginForm }),
  dispatch => ({
    handleChange(x) {
      dispatch(changeLoginForm(x.target.name, x.target.value));
    },
    handleSubmit(x) {
      x.preventDefault();
      dispatch(login(x.target.username.value, x.target.password.value));
    },
  }),
)(LoginForm);

export const UserListContainer = connect(
  state => ({
    users: [...state.users].sort(
      (a, b) => a.username.localeCompare(b.username),
    ),
    loading: state.loadingUsers,
  }),
  dispatch => ({
    onClickReload(x) {
      x.preventDefault();
      dispatch(fetchUsers());
    },
  }),
)(UserList);
