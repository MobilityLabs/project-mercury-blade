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
        <div className="form-group">
          <label htmlFor={`comment-name${this.props.parent.id}`}>Name</label>
          <input type="text"
                 className="form-control"
                 id={`comment-name${this.props.parent.id}`}
                 value={this.state.author}
                 onChange={this.updateAuthor} />
        </div>
        <div className="form-group">
          <label htmlFor={`comment-content${this.props.parent.id}`}>Comment</label>
          <textarea className="form-control"
                    id={`comment-content${this.props.parent.id}`}
                    value={this.state.content}
                    onChange={this.updateContent}
                    rows="4"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default" disabled={!canSubmit}>Add</button>
        </div>
      </form>
    );
  }
});

module.exports = CommentForm;
