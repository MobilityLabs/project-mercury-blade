'use strict';

const React = require('react'),
      Comment = require('./comment.jsx');

const CommentsList = React.createClass({
  propTypes: {
    comments: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <div className="comments-list">
        {this.props.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} nesting={0} />
        })}
      </div>
    );
  }
});

module.exports = CommentsList;
