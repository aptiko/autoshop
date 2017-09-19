import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import C from '../../../src/constants';
import { UserListContainer } from '../../../src/components/containers';

jest.mock('../../../src/components/ui/UserList');
jest.mock('../../../src/actions');

describe('<UserListContainer />', () => {
  let wrapper;
  const store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() =>
      ({
        users: [
          {
            id: 1,
            username: 'bob',
            role: C.NORMAL_USER,
          }, {
            id: 2,
            username: 'alice',
            role: C.SUPERUSER,
          }, {
            id: 3,
            username: 'charlie',
            role: C.NORMAL_USER,
          },
        ],
      }),
    ),
  };

  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <UserListContainer />
      </Provider>,
    );
  });

  afterEach(() => jest.resetAllMocks());

  it('renders three users', () =>
    expect(wrapper.find('UserListMock').props().users.length).toBe(3),
  );

  it('sorts the users by username', () => {
    const result = wrapper.find('UserListMock');
    expect(result.props().users[0].id).toBe(2);
    expect(result.props().users[0].username).toBe('alice');
    expect(result.props().users[1].id).toBe(1);
    expect(result.props().users[1].username).toBe('bob');
  });

  it('dispatches a FETCHED_USERS action', () => {
    const e = { preventDefault: f => f };
    wrapper.find('UserListMock').props().onClickReload(e);
    expect(store.dispatch.mock.calls[0][0]).toEqual({
      type: C.FETCHED_USERS,
      users: [],
    });
  });
});
