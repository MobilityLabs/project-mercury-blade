const path = require('path');

const entry = [path.resolve(__dirname, 'app/main.jsx')];

if (process.env.NODE_ENV !== 'production') {
  entry.unshift(
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  );
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }, {
      test: /\.jpg$/,
      loader: "file-loader"
    }]
  },
  devtool: 'source-map'
};
