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

var transferAgreement = function transferAgreement(from, to, major) {
    return new Promise(function (resolve, reject) {
        var momentStarting = new Date();
        var query = {
            aay: '16-17',
            // dora: encodeURIComponent(major),
            dora: major,
            oia: to,
            ay: '16-17',
            event: 19,
            ria: to,
            agreement: 'aa',
            sia: from,
            ia: from,
            dir: 1,
            sidebar: 'false',
            rinst: 'left',
            mver: 2,
            kind: 5,
            dt: 2
        };
        // const query = {
        //     // agreement: 'aa',
        //     reportPath: 'REPORT_2',
        //     reportScript: 'Rep2.pl',
        //     // event: 19,
        //     // dir: 1,
        //     // sia: from,
        //     // ria: to,
        //     // ia: from,
        //     // oia: to,
        //     // aay: '16-17',
        //     // ay: '16-17',
        //     dora: encodeURIComponent(major)
        // }
        var requestURI = 'http://web2.assist.org/cgi-bin/REPORT_2/Rep2.pl?' + _querystring2.default.stringify(query);
        // console.log(requestURI==='http://web2.assist.org/cgi-bin/REPORT_2/Rep2.pl?aay=16-17&dora=ANTHRO&oia=UCB&ay=16-17&event=19&ria=UCB&agreement=aa&sia=DIABLO&ia=DIABLO&dir=1&sidebar=false&rinst=left&mver=2&kind=5&dt=2')
        // console.log('requestURI: ', requestURI)
        // console.log('http://web2.assist.org/cgi-bin/REPORT_2/Rep2.pl?aay=16-17&dora=BUS%20ADM&oia=UCB&ay=16-17&event=19&ria=UCB&agreement=aa&sia=DIABLO&ia=DIABLO&dir=1&&sidebar=false&rinst=left&mver=2&kind=5&dt=2')
        // console.log(requestURI==='http://web2.assist.org/cgi-bin/REPORT_2/Rep2.pl?aay=16-17&dora=BUS%20ADM&oia=UCB&ay=16-17&event=19&ria=UCB&agreement=aa&sia=DIABLO&ia=DIABLO&dir=1&sidebar=false&rinst=left&mver=2&kind=5&dt=2')
        (0, _request2.default)(requestURI, function (err, res, html) {
            if (err || !html) {
                return reject();
            }
            var $ = _cheerio2.default.load(html);
            var agreementBody = '';
            if ($('pre')) {
                agreementBody = $('pre').html();
            }
            // let array1 = agreementBody.split('--------------------------------------------------------------------------------');

            var momentEnding = new Date();
            var period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period);
            return resolve({
                agreementBody: agreementBody,
                period: period
            });
        });
    });
};

exports.default = transferAgreement;