import { connect } from 'react-redux';

import C from '../constants';
import LoginForm from './ui/LoginForm';
import MainNav from './ui/MainNav';
import UserList from './ui/UserList';
import UserForm from './ui/UserForm';
import RepairForm from './ui/RepairForm';
import RepairList from './ui/RepairList';
import Message from './ui/Message';
import {
  login, logout, changeLoginForm, fetchUsers, editUser, addUser, removeUser,
  fetchRepairs, editRepair, addRepair, removeRepair,
} from '../actions';
import { findById } from '../lib/array-helpers';

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
    onUserDelete(e) {
      const userId = parseInt(e.target.id.split('-')[2], 10);
      dispatch(removeUser(userId));
    },
  }),
)(UserList);

export const RepairListContainer = connect(
  state => ({
    repairs: state.repairs,
    loading: state.loadingRepairs,
  }),
  dispatch => ({
    onClickReload(x) {
      x.preventDefault();
      dispatch(fetchRepairs());
    },
    onRepairDelete(e) {
      const repairId = parseInt(e.target.id.split('-')[2], 10);
      dispatch(removeRepair(repairId));
    },
  }),
)(RepairList);

export const UserFormContainer = connect(
  (state, props) => {
    const defaultResult = {
      id: props.userId,
      username: '',
      role: C.NORMAL_USER,
    };
    return props.userId ? findById(state.users, props.userId) : defaultResult;
  },
  dispatch => ({
    handleSubmit(e) {
      e.preventDefault();
      const userId = parseInt(e.target.userId.value, 10);
      const username = e.target.username.value;
      const role = e.target.isSuperuser.checked ? C.SUPERUSER : C.NORMAL_USER;
      dispatch(userId ?
        editUser(userId, username, role) : addUser(username, role));
    },
  }),
)(UserForm);

export const RepairFormContainer = connect(
  (state, props) => {
    let result = {
      id: props.repairId,
      date: new Date('1971-01-01'),
      time: '00:00',
      assignedUser: null,
      complete: false,
    };
    if (props.repairId) {
      result = findById(state.repairs, props.repairId);
      result.date = new Date(result.date);
    }
    result.users = state.users;
    return result;
  },
  dispatch => ({
    handleSubmit(e) {
      e.preventDefault();
      const repairId = parseInt(e.target.repairId.value, 10);
      const date = new Date(e.target.date.value);
      const time = e.target.time.value;
      const userId = parseInt(e.target.assignedUser.value, 10);
      const complete = e.target.complete.checked;
      dispatch(repairId ?
        editRepair(userId, repairId, date, time, complete)
        :
        addRepair(userId, date, time, complete));
    },
  }),
)(RepairForm);

export const MessageContainer = connect(
  (state) => {
    const message = state.errorMessage;

    /* Ensure the error message shows only once. We send it to UserForm by
     * sending it the "message" above, but now we reset it.
     */
    state.errorMessage = ''; // eslint-disable-line no-param-reassign

    return { message };
  },
)(Message);
