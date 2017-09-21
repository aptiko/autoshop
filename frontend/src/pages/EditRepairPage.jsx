import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import PageTemplate from './PageTemplate';
import { RepairFormContainer } from '../components/containers';

const EditRepairPage = ({ match }) => (
  <PageTemplate>
    <div className="container">
      <RepairFormContainer repairId={parseInt(match.params.repairId, 10)} />
    </div>
  </PageTemplate>
);

EditRepairPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(EditRepairPage);
