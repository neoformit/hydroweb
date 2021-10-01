const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: /node_modules/,
        use: ['url-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname + '/src'),
      path.resolve(__dirname + '/node_modules'),
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.dev.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
