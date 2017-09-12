import React from 'react';
import { PropTypes } from 'prop-types';

import PageTemplate from './PageTemplate';

const RepairsPage = ({ user, data, onUpdate }) => (
  <PageTemplate user={user}>
    <div className="container">
      <p>The list of repairs will soon be shown here.</p>
    </div>
  </PageTemplate>
);

RepairsPage.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RepairsPage;
