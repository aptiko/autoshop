import React from 'react';
import { PropTypes } from 'prop-types';

const Message = ({ message }) => (
  message ? (
    <div className="alert alert-danger" role="alert">
      <p>{message}</p>
    </div>
  ) : <div />
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
