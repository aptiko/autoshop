import deepFreeze from 'deep-freeze';

import { repairs, users, loggedOnUser, loginForm }
  from '../../src/store/reducers';
import C from '../../src/constants';
import { testUsers, testRepairs } from '../global';

describe('repairs reducer', () => {
  it('adds repair and puts it in correct order', () => {
    const action = {
      type: C.ADD_REPAIR,
      id: 24,
      assignedUser: 1,
      date: new Date('2017-06-11'),
      time: '16:40',
      complete: false,
    };
    deepFreeze(action);
    const result = repairs(testRepairs, action);
    expect(result.length).toBe(8);
    expect(result[0]).toEqual(testRepairs[0]);
    expect(result[1]).toEqual(testRepairs[1]);
    expect(result[2]).toEqual(testRepairs[2]);
    expect(result[3]).toEqual(testRepairs[3]);
    expect(result[4]).toEqual({
      id: 24,
      assignedUser: 1,
      date: new Date('2017-06-11'),
      time: '16:40',
      complete: false,
    });
    expect(result[5]).toEqual(testRepairs[4]);
    expect(result[6]).toEqual(testRepairs[5]);
    expect(result[7]).toEqual(testRepairs[6]);
  });

  it('edits repair and puts it in correct order', () => {
    const action = {
      type: C.EDIT_REPAIR,
      id: 22,
      assignedUser: 1,
      date: new Date('2017-06-11'),
      time: '16:40',
      complete: false,
    };
    deepFreeze(action);
    const result = repairs(testRepairs, action);
    expect(result.length).toBe(7);
    expect(result[0]).toEqual(testRepairs[0]);
    expect(result[1]).toEqual(testRepairs[1]);
    expect(result[2]).toEqual(testRepairs[2]);
    expect(result[3]).toEqual(testRepairs[3]);
    expect(result[4]).toEqual({
      id: 22,
      assignedUser: 1,
      date: new Date('2017-06-11'),
      time: '16:40',
      complete: false,
    });
    expect(result[5]).toEqual(testRepairs[4]);
    expect(result[6]).toEqual(testRepairs[6]);
  });

  it('cannot edit nonexistent repair', () => {
    const action = {
      type: C.EDIT_REPAIR,
      id: 25,
      assignedUser: 1,
      date: new Date('2017-08-11'),
      time: '16:40',
      complete: false,
    };
    deepFreeze(action);
    const result = repairs(testRepairs, action);
    expect(result).toEqual(testRepairs);
  });

  it('removes repair', () => {
    const action = {
      type: C.REMOVE_REPAIR,
      id: 22,
    };
    deepFreeze(action);
    const result = repairs(testRepairs, action);
    expect(result.length).toBe(6);
    expect(result[0]).toEqual(testRepairs[0]);
    expect(result[1]).toEqual(testRepairs[1]);
    expect(result[2]).toEqual(testRepairs[2]);
    expect(result[3]).toEqual(testRepairs[3]);
    expect(result[4]).toEqual(testRepairs[4]);
    expect(result[5]).toEqual(testRepairs[6]);
  });

  it('does not remove nonexistent repair', () => {
    const action = {
      type: C.REMOVE_REPAIR,
      id: 25,
    };
    deepFreeze(action);
    const result = repairs(testRepairs, action);
    expect(result).toEqual(testRepairs);
  });
});

describe('users reducer', () => {
  it('adds user', () => {
    const action = {
      type: C.ADD_USER,
      id: 4,
      username: 'david',
      role: C.NORMAL_USER,
    };
    deepFreeze(action);
    const result = users(testUsers, action);
    expect(result.length).toBe(4);
    expect(result[0]).toEqual(testUsers[0]);
    expect(result[1]).toEqual(testUsers[1]);
    expect(result[2]).toEqual(testUsers[2]);
    expect(result[3]).toEqual({
      id: 4,
      username: 'david',
      role: C.NORMAL_USER,
    });
  });

  it('edits user', () => {
    const action = {
      type: C.EDIT_USER,
      id: 2,
      username: 'bob',
      role: C.NORMAL_USER,
    };
    deepFreeze(action);
    const result = users(testUsers, action);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual(testUsers[0]);
    expect(result[1]).toEqual({
      id: 2,
      username: 'bob',
      role: C.NORMAL_USER,
    });
    expect(result[2]).toEqual(testUsers[2]);
  });

  it('cannot edit nonexistent user', () => {
    const action = {
      type: C.EDIT_USER,
      id: 4,
      username: 'bob',
      role: C.NORMAL_USER,
    };
    deepFreeze(action);
    const result = users(testUsers, action);
    expect(result).toEqual(testUsers);
  });

  it('removes user', () => {
    const action = {
      type: C.REMOVE_USER,
      id: 2,
    };
    deepFreeze(action);
    const result = users(testUsers, action);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual(testUsers[0]);
    expect(result[1]).toEqual(testUsers[2]);
  });

  it('does not remove nonexistent user', () => {
    const action = {
      type: C.REMOVE_USER,
      id: 5,
    };
    deepFreeze(action);
    const result = users(testUsers, action);
    expect(result).toEqual(testUsers);
  });
});

describe('loggedOnUser reducer', () => {
  it('logs in', () => {
    const action = {
      type: C.LOGIN,
      id: 1,
      username: 'alice',
      role: C.NORMAL_USER,
    };
    deepFreeze(action);
    const result = loggedOnUser({}, action);
    expect(result).toEqual({
      id: 1,
      username: 'alice',
      role: C.NORMAL_USER,
    });
  });

  it('logs out', () => {
    const action = {
      type: C.LOGOUT,
    };
    deepFreeze(action);
    const result = loggedOnUser({
      id: 1,
      username: 'alice',
      role: C.NORMAL_USER,
      authToken: 'topsecret',
    }, action);
    expect(result).toEqual({
      id: 0,
      username: '',
      role: '',
      authToken: '',
    });
  });
});

describe('loginForm reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = { username: 'alice', password: 'topsecret', error: false };
  });

  it('changes username', () => {
    const action = {
      type: C.CHANGE_LOGIN_FORM,
      username: 'bob',
      password: null,
    };
    deepFreeze(action);
    const result = loginForm(initialState, action);
    expect(result).toEqual({
      username: 'bob',
      password: 'topsecret',
      error: false,
    });
  });

  it('changes password', () => {
    const action = {
      type: C.CHANGE_LOGIN_FORM,
      username: null,
      password: 'verysecret',
    };
    deepFreeze(action);
    const result = loginForm(initialState, action);
    expect(result).toEqual({
      username: 'alice',
      password: 'verysecret',
      error: false,
    });
  });
});
