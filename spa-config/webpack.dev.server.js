var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 添加在这里
// const entryPath = '../app/index.html';
const entryPath = '../app/detail/index.html';
module.exports = {
  entry: {
    app: ["../app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }, {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
  },
  plugins: [new HtmlWebpackPlugin({//添加在这里
    template: path.resolve(__dirname, entryPath),
    filename: 'index.html',
    inject: 'body'
  })]
};