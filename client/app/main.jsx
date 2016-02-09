'use strict';

const React = require('react'),
      ReactDOM = require('react-dom'),
      CommentsList = require('./commentsList.jsx');

ReactDOM.render(
  <CommentsList />,
  document.getElementById('app')
);
