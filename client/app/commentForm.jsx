'use strict';

const React = require('react');

const CommentForm = React.createClass({
  propTypes: {
    parent: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      author: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
      children: React.PropTypes.array.isRequired
    }).isRequired,
    onCreateComment: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      author: '',
      content: ''
    };
  },
  updateAuthor(event) {
    this.setState({ author: event.target.value });
  },
  updateContent(event) {
    this.setState({ content: event.target.value });
  },
  submitComment(e) {
    const author = this.state.author.trim(),
          content = this.state.content.trim();

    this.props.onCreateComment({author, content });
    this.setState({ author: '', content: '' });

    e.preventDefault();
  },
  render() {
    const canSubmit = this.state.author !== '' && this.state.content !== '';

    return (
      <form className="comment-form" onSubmit={this.submitComment}>
        <input type="text" value={this.state.author} onChange={this.updateAuthor} />
        <textarea type="text" value={this.state.content} onChange={this.updateContent} />
        <input type="submit" value="Add" disabled={!canSubmit} />
      </form>
    );
  }
});

module.exports = CommentForm;
