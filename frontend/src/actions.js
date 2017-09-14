import 'isomorphic-fetch';

import C from './constants';

export const addRepair = (assignedUserId, date, time, complete) => dispatch =>
  fetch(
    '/repairs/',
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
      `/repairs/${id}/`,
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
    `/repairs/${id}/`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
    },
  ).then(() => ({ type: C.REMOVE_REPAIR, id }),
  ).then(dispatch);

export const addUser = (username, role) => dispatch =>
  fetch(
    '/users/',
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
    `/users/${id}/`,
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
    `/users/${id}/`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
    },
  ).then(() => ({ type: C.REMOVE_USER, id }),
  ).then(dispatch);

export const login = id => dispatch =>
  dispatch({ type: C.LOGIN, id, username: 'fixme', role: 'fixme' });

export const logout = () => dispatch =>
  dispatch({ type: C.LOGOUT });
