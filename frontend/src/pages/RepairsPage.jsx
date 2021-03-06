import React from 'react';

import PageTemplate from './PageTemplate';
import { RepairListContainer } from '../components/containers';

const RepairsPage = () => (
  <PageTemplate>
    <div className="container">
      <RepairListContainer superUserView={true} />
    </div>
  </PageTemplate>
);

export default RepairsPage;
