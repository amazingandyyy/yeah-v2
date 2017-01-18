var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDER_LIBS = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "react-router",
  "redux",
  "redux-form",
  "redux-thunk"
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
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ],
        test: /\.scss$/
      },

// Old settings for .svg .woff .eot .ttf loaders

      // }, {
      //   test: /\.svg$/,
      //   use: 'react-svg-loader'},
      // }, {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file'
      // }, {
      //   test: /\.(woff|woff2)$/,
      //   loader: 'url?prefix=font/&limit=5000'
      // }, {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url?limit=10000&mimetype=application/octet-stream'
      // }, {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url?limit=10000&mimetype=image/svg+xml'
      // },


        // New config for react widgets from react-widgets document


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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack
      .optimize
      .UglifyJsPlugin({sourceMap: true})
  ]
};
