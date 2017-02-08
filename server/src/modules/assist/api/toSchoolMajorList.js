import cheerio from 'cheerio';
import request from 'request';
import qs from 'querystring';

const toSchoolMajorList = (schoolCode) => {
    return new Promise((resolve, reject) => {
        const momentStarting = new Date()
        request(`http://web2.assist.org/web-assist/articulationAgreement.do?inst1=none&inst2=none&ia=CRAFTON&ay=16-17&oia=${schoolCode}&dir=1`, (err, res, html) => {
            if(err|| !res || !html){ reject() }
            let $ = cheerio.load(html);
            let toSchoolMajorList = [];
            let toSchoolMajorOneData;
            let index;
            const toSchoolMajorData = $('form[name="major"]>select[name="dora"]').find('option');
            for (index in toSchoolMajorData) {
                if (Number(index) > 4) {
                    toSchoolMajorOneData = {
                        name: toSchoolMajorData[index].children[0].data.replace(/\s\s+/g, ''),
                        code: toSchoolMajorData[index].attribs.value
                    }
                    toSchoolMajorList.push(toSchoolMajorOneData);
                }
            }
            console.log('toSchoolMajorList: ', toSchoolMajorList.length);
            const momentEnding = new Date()
            const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period)
            return resolve({data: toSchoolMajorList, period});
        })
    })
}

export default toSchoolMajorList;