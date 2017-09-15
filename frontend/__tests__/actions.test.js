import fetchMock from 'fetch-mock';

import storeFactory from '../src/store';
import { addRepair, editRepair, removeRepair, addUser, editUser,
  removeUser, login, changeLoginForm } from '../src/actions';
import C from '../src/constants';
import { testUsers, testRepairs } from './global';

describe('addRepair action creator', () => {
  let store;
  let unsubscribePromiseResolver;
  let resolveHoldingPromise = false;
  const mockResponse = {
    id: 24,
    assigned_user: 57,
    date: '2017-08-11',
    time: '16:40:00',
    complete: false,
  };

  beforeAll(() => {
    fetchMock.post('end:/repairs/', mockResponse);
    store = storeFactory({ repairs: testRepairs });
    store.dispatch(addRepair(
      57, new Date('2017-08-11'), '16:40', false));
  });

  afterAll(() => {
    fetchMock.restore();
  });

  const resolvePromise = () => {
    if (resolveHoldingPromise) {
      resolveHoldingPromise();
    }
    resolveHoldingPromise = false;
  };

  beforeEach(() => {
    unsubscribePromiseResolver = store.subscribe(resolvePromise);
  });

  afterEach(() => {
    unsubscribePromiseResolver();
    resolveHoldingPromise = false;
  });

  it('calls fetch as needed', () =>
    fetchMock.flush().then(() => {
      expect(JSON.parse(fetchMock.lastCall('end:/repairs/')[1].body))
        .toEqual({
          assigned_user: 57,
          date: '2017-08-11',
          time: '16:40',
          complete: false,
        });
    }),
  );

  it('adds a new Repair', () =>
    new Promise((resolve) => { resolveHoldingPromise = resolve; })
      .then(() => {
        expect(store.getState().repairs.length).toBe(8);
        expect(store.getState().repairs[0]).toEqual(testRepairs[0]);
        expect(store.getState().repairs[1]).toEqual(testRepairs[1]);
        expect(store.getState().repairs[2]).toEqual(testRepairs[2]);
        expect(store.getState().repairs[3]).toEqual(testRepairs[3]);
        expect(store.getState().repairs[4]).toEqual(testRepairs[4]);
        expect(store.getState().repairs[5]).toEqual(testRepairs[5]);
        expect(store.getState().repairs[6]).toEqual(testRepairs[6]);
        expect(store.getState().repairs[7]).toEqual({
          id: 24,
          assignedUser: 57,
          date: new Date('2017-08-11'),
          time: '16:40',
          complete: false,
        });
      }),
  );
});

describe('editRepair action creator', () => {
  let store;
  let unsubscribePromiseResolver;
  let resolveHoldingPromise = false;
  const mockResponse = {
    id: 22,
    assigned_user: 57,
    date: '2017-08-11',
    time: '16:40:00',
    complete: false,
  };

  beforeAll(() => {
    fetchMock.put('end:/repairs/22/', mockResponse);
    store = storeFactory({ repairs: testRepairs });
    store.dispatch(editRepair(
      57, 22, new Date('2017-08-11'), '16:40', false));
  });

  afterAll(() => {
    fetchMock.restore();
  });

  const resolvePromise = () => {
    if (resolveHoldingPromise) {
      resolveHoldingPromise();
    }
    resolveHoldingPromise = false;
  };

  beforeEach(() => {
    unsubscribePromiseResolver = store.subscribe(resolvePromise);
  });

  afterEach(() => {
    unsubscribePromiseResolver();
    resolveHoldingPromise = false;
  });

  it('calls fetch as needed', () =>
    fetchMock.flush().then(() => {
      expect(
        JSON.parse(fetchMock.lastCall('end:/repairs/22/')[1].body))
        .toEqual({
          id: 22,
          assigned_user: 57,
          date: '2017-08-11',
          time: '16:40',
          complete: false,
        });
    }),
  );

  it('edits Repair', () =>
    new Promise((resolve) => { resolveHoldingPromise = resolve; })
      .then(() => {
        expect(store.getState().repairs.length).toBe(7);
        expect(store.getState().repairs[0]).toEqual(testRepairs[0]);
        expect(store.getState().repairs[1]).toEqual(testRepairs[1]);
        expect(store.getState().repairs[2]).toEqual(testRepairs[2]);
        expect(store.getState().repairs[3]).toEqual(testRepairs[3]);
        expect(store.getState().repairs[4]).toEqual(testRepairs[4]);
        expect(store.getState().repairs[5]).toEqual(testRepairs[6]);
        expect(store.getState().repairs[6]).toEqual({
          id: 22,
          assignedUser: 57,
          date: new Date('2017-08-11'),
          time: '16:40',
          complete: false,
        });
      }),
  );
});

describe('removeRepair action creator', () => {
  let store;

  beforeAll(() => {
    fetchMock.delete('end:/repairs/22/', {});
    store = storeFactory({ repairs: testRepairs });
    store.dispatch(removeRepair(22));
  });

  afterAll(() => {
    fetchMock.restore();
  });

  it('calls fetch as needed', () =>
    fetchMock.flush().then(() => {
      expect(fetchMock.lastCall('end:/repairs/22/')[1].method)
        .toBe('DELETE');
    }),
  );

  it('deletes Repair', () => {
    expect(store.getState().repairs.length).toBe(6);
    expect(store.getState().repairs[0]).toEqual(testRepairs[0]);
    expect(store.getState().repairs[1]).toEqual(testRepairs[1]);
    expect(store.getState().repairs[2]).toEqual(testRepairs[2]);
    expect(store.getState().repairs[3]).toEqual(testRepairs[3]);
    expect(store.getState().repairs[4]).toEqual(testRepairs[4]);
    expect(store.getState().repairs[5]).toEqual(testRepairs[6]);
  });
});

