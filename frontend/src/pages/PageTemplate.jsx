import React from 'react';
import { PropTypes } from 'prop-types';
import { MainNavContainer, MessageContainer } from '../components/containers';

const PageTemplate = ({ children }) => (
  <div className="main">
    <MainNavContainer />
    <MessageContainer />
    {children}
  </div>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
