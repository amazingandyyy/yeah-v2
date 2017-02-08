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

var toSchoolMajorList = function toSchoolMajorList(schoolCode) {
    return new Promise(function (resolve, reject) {
        var momentStarting = new Date();
        (0, _request2.default)('http://web2.assist.org/web-assist/articulationAgreement.do?inst1=none&inst2=none&ia=CRAFTON&ay=16-17&oia=' + schoolCode + '&dir=1', function (err, res, html) {
            if (err || !res || !html) {
                reject();
            }
            var $ = _cheerio2.default.load(html);
            var toSchoolMajorList = [];
            var toSchoolMajorOneData = void 0;
            var index = void 0;
            var toSchoolMajorData = $('form[name="major"]>select[name="dora"]').find('option');
            for (index in toSchoolMajorData) {
                if (Number(index) > 4) {
                    toSchoolMajorOneData = {
                        name: toSchoolMajorData[index].children[0].data.replace(/\s\s+/g, ''),
                        code: toSchoolMajorData[index].attribs.value
                    };
                    toSchoolMajorList.push(toSchoolMajorOneData);
                }
            }
            console.log('toSchoolMajorList: ', toSchoolMajorList.length);
            var momentEnding = new Date();
            var period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period);
            return resolve({ data: toSchoolMajorList, period: period });
        });
    });
};

exports.default = toSchoolMajorList;