import React from 'react';
import { shallow } from 'enzyme';

import C from '../../../src/constants';
import User from '../../../src/components/ui/User';

describe('<User /> UI element', () => {
  const user = {
    id: 47,
    username: 'alice',
    role: C.NORMAL_USER,
  };

  it('displays the user id', () =>
    expect(shallow(<User user={user} onUserDelete={f => f} />)
      .find('td.user-id').text()).toBe('47'),
  );

  it('displays the username', () =>
    expect(shallow(<User user={user} onUserDelete={f => f} />)
      .find('td.user-username').text()).toBe('alice'),
  );

  it('displays the role', () =>
    expect(shallow(<User user={user} onUserDelete={f => f} />)
      .find('td.user-role').text()).toBe('Normal user'),
  );
});
