import React from 'react';

import PageTemplate from './PageTemplate';
import { RegistrationFormContainer } from '../components/containers';

const LoginPage = () => (
  <PageTemplate>
    <div className="container">
      <RegistrationFormContainer />
    </div>
  </PageTemplate>
);

export default LoginPage;
