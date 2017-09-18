import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import C from '../../../src/constants';
import { MainNavContainer } from '../../../src/components/containers';

jest.mock('../../../src/components/ui/MainNav');

describe('<MainNavContainer />', () => {
  let wrapper;
  const store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() =>
      ({
        loggedOnUser: {
          id: 1,
          username: 'alice',
          role: C.NORMAL_USER,
          authToken: 'topsecretkey',
        },
      }),
    ),
  };

  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <MainNavContainer />
      </Provider>,
    );
  });

  afterEach(() => jest.resetAllMocks());

  it('renders MainNav with appropriate logged-on user', () =>
    expect(wrapper.find('MainNavMock').props().loggedOnUser).toEqual({
      id: 1,
      username: 'alice',
      role: C.NORMAL_USER,
      authToken: 'topsecretkey',
    }),
  );

  it('dispatches a LOGOUT action', () => {
    const e = { preventDefault: f => f };
    wrapper.find('MainNavMock').props().handleLogout(e);
    expect(store.dispatch.mock.calls[0][0]).toEqual({
      type: C.LOGOUT,
    });
  });
});
