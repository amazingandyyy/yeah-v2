import cheerio from 'cheerio';
import request from 'request';
import qs from 'querystring';

const toSchoolList = () => {
    return new Promise((resolve, rej) => {
        const momentStarting = new Date()
        request('http://web2.assist.org/web-assist/articulationAgreement.do?inst1=none&inst2=none&ia=CRAFTON&ay=16-17&oia=UCB&dir=1',
        (err, res, html) => {
            let $ = cheerio.load(html);
            let toSchoolList = [];
            let toSchoolOneData;
            let index;
            const toSchoolData = $('select[name="oia"]').find('option');
            for (let index in toSchoolData) {
                if (Number(index)) {
                    let toSchoolOneData = {
                        name: toSchoolData[index]
                            .children[0]
                            .data
                            .split('\n')[3].replace(/\s\s+/g, ''),
                        code: qs
                            .parse(toSchoolData[index].attribs.value)
                            .oia
                    }
                    toSchoolList.push(toSchoolOneData)
                }
            }
            console.log('toSchoolList: ', toSchoolList.length);
            const momentEnding = new Date()
            const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period)
            return resolve({data: toSchoolList, period});
        })
    })
}

export default toSchoolList;