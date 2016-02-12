'use strict';

const React = require('react'),
      ReactDOM = require('react-dom'),
      CommentsList = require('./commentsList.jsx'),
      css = require('!style!css!less!../less/styles.less');

ReactDOM.render(
  <CommentsList />,
  document.getElementById('app')
);
