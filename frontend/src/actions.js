import 'isomorphic-fetch';

import C from './constants';
import history from './history';

const getCookie = (name) => {
  const regexp = new RegExp(`(?:^${name}|;\\s*${name})=(.*?)(?:;|$)`, 'g');
  const result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
};

export const addRepair = (assignedUserId, date, time, complete) => dispatch =>
  fetch(
    '/api/repairs/',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assigned_user: assignedUserId,
        date: date.toISOString().slice(0, 10),
        time,
        complete,
      }),
    },
  ).then(response => response.json(),
  ).then(
    obj => ({
      type: C.ADD_REPAIR,
      id: obj.id,
      assignedUser: obj.assigned_user,
      date: new Date(obj.date),
      time: obj.time.slice(0, 5),
      complete: obj.complete,
    }),
  ).then(dispatch);

export const editRepair = (assignedUserId, id, date, time, complete) =>
  dispatch =>
    fetch(
      `/api/repairs/${id}/`,
      {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assigned_user: assignedUserId,
          id,
          date: date.toISOString().slice(0, 10),
          time,
          complete,
        }),
      },
    ).then(response => response.json(),
    ).then(
      obj => ({
        type: C.EDIT_REPAIR,
        id: obj.id,
        assignedUser: obj.assigned_user,
        date: new Date(obj.date),
        time: obj.time.slice(0, 5),
        complete: obj.complete,
      }),
    ).then(dispatch);

export const removeRepair = id => dispatch =>
  fetch(
    `/api/repairs/${id}/`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
    },
  ).then(() => ({ type: C.REMOVE_REPAIR, id }),
  ).then(dispatch);

export const addUser = (username, role) => dispatch =>
  fetch(
    '/api/users/',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        is_staff: role === C.SUPERUSER,
      }),
    },
  ).then(response => response.json(),
  ).then(
    obj => ({
      type: C.ADD_USER,
      id: obj.id,
      username: obj.username,
      role: obj.is_superuser ? C.SUPERUSER : C.NORMAL_USER,
    }),
  ).then(dispatch);

export const editUser = (id, username, role) => dispatch =>
  fetch(
    `/api/users/${id}/`,
    {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        username,
        is_staff: role === C.SUPERUSER,
      }),
    },
  ).then(response => response.json(),
  ).then(obj =>
    ({
      type: C.EDIT_USER,
      id: obj.id,
      username: obj.username,
      role: obj.is_superuser ? C.SUPERUSER : C.NORMAL_USER,
    }),
  ).then(dispatch);

export const removeUser = id => dispatch =>
  fetch(
    `/api/users/${id}/`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
    },
  ).then(() => ({ type: C.REMOVE_USER, id }),
  ).then(dispatch);

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
        if (response.status !== 200) {
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
    .catch(() => dispatch({
      type: C.LOGIN,
      id: 0,
      username: '',
      role: '',
      authToken: '',
    }));
};

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
    .then(dispatch);
};
