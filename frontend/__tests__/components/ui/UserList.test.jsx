import React from 'react';
import { shallow } from 'enzyme';

import C from '../../../src/constants';
import UserList from '../../../src/components/ui/UserList';
import { testUsers } from '../../global';

describe('<UserList /> UI element', () => {
  it('displays three users', () =>
    expect(shallow(<UserList users={testUsers} />).find('User').length)
      .toBe(3),
  );

  it('displays correct users', () => {
    const wrapper = shallow(<UserList users={testUsers} />);
    expect(wrapper.find('User').get(0).props.user.id).toBe(1);
    expect(wrapper.find('User').get(0).props.user.username).toBe('alice');
    expect(wrapper.find('User').get(0).props.user.role).toBe(C.NORMAL_USER);
    expect(wrapper.find('User').get(1).props.user.id).toBe(2);
    expect(wrapper.find('User').get(1).props.user.username).toBe('bob');
    expect(wrapper.find('User').get(1).props.user.role).toBe(C.SUPERUSER);
  });
});
