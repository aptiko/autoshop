import 'isomorphic-fetch';

import C from './constants';
import history from './history';

import { findById } from './lib/array-helpers';

const getCookie = (name) => {
  const regexp = new RegExp(`(?:^${name}|;\\s*${name})=(.*?)(?:;|$)`, 'g');
  const result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
};

export const setErrorMessage = msg => ({
  type: C.SET_ERROR_MESSAGE,
  errorMessage: msg,
});

export const addRepair = (assignedUserId, date, time, complete) =>
  (dispatch, getState) =>
    fetch(
      '/api/repairs/',
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${getState().loggedOnUser.authToken}`,
        },
        body: JSON.stringify({
          assigned_user: assignedUserId,
          date: date.toISOString().slice(0, 10),
          time,
          complete,
        }),
      },
    )
      .then(
        response => (response.ok ? response.json() :
          response.text().then((t) => {
            throw new Error(
              `Could not add repair; the server responded: ${t}`);
          })),
      )
      .then(
        obj => ({
          type: C.ADD_REPAIR,
          id: obj.id,
          assignedUser: findById(getState().users, obj.assigned_user),
          date: new Date(obj.date),
          time: obj.time.slice(0, 5),
          complete: obj.complete,
        }),
      )
      .then(dispatch)
      .then(() => history.push('/'))
      .catch(err => dispatch(setErrorMessage(err.message)));

export const editRepair = (assignedUserId, id, date, time, complete) =>
  (dispatch, getState) =>
    fetch(
      `/api/repairs/${id}/`,
      {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${getState().loggedOnUser.authToken}`,
        },
        body: JSON.stringify({
          assigned_user: assignedUserId,
          id,
          date: date.toISOString().slice(0, 10),
          time,
          complete,
        }),
      })
      .then(
        response => (response.ok ? response.json() :
          response.text().then((t) => {
            throw new Error(
              `Could not edit repair; the server responded: ${t}`);
          })),
      )
      .then(
        obj => ({
          type: C.EDIT_REPAIR,
          id: obj.id,
          assignedUser: findById(getState().users, obj.assigned_user),
          date: new Date(obj.date),
          time: obj.time.slice(0, 5),
          complete: obj.complete,
        }))
      .then(dispatch)
      .then(() => history.push('/'))
      .catch(err => dispatch(setErrorMessage(err.message)));

export const removeRepair = id => (dispatch, getState) =>
  fetch(
    `/api/repairs/${id}/`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        Authorization: `Token ${getState().loggedOnUser.authToken}`,
      },
    },
  )
    .then(
      response => (response.ok ? null :
        response.text().then((t) => {
          throw new Error(
            `Could not delete repair; the server responded: ${t}`);
        })),
    )
    .then(() => ({ type: C.REMOVE_REPAIR, id }))
    .then(dispatch)
    .catch(err => dispatch(setErrorMessage(err.message)));

export const addUser = (username, role) => (dispatch, getState) =>
  fetch(
    '/api/users/',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getState().loggedOnUser.authToken}`,
      },
      body: JSON.stringify({
        username,
        is_staff: role === C.SUPERUSER,
      }),
    },
  )
    .then(
      response => (response.ok ? response.json() :
        response.text().then((t) => {
          throw new Error(`Could not add user; the server responded: ${t}`);
        })),
    )
    .then(
      obj => ({
        type: C.ADD_USER,
        id: obj.id,
        username: obj.username,
        role: obj.is_staff ? C.SUPERUSER : C.NORMAL_USER,
      }),
    )
    .then(dispatch)
    .then(() => history.push('/users'))
    .catch(err => dispatch(setErrorMessage(err.message)));

export const editUser = (id, username, role) => (dispatch, getState) =>
  fetch(
    `/api/users/${id}/`,
    {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getState().loggedOnUser.authToken}`,
      },
      body: JSON.stringify({
        id,
        username,
        is_staff: role === C.SUPERUSER,
      }),
    },
  )
    .then(
      response => (response.ok ? response.json() :
        response.text().then((t) => {
          throw new Error(`Could not edit user; the server responded: ${t}`);
        })),
    )
    .then(obj => ({
      type: C.EDIT_USER,
      id: obj.id,
      username: obj.username,
      role: obj.is_superuser ? C.SUPERUSER : C.NORMAL_USER,
    }))
    .then(dispatch)
    .then(() => history.push('/users'))
    .catch(err => dispatch(setErrorMessage(err.message)));

export const removeUser = id => (dispatch, getState) =>
  fetch(
    `/api/users/${id}/`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        Authorization: `Token ${getState().loggedOnUser.authToken}`,
      },
    },
  )
    .then(
      response => (response.ok ? null :
        response.text().then((t) => {
          throw new Error(`Could not delete user; the server responded: ${t}`);
        })),
    )
    .then(() => ({ type: C.REMOVE_USER, id }))
    .then(dispatch)
    .catch(err => dispatch(setErrorMessage(err.message)));

export const logout = () => ({ type: C.LOGOUT });

export const changeLoginForm = (name, value) =>
  ({
    type: C.CHANGE_LOGIN_FORM,
    username: name === 'username' ? value : null,
    password: name === 'password' ? value : null,
  });

export const fetchUsers = () => (dispatch, getState) => {
  dispatch({ type: C.START_FETCHING_USERS });
  fetch(
    '/api/users/',
    {
      headers: {
        Authorization: `Token ${getState().loggedOnUser.authToken}`,
      },
    },
  )
    .then(response => response.json())
    .then(obj => ({
      type: C.FETCHED_USERS,
      users: obj.map(x => ({
        id: x.id,
        username: x.username,
        role: x.is_staff ? C.SUPERUSER : C.NORMAL_USER,
      })),
    }))
    .then(dispatch)
    .catch((err) => {
      dispatch({ type: C.STOP_FETCHING_USERS });
      dispatch(setErrorMessage(err.message));
    });
};

export const fetchRepairs = () => (dispatch, getState) => {
  dispatch({ type: C.START_FETCHING_REPAIRS });
  fetch(
    '/api/repairs/',
    {
      headers: {
        Authorization: `Token ${getState().loggedOnUser.authToken}`,
      },
    },
  )
    .then(response => response.json())
    .then(obj => ({
      type: C.FETCHED_REPAIRS,
      repairs: obj.map(x => ({
        id: x.id,
        date: new Date(x.date),
        time: x.time,
        assignedUser: findById(getState().users, x.assigned_user),
        complete: x.complete,
      })),
    }))
    .then(dispatch)
    .catch((err) => {
      dispatch({ type: C.STOP_FETCHING_REPAIRS });
      dispatch(setErrorMessage(err.message));
    });
};

export const login = (username, password) => (dispatch) => {
  const action = {
    type: C.LOGIN,
    id: 0,
    username,
    role: '',
    authToken: '',
  };

  return fetch('/api/')
    .then(() => getCookie('csrftoken'))
    .then(csrftoken => fetch(
      '/api/rest-auth/login/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      },
    ))
    .then(
      (response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
    .then((obj) => {
      action.authToken = obj.key;
      return fetch(`/api/rest-auth/user/?username=${username}`,
        {
          headers: {
            Authorization: `Token ${obj.key}`,
          },
        });
    })
    .then(response => response.json())
    .then(obj => ({
      ...action,
      id: obj.pk,
    }))
    .then(dispatch)
    .then(() => history.push('/'))
    .then(() => dispatch(fetchUsers()))
    .then(() => dispatch(fetchRepairs()))
    .catch(() => dispatch({
      type: C.LOGIN,
      id: 0,
      username: '',
      role: '',
      authToken: '',
    }));
};

