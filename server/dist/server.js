'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/api', function (req, res) {
    return res.send({ message: 'api work!' });
});

if (process.env.NODE_ENV !== 'production') {
    var webpackMiddleware = require('webpack-dev-middleware');
    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.config.js');

    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    app.use(_express2.default.static('./client/dist'));
    app.get('*', function (req, res) {
        res.sendFile(_path2.default.join(__dirname, 'client/dist', 'index.html'));
    });
}

app.listen(process.env.PORT || 3050, function () {
    return console.log('Listening on PORT:3050');
});