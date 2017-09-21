import React from 'react';
import { shallow } from 'enzyme';

import C from '../../../src/constants';
import UserList from '../../../src/components/ui/UserList';
import { testUsers } from '../../global';

describe('<UserList /> UI element', () => {
  it('displays three users', () =>
    expect(shallow(
      <UserList
        users={testUsers}
        loading={false}
        onClickReload={f => f}
        onUserDelete={f => f}
      />,
    ).find('User').length).toBe(3),
  );

  it('displays correct users', () => {
    const wrapper = shallow(
      <UserList
        users={testUsers}
        loading={false}
        onClickReload={f => f}
        onUserDelete={f => f}
      />,
    );
    expect(wrapper.find('User').get(0).props.user.id).toBe(1);
    expect(wrapper.find('User').get(0).props.user.username).toBe('alice');
    expect(wrapper.find('User').get(0).props.user.role).toBe(C.NORMAL_USER);
    expect(wrapper.find('User').get(1).props.user.id).toBe(2);
    expect(wrapper.find('User').get(1).props.user.username).toBe('bob');
    expect(wrapper.find('User').get(1).props.user.role).toBe(C.SUPERUSER);
  });

  it('displays "loading..."', () =>
    expect(shallow(
      <UserList
        users={testUsers}
        loading={true}
        onClickReload={f => f}
        onUserDelete={f => f}
      />,
    ).find('h1 small').text()).toBe('Loading...'),
  );

  it('displays Reload button', () =>
    expect(shallow(
      <UserList
        users={testUsers}
        loading={false}
        onClickReload={f => f}
        onUserDelete={f => f}
      />,
    ).find('h1 small a').text()).toBe('Reload'),
  );

  it('invokes onClickReload', () => {
    const click = jest.fn();
    shallow(
      <UserList
        users={testUsers}
        loading={false}
        onClickReload={click}
        onUserDelete={f => f}
      />,
    ).find('h1 small a').simulate('click');
    expect(click).toBeCalled();
  });
});
