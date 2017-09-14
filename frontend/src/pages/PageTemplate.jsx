import React from 'react';
import { PropTypes } from 'prop-types';
import { MainNavContainer } from '../components/containers';

const PageTemplate = ({ children }) => (
  <div className="main">
    <MainNavContainer />
    {children}
  </div>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
