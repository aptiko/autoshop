import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { LoginFormContainer } from '../../../src/components/containers';

jest.mock('../../../src/components/ui/LoginForm');

describe('<LoginFormContainer />', () => {
  let wrapper;
  const store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() =>
      ({
        loginForm: {
          username: 'alice',
          password: 'topsecret',
          error: false,
        },
      }),
    ),
  };

  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <LoginFormContainer />
      </Provider>,
    );
  });

  afterEach(() => jest.resetAllMocks());

  it('renders LoginForm with appropriate username', () =>
    expect(wrapper.find('LoginFormMock').props().username).toBe('alice'),
  );

  it('renders LoginForm with appropriate password', () =>
    expect(wrapper.find('LoginFormMock').props().password).toBe('topsecret'),
  );

  it('renders LoginForm with appropriate error', () =>
    expect(wrapper.find('LoginFormMock').props().error).toBe(false),
  );
});
