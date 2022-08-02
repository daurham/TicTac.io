const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MODE = require('dotenv').config().parsed.NODE_ENV || 'development';
const URL = require('dotenv').config().parsed.URL || 'localhost';
const SVRPORT = require('dotenv').config().parsed.PORT || 3000;
const WPPORT = 8080;



module.exports = {
  entry: path.resolve(__dirname, './client/src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  mode: MODE,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/dist/index.html'),
    }),
  ],
  devServer: {
    port: 8080,
  },
};

