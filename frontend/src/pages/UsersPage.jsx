import React from 'react';
import { PropTypes } from 'prop-types';

import PageTemplate from './PageTemplate';

const UsersPage = ({ user }) => (
  <PageTemplate user={user}>
    <div className="container">
      <p>The list of users will soon be shown here.</p>
    </div>
  </PageTemplate>
);

UsersPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsersPage;
