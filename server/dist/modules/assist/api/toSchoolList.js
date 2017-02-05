'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toSchoolList = function toSchoolList() {
    return new Promise(function (resolve, reject) {
        var momentStarting = new Date();
        (0, _request2.default)('http://web2.assist.org/web-assist/articulationAgreement.do?inst1=none&inst2=none&ia=CRAFTON&ay=16-17&oia=UCB&dir=1', function (err, res, html) {
            if (err || !res || !html) {
                reject();
            }
            var $ = _cheerio2.default.load(html);
            var toSchoolList = [];
            var toSchoolOneData = void 0;
            var index = void 0;
            var toSchoolData = $('select[name="oia"]').find('option');
            for (var _index in toSchoolData) {
                if (Number(_index)) {
                    var _toSchoolOneData = {
                        name: toSchoolData[_index].children[0].data.split('\n')[3].replace(/\s\s+/g, ''),
                        code: _querystring2.default.parse(toSchoolData[_index].attribs.value).oia
                    };
                    toSchoolList.push(_toSchoolOneData);
                }
            }
            console.log('toSchoolList: ', toSchoolList.length);
            var momentEnding = new Date();
            var period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period);
            return resolve({ data: toSchoolList, period: period });
        });
    });
};

exports.default = toSchoolList;