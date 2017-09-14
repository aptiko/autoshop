import React from 'react';
import { shallow } from 'enzyme';

import UsersMenuItem from '../../../src/components/ui/UsersMenuItem';
import { testUsers } from '../../global';

describe('<UsersMenuItem /> UI Component', () => {
  it('renders nothing for normal users', () =>
    expect(
      shallow(<UsersMenuItem loggedOnUser={testUsers[0]} />).find('li').length)
      .toBe(0),
  );

  it('renders a User menu item for super users', () =>
    expect(
      shallow(<UsersMenuItem loggedOnUser={testUsers[1]} />).find('li').length)
      .toBe(1),
  );
});
