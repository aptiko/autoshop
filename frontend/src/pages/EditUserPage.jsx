import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import PageTemplate from './PageTemplate';
import { UserFormContainer } from '../components/containers';

const EditUserPage = ({ match }) => (
  <PageTemplate>
    <div className="container">
      <UserFormContainer userId={parseInt(match.params.userId, 10)} />
    </div>
  </PageTemplate>
);

EditUserPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(EditUserPage);
