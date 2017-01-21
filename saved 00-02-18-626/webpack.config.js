var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDER_LIBS = [
  "jquery",
  "lodash",
  "moment",
  "react",
  "react-dom",
  "react-dropzone",
  "react-input-range",
  "react-redux",
  "react-router",
  "react-widgets",
  "redux",
  "redux-form",
  "redux-thunk",
  "superagent"
]
module.exports = {
  entry: {
    bundle: './client/src/index.js',
    vendor: VENDER_LIBS
  },
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: '[name].[chunkhash].js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!sass-loader",
        })
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      },{ 
        test: /\.gif$/, 
        loader: 'url-loader?mimetype=img/png'
      },{ 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: 'url-loader?mimetype=application/font-woff'
      },{ 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[name].[ext]"
      },{
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack
      .optimize
      .CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
    new HtmlWebpackPlugin({template: 'client/src/index.html'}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      "global.GENTLY": false
    }),
    new webpack
      .optimize
      .UglifyJsPlugin({sourceMap: true}),
    new ExtractTextPlugin('style.css'),
  ],
  node: {
    __dirname: true,
  }
};
