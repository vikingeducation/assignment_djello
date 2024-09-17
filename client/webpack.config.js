var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.(css)$/,
      use: ['style-loader', 'postcss-loader', 'css-loader'],
    }, {
      test: /\.(jpg|png|svg|woff|ttf)$/,
      use: 'file-loader'
    }, {
      test: /\.(scss|sass)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }
    }],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{ from: 'index.html', to: 'index.html' }])
  ]
};