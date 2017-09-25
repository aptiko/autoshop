import { connect } from 'react-redux';

import C from '../constants';
import RegistrationForm from './ui/RegistrationForm';
import LoginForm from './ui/LoginForm';
import MainNav from './ui/MainNav';
import UserList from './ui/UserList';
import UserForm from './ui/UserForm';
import RepairForm from './ui/RepairForm';
import RepairList from './ui/RepairList';
import RepairDetail from './ui/RepairDetail';
import Message from './ui/Message';
import {
  register, login, logout, fetchUsers, editUser, addUser, removeUser,
  fetchRepairs, editRepair, addRepair, removeRepair, markComplete,
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

export const RegistrationFormContainer = connect(
  f => f,
  dispatch => ({
    handleSubmit(x) {
      x.preventDefault();
      dispatch(register(
        x.target.username.value,
        x.target.email.value,
        x.target.password1.value,
        x.target.password2.value,
      ));
    },
  }),
)(RegistrationForm);

export const LoginFormContainer = connect(
  state => ({ ...state.loginForm }),
  dispatch => ({
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
  (state, ownProps) => ({
    repairs: ownProps.superUserView ?
      state.repairs
      :
      state.repairs.filter(r =>
        (r.assignedUser && r.assignedUser.id === state.loggedOnUser.id)),
    loading: state.loadingRepairs,
    superUserView: ownProps.superUserView,
    users: state.users,
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
    onMarkComplete(e) {
      const repairId = parseInt(e.target.id.split('-')[2], 10);
      dispatch(markComplete(repairId));
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
      description: '',
      date: new Date('1971-01-01'),
      time: '00:00',
      assignedUser: null,
      status: C.PENDING,
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
      const description = e.target.description.value;
      const date = new Date(e.target.date.value);
      const time = e.target.time.value;
      const userId = parseInt(e.target.assignedUser.value, 10);
      const status = e.target.status.value;
      dispatch(repairId ?
        editRepair(userId, repairId, description, date, time, status,
          '/repairs')
        :
        addRepair(userId, description, date, time, status));
    },
  }),
)(RepairForm);

export const RepairDetailContainer = connect(
  (state, props) => ({
    repair: findById(state.repairs, props.repairId),
    loggedOnUser: state.loggedOnUser,
    users: state.users,
  }),
)(RepairDetail);

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
