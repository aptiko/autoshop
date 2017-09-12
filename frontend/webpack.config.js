var webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/dist/assets',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map',
  },
  devtool: '#eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
