const MODE = require('dotenv').config().parsed.NODE_ENV || 'development';
const path = require('path');
const DIST = path.join(__dirname, 'client/dist');
const SRC = path.join(__dirname, 'client/src');

module.exports = {
  entry: SRC,
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-transform-runtime', { regenerator: true }],
          ],
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
