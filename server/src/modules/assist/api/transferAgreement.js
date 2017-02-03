import cheerio from 'cheerio';
import request from 'request';
import qs from 'querystring';

const transferAgreement = (from, to, major) => {
    return new Promise((resolve, reject) => {
        const momentStarting = new Date()
        const query = {
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
            dt:2,
        }
        const requestURI = `http://web2.assist.org/cgi-bin/REPORT_2/Rep2.pl?${qs.stringify(query)}`;
        request(requestURI, (err, res, html) => {
            if(err|| !res || !html){ reject() }
            let $ = cheerio.load(html);
            let agreementBody = '';
            if($('pre')){
                agreementBody = $('pre').html()
            }
            const momentEnding = new Date()
            const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period)
            return resolve({
                agreementBody,
                period
            });
        })
    })
}

export default transferAgreement;