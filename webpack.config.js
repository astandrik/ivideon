var webpack = require('webpack');
var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: [
      'react-hot-loader/patch',"./app/index.js"],
    devtool: "source-map",
    output: {
        path: path.resolve('dist'),
        filename: "bundle.js",
        publicPath: '/dist/'
    },
    module: {
        loaders: [
           { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.js$/,   loaders: ['react-hot-loader/webpack', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
        ]
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve('dist')])
    ],
    devServer: {
    historyApiFallback: true,
     proxy: {
       '/dist': {
         target: 'http://localhost:5555/',
         secure: false
       }
     }
   }
};