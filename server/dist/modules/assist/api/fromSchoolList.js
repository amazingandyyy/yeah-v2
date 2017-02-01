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

var fromSchoolList = function fromSchoolList() {
    return new Promise(function (resolve, rej) {
        var momentStarting = new Date();
        (0, _request2.default)('http://web2.assist.org/web-assist/articulationAgreement.do?inst1=none&inst2=none&ia=CRAFTON&ay=16-17&oia=UCB&dir=1', function (err, res, html) {
            var $ = _cheerio2.default.load(html);
            var fromSchoolList = [];
            var fromSchoolOneData = void 0;
            var index = void 0;
            var fromSchoolData = $('select[name="ia"]').find('option');
            for (index in fromSchoolData) {
                if (Number(index)) {
                    var _fromSchoolOneData = {
                        name: fromSchoolData[index].children[0].data.replace('\n', '').replace(/\s\s+/g, ''),
                        code: _querystring2.default.parse(fromSchoolData[index].attribs.value).ia
                    };
                    fromSchoolList.push(_fromSchoolOneData);
                }
            }
            console.log('fromSchoolList: ', fromSchoolList.length);
            var momentEnding = new Date();
            var period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period);
            return resolve({ data: fromSchoolList, period: period });
        });
    });
};
exports.default = fromSchoolList;