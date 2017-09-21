import React from 'react';

import PageTemplate from './PageTemplate';
import { UserListContainer } from '../components/containers';

const UsersPage = () => (
  <PageTemplate>
    <div className="container">
      <UserListContainer />
    </div>
  </PageTemplate>
);

export default UsersPage;
