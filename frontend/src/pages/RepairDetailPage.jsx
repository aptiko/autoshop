import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import PageTemplate from './PageTemplate';
import { RepairDetailContainer } from '../components/containers';

const RepairDetailPage = ({ match }) => (
  <PageTemplate>
    <div className="container">
      <RepairDetailContainer repairId={parseInt(match.params.repairId, 10)} />
    </div>
  </PageTemplate>
);

RepairDetailPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(RepairDetailPage);
