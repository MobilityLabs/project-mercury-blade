'use strict';

const React = require('react'),
      API = require('./api'),
      Comment = require('./comment.jsx'),
      CommentForm = require('./commentForm.jsx');

const CommentsList = React.createClass({
  getInitialState() {
    return {
      comments: []
    };
  },
  componentWillMount() {
    this.setState({
      comments: window.comments
    });
  },
  createComment(comment) {
    API
      .createComment(comment)
      .then((response) => {
        const newComment = response.comment;
        this.setState({
          comments: [newComment, ...this.state.comments]
        });
      });
  },
  render() {
    const topLevelComments = this.state.comments.filter((comment) => {
      return !comment.parent_id;
    });
    return (
      <div className="comments-list">
        {topLevelComments.map((comment) => {
          return <Comment key={comment.id}
                          commentId={comment.id}
                          comments={this.state.comments}
                          nesting={0}
                          onCreateComment={this.createComment} />
        })}
        <CommentForm onCreateComment={this.createComment} />
      </div>
    );
  }
});

module.exports = CommentsList;
