'use strict';

const React = require('react'),
      ReactDOM = require('react-dom'),
      CommentsList = require('./commentsList.jsx');

const comments = window.comments;

ReactDOM.render(
  <CommentsList comments={comments} />,
  document.getElementById('app')
);
