import React from 'react';
import { PropTypes } from 'prop-types';

const CommentList = ({ comments }) => (
  <div id="comments">
    {comments.map(c => (
      <div key={c.id} className="panel panel-default">
        <div className="panel-heading">
          {c.user.username} says ({c.date.replace('T', ' ').slice(0, 19)}):
        </div>
        <div className="panel-body">{c.comment}</div>
      </div>
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;
