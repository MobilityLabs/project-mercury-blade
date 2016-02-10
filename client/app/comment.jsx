'use strict';

const React = require('react'),
      CommentForm = require('./commentForm.jsx');

const Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      author: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
      children: React.PropTypes.array.isRequired
    }).isRequired
  },
  // TODO: this is an anti-pattern: https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
  // Flux or Redux would fix this.
  getInitialState() {
    return {
      comment: this.props.comment
    };
  },
  createComment(newComment) {
    const comment = this.state.comment;

    newComment.id = 100;
    newComment.children = [];

    // TODO: create comment on server.
    // Using setTimeout to make sure async works.
    setTimeout(() => {
      this.setState({
        comment: {
          id: comment.id,
          author: comment.author,
          content: comment.content,
          children: [...comment.children, newComment]
        }
      });
    });
  },
  render() {
    const comment = this.state.comment;

    return (
      <div className="comment">
        {comment.author}
        {comment.content}
        {comment.children.map((child) => {
          return <Comment key={child.id} comment={child} />
        })}
        <CommentForm onCreateComment={this.createComment} parent={comment} on/>
      </div>
    );
  }
});

module.exports = Comment;
