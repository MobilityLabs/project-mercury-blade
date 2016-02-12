'use strict';

const React = require('react'),
      API = require('./api'),
      CommentForm = require('./commentForm.jsx'),
      $ = require('jquery');

const Comment = React.createClass({
  propTypes: {
    comments: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      author: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired
    })).isRequired,
    commentId: React.PropTypes.number.isRequired,
    onCreateComment: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      shouldShowForm: false
    };
  },
  toggleForm() {
    this.setState({
      shouldShowForm: !this.state.shouldShowForm
    });
  },
  getComment() {
    return this.props.comments.find((comment) => {
      return comment.id === this.props.commentId;
    });
  },
  getChildren() {
    return this.props.comments.filter((comment) => {
      return comment.parent_id === this.props.commentId;
    });
  },
  render() {
    const comment = this.getComment(),
          children = this.getChildren(),
          comments = this.props.comments,
          nestingLevel = this.props.nesting;

    let form = '';

    if (this.state.shouldShowForm) {
      form = <CommentForm onCreateComment={this.props.onCreateComment} parent={comment} />;
    }

    return (
      <div className="comment" data-nesting-level={nestingLevel}>
        <div className="user-data">
          <div className="user-name pull-left">{comment.author}</div>
          <div className="update-data pull-right"></div>
        </div>
        <div className="comment-body">{comment.content}</div>
        <div className="actions">
          <div className="reply-btn" onClick={this.toggleForm}>
            <i className="fa fa-mail-reply reply-ico"></i> Reply
          </div>
        </div>
        { form }
        <div className="children">
          {children.map((child) => {
            return <Comment key={child.id}
                            commentId={child.id}
                            comments={comments}
                            onCreateComment={this.props.onCreateComment}
                            nesting={nestingLevel + 1} />
          })}
        </div>
      </div>
    );
  }
});

module.exports = Comment;
