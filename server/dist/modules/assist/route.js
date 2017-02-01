'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _middleware = require('../../middleware');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _toSchoolMajorList = require('./api/toSchoolMajorList');

var _toSchoolMajorList2 = _interopRequireDefault(_toSchoolMajorList);

var _fromSchoolList = require('./api/fromSchoolList');

var _fromSchoolList2 = _interopRequireDefault(_fromSchoolList);

var _toSchoolList = require('./api/toSchoolList');

var _toSchoolList2 = _interopRequireDefault(_toSchoolList);

var _transferAgreement = require('./api/transferAgreement');

var _transferAgreement2 = _interopRequireDefault(_transferAgreement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// public request
router.get('/:schoolCode/majors', function (req, res, next) {
    console.log('req.params.schoolCode: ', req.params.schoolCode);
    (0, _toSchoolMajorList2.default)(req.params.schoolCode).then(function (result) {
        res.send({ numbers: result.data, list: result.data, period: result.period });
    }).catch(next);
});

router.get('/colleges', function (req, res, next) {
    (0, _fromSchoolList2.default)().then(function (result) {
        res.send({ numbers: result.data.length, list: result.data, period: result.period });
    }).catch(next);
});

router.get('/universities', function (req, res, next) {
    (0, _toSchoolList2.default)().then(function (result) {
        res.send({ numbers: result.data.length, list: result.data, period: result.period });
    }).catch(next);
});

router.get('/agreement/:from/:to/:major', function (req, res, next) {
    var _req$params = req.params,
        from = _req$params.from,
        to = _req$params.to,
        major = _req$params.major;

    (0, _transferAgreement2.default)(from, to, major).then(function (result) {
        res.send(_extends({}, result));
    }).catch(next);
});

// console.log('============================')
// console.log('============================')
// console.log('============================')
// console.log('============================')

exports.default = router;