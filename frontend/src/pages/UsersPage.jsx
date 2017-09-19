import React from 'react';
import { PropTypes } from 'prop-types';

import PageTemplate from './PageTemplate';
import { UserListContainer } from '../components/containers'

const UsersPage = () => (
  <PageTemplate>
    <div className="container">
      <UserListContainer />
    </div>
  </PageTemplate>
);

export default UsersPage;
