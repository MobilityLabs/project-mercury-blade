'use strict';

const React = require('react'),
      CommentForm = require('./commentForm.jsx'),
      $ = require('jquery');

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
      comment: this.props.comment,
      shouldShowForm: false
    };
  },
  createComment(newComment) {
    const comment = this.state.comment;

    newComment.id = 100;
    newComment.children = [];

    const url = window.location + '/add_comment';
    $.ajax({
      url,
      method: 'POST',
      data: {
        comment: {
          body: newComment.content,
          username: newComment.author,
          parent_id: newComment.parentId
        }
      },
      success: () => {
        this.setState({
          comment: {
            id: comment.id,
            author: comment.author,
            content: comment.content,
            children: [...comment.children, newComment]
          }
        });
      }
    });
  },
  toggleForm() {
    this.setState({
      shouldShowForm: !this.state.shouldShowForm
    });
  },
  render() {
    const comment = this.state.comment;

    let form = '';
    if (this.state.shouldShowForm) {
      form = <CommentForm onCreateComment={this.createComment} parent={comment} />;
    }
    return (
      <div className="comment">
        <div className="user-data row">
          <div className="user-name col-xs-8">{comment.author}</div>
          <div className="update-data col-xs-4"></div>
        </div>
        <div className="comment-body">{comment.content}</div>
        <div className="children">
          {comment.children.map((child) => {
            return <Comment key={child.id} comment={child} />
          })}
        </div>
        <div className="actions">
          <div className="btn reply-btn" onClick={this.toggleForm}>
            <i className="fa fa-mail-reply reply-ico"></i> Reply
          </div>
        </div>
        { form }
      </div>
    );
  }
});

module.exports = Comment;