describe('addUser action creator', () => {
  let store;
  let unsubscribePromiseResolver;
  let resolveHoldingPromise = false;
  const mockResponse = {
    id: 4,
    username: 'david',
    is_staff: false,
  };

  beforeAll(() => {
    fetchMock.post('end:/users/', mockResponse);
    store = storeFactory({ users: testUsers });
    store.dispatch(addUser('david', C.NORMAL_USER));
  });

  afterAll(() => fetchMock.restore());

  const resolvePromise = () => {
    if (resolveHoldingPromise) {
      resolveHoldingPromise();
    }
    resolveHoldingPromise = false;
  };

  beforeEach(() => {
    unsubscribePromiseResolver = store.subscribe(resolvePromise);
  });

  afterEach(() => {
    unsubscribePromiseResolver();
    resolveHoldingPromise = false;
  });

  it('calls fetch as needed', () =>
    fetchMock.flush().then(() => {
      expect(JSON.parse(fetchMock.lastCall('end:/users/')[1].body))
        .toEqual({
          username: 'david',
          is_staff: false,
        });
    }),
  );

  it('adds a new user', () =>
    new Promise((resolve) => { resolveHoldingPromise = resolve; })
      .then(() => {
        expect(store.getState().users.length).toBe(4);
        expect(store.getState().users[0]).toEqual(testUsers[0]);
        expect(store.getState().users[1]).toEqual(testUsers[1]);
        expect(store.getState().users[2]).toEqual(testUsers[2]);
        expect(store.getState().users[3]).toEqual({
          id: 4,
          username: 'david',
          role: C.NORMAL_USER,
        });
      }),
  );
});

describe('editUser action creator', () => {
  let store;
  let unsubscribePromiseResolver;
  let resolveHoldingPromise = false;
  const mockResponse = {
    id: 2,
    username: 'bob',
    is_staff: false,
  };

  beforeAll(() => {
    fetchMock.put('end:/users/2/', mockResponse);
    store = storeFactory({ users: testUsers });
    store.dispatch(editUser(2, 'bob', C.NORMAL_USER));
  });

  afterAll(() => {
    fetchMock.restore();
  });

  const resolvePromise = () => {
    if (resolveHoldingPromise) {
      resolveHoldingPromise();
    }
    resolveHoldingPromise = false;
  };

  beforeEach(() => {
    unsubscribePromiseResolver = store.subscribe(resolvePromise);
  });

  afterEach(() => {
    unsubscribePromiseResolver();
    resolveHoldingPromise = false;
  });

  it('calls fetch as needed', () =>
    fetchMock.flush().then(() => {
      expect(JSON.parse(fetchMock.lastCall('end:/users/2/')[1].body))
        .toEqual({
          id: 2,
          username: 'bob',
          is_staff: false,
        });
    }),
  );

  it('edits user', () =>
    new Promise((resolve) => { resolveHoldingPromise = resolve; })
      .then(() => {
        expect(store.getState().users.length).toBe(3);
        expect(store.getState().users[0]).toEqual(testUsers[0]);
        expect(store.getState().users[2]).toEqual(testUsers[2]);
        expect(store.getState().users[1]).toEqual({
          id: 2,
          username: 'bob',
          role: C.NORMAL_USER,
        });
      }),
  );
});

describe('removeUser action creator', () => {
  let store;

  beforeAll(() => {
    fetchMock.delete('end:/users/2/', {});
    store = storeFactory({ users: testUsers });
    store.dispatch(removeUser(2));
  });

  afterAll(() => {
    fetchMock.restore();
  });

  it('calls fetch as needed', () =>
    fetchMock.flush().then(() => {
      expect(fetchMock.lastCall('end:/users/2/')[1].method).toBe('DELETE');
    }),
  );

  it('deletes user', () => {
    expect(store.getState().users.length).toBe(2);
    expect(store.getState().users[0]).toEqual(testUsers[0]);
    expect(store.getState().users[1]).toEqual(testUsers[2]);
  });
});

describe('login action creator', () => {
  let store;

  beforeAll(() => {
    fetchMock.post('end:/login/', {});
    store = storeFactory({ users: testUsers });
    store.dispatch(login('alice', 'topsecret'));
  });

  afterAll(() => {
    fetchMock.restore();
  });

  it('calls fetch as needed', () =>
    fetchMock.flush().then(() => {
      expect(fetchMock.lastCall('end:/login/')[1].method).toBe('POST');
    }),
  );
});

describe('logout action creator', () => {
  console.log('fixme');
});

describe('changeLoginForm action creator', () => {
  let store;

  beforeEach(() => {
    store = storeFactory({
      loginForm: {
        username: 'alice',
        password: 'topsecret',
      },
    });
  });

  it('changes username', () => {
    store.dispatch(changeLoginForm('username', 'george'));
    expect(store.getState().loginForm.username).toEqual('george');
    expect(store.getState().loginForm.password).toEqual('topsecret');
  });

  it('changes password', () => {
    store.dispatch(changeLoginForm('password', 'verysecret'));
    expect(store.getState().loginForm.username).toEqual('alice');
    expect(store.getState().loginForm.password).toEqual('verysecret');
  });
});
