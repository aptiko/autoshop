import React from 'react';

import PageTemplate from './PageTemplate';
import { LoginFormContainer } from '../components/containers';

const LoginPage = () => (
  <PageTemplate>
    <div className="container">
      <LoginFormContainer />
    </div>
  </PageTemplate>
);

export default LoginPage;
