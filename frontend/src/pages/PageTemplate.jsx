import React from 'react';
import { PropTypes } from 'prop-types';
import MainNav from '../components/ui/MainNav';

const PageTemplate = ({ user, children }) => (
  <div className="main">
    <MainNav user={user} />
    {children}
  </div>
);

PageTemplate.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
