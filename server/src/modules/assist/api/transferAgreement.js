import cheerio from 'cheerio';
import request from 'request';
import qs from 'querystring';

const transferAgreement = (from, to, major) => {
    return new Promise((resolve, rej) => {
        const momentStarting = new Date()
        const query = {
            aay: '16-17',
            dora: encodeURIComponent(major),
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
        const requestURI = `http://web2.assist.org/cgi-bin/REPORT_2/Rep2.pl?${qs.stringify(query)}`
        // console.log(requestURI==='http://web2.assist.org/cgi-bin/REPORT_2/Rep2.pl?aay=16-17&dora=ANTHRO&oia=UCB&ay=16-17&event=19&ria=UCB&agreement=aa&sia=DIABLO&ia=DIABLO&dir=1&sidebar=false&rinst=left&mver=2&kind=5&dt=2')
        request(requestURI, (err, res, html) => {
            let $ = cheerio.load(html);
            let agreementBody = '';
            if($('pre')){
                agreementBody = $('pre').html()
            }
            // let array1 = agreementBody.split('--------------------------------------------------------------------------------');

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