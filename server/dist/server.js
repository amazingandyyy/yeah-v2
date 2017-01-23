'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeStamp = new Date().getTime();

// Initialize env variable
require('dotenv').config();

// import packages

// Import routes


if (_config.settingIsGood) {
  console.log('------------------------ start node server (' + timeStamp + ') ------------------------');
  var MONGOURI = _config2.default.mongo_uri;
  // MongoDB Setup
  if (!process.env.JWT_SECRET) {
    console.error('->No jwt secret. MongoDB is not connected!');
  } else {
    _mongoose2.default.connect(MONGOURI, function (err) {
      console.log(err || '->MongoDB Connected to ' + _config2.default.mongo_log + ' \n->Webpack is loading... ');
    });
    _mongoose2.default.Promise = global.Promise;
  }

  // Execute express and setting up the server
  var app = (0, _express2.default)();
  app.use((0, _cors2.default)());
  app.use((0, _morgan2.default)('dev'));
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));

  // API starts from here
  app.use('/api', _api2.default);

  // Run React front-end files(start from index.html)
  if (process.env.NODE_ENV == 'production') {
    app.use(_express2.default.static('./client/dist'));
    app.get('*', function (req, res) {
      res.sendFile(_path2.default.join(__dirname, 'client/dist', 'index.html'));
    });
  } else {
    var webpackMiddleware = require('webpack-dev-middleware');
    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
  }

  app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(422).send({ errors: err.message });
  });

  app.listen(process.env.PORT || 8000, function (err) {
    return console.log(err || '->Listening on ' + (process.env.PORT || 'PORT: 8000'));
  });
} else {
  console.log('------------------------ complete config setting to start the server ------------------------');
}