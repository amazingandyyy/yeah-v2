import cheerio from 'cheerio';
import request from 'request';
import qs from 'querystring';

const majorRequirementList = (schoolCode) => {
    return new Promise((resolve, rej) => {
        const momentStarting = new Date()
        request(`http://web2.assist.org/web-assist/articulationAgreement.do?inst1=none&inst2=none&ia=CRAFTON&ay=16-17&oia=${schoolCode}&dir=1`, (err, res, html) => {
            let $ = cheerio.load(html);
            let majorRequirementList = [];
            let majorRequirementOneData;
            let index;
            const majorRequirementData = $('form[name="major"]>select[name="dora"]').find('option');
            for (index in majorRequirementData) {
                if (Number(index) > 4) {
                    majorRequirementOneData = {
                        name: majorRequirementData[index].children[0].data
                    }
                    majorRequirementList.push(majorRequirementOneData);
                }
            }
            console.log('majorRequirementList: ', majorRequirementList.length);
            const momentEnding = new Date()
            const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            console.log('period: ', period)
            return resolve({data: majorRequirementList, period});
        })
    })
}

export default majorRequirementList;