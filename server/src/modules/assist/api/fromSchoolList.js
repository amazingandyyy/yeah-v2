import cheerio from 'cheerio';
import request from 'request';
import qs from 'querystring';

const fromSchoolList = () => {
    return new Promise((resolve, rej) => {
        const momentStarting = new Date()
        request('http://web2.assist.org/web-assist/articulationAgreement.do?inst1=none&inst2=none&ia=CRAFTON&ay=16-17&oia=UCB&dir=1',
        (err, res, html) => {
            let $ = cheerio.load(html);
            let fromSchoolList = [];
            let fromSchoolOneData;
            let index;
            const fromSchoolData = $('select[name="ia"]').find('option');
            for (index in fromSchoolData) {
                if (Number(index)) {
                    let fromSchoolOneData = {
                        name: fromSchoolData[index].children[0].data.replace('\n', '').replace(/\s\s+/g, ''),
                        code: qs.parse(fromSchoolData[index].attribs.value).ia
                    }
                    fromSchoolList.push(fromSchoolOneData)
                }
            }
            console.log('fromSchoolList: ', fromSchoolList.length);
            const momentEnding = new Date()
            const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period)
            return resolve({data: fromSchoolList, period});
        })
    })
}
export default fromSchoolList;