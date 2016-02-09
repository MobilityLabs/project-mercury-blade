const React = require('react');

const Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      author: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
      children: React.PropTypes.array.isRequired
    }).isRequired
  },
  render() {
    const comment = this.props.comment;

    return (
      <div className="comment">
        {comment.author}
        {comment.content}
        {comment.children.map((child) => {
          return <Comment key={child.id} comment={child} />
        })}
      </div>
    );
  }
});

module.exports = Comment;
