const MODE = require('dotenv').config().parsed.NODE_ENV || 'development';
const path = require('path');


//* 
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
}


//*/


/*  
module.exports = {
  entry: './client/src',
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
};
//*/

/* 
const MODE = require('dotenv').config().parsed.NODE_ENV || 'development';
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
 */