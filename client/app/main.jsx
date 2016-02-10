'use strict';

const React = require('react'),
      ReactDOM = require('react-dom'),
      CommentsList = require('./commentsList.jsx'),
      css = require('!style!css!less!../less/styles.less');

const comments = window.comments;

ReactDOM.render(
  <CommentsList comments={comments} />,
  document.getElementById('app')
);
