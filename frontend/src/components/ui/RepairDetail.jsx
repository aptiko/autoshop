import React from 'react';
import { PropTypes } from 'prop-types';
import 'isomorphic-fetch';

import { statusName } from '../../lib/misc-helpers';
import { findById } from '../../lib/array-helpers';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class RepairDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      loading: false,
      error: null,
    };
    this.onClickAddComment = this.onClickAddComment.bind(this);
  }

  componentWillMount() {
    this.fetchComments();
  }

  onClickAddComment(e) {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (!comment) {
      return;
    }
    fetch(
      `/api/repairs/${this.props.repair.id}/comments/`,
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.props.loggedOnUser.authToken}`,
        },
        body: JSON.stringify({
          repair: this.props.repair.id,
          user: this.props.loggedOnUser.id,
          comment,
        }),
      },
    )
      .then(
        response => (response.ok ? null :
          response.text().then((t) => {
            throw new Error(
              `Could not add comment; the server responded: ${t}`);
          })),
      )
      .then(() => this.fetchComments())
      .catch(err => this.setState({ error: err.message }));
  }

  fetchComments() {
    this.setState({ loading: true });
    if (!this.props.repair) {
      return;
    }
    fetch(
      `/api/repairs/${this.props.repair.id}/comments/`,
      {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.props.loggedOnUser.authToken}`,
        },
      },
    )
      .then(response => (response.ok ? response.json() :
        response.text().then((t) => {
          throw new Error(
            `Could not get comments; the server responded: ${t}`);
        })),
      )
      .then(comments => this.setState({
        comments: comments.map(c => ({
          ...c,
          user: findById(this.props.users, c.user),
        })),
        loading: false,
        error: null,
      }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  render() {
    if (this.state.error) {
      return <p className="text-danger">{this.state.error}</p>;
    }
    if (this.state.loading) {
      return <p className="text-warning">Loading...</p>;
    }
    if (!this.props.repair) {
      return null;
    }
    return (
      <div id="repair">
        <h1>Repair {this.props.repair.id}</h1>
        <p>
          {this.props.repair.date.toISOString().slice(0, 10)}
          &nbsp;
          {this.props.repair.time}
        </p>
        <p><b>Assigned to:</b> {this.props.repair.assignedUser.username}</p>
        <p><b>Status:</b> {statusName(this.props.repair.status)}</p>
        <CommentList comments={this.state.comments} />
        <CommentForm handleSubmit={this.onClickAddComment} />
      </div>
    );
  }
}

RepairDetail.propTypes = {
  repair: PropTypes.object,
  loggedOnUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

RepairDetail.defaultProps = {
  repair: null,
};

export default RepairDetail;
