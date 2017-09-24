import React from 'react';
import { PropTypes } from 'prop-types';

const CommentForm = ({ handleSubmit }) => (
  <div className="panel panel-default">
    <div className="panel-body">
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea className="form-control" name="comment" ref={f => f} />
        </div>
        <div className="form-group">
          <input className="btn btn-default" type="submit" value="Comment" />
        </div>
      </form>
    </div>
  </div>
);

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
