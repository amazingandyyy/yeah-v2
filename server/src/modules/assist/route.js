import express from 'express';
import controller from './controller';
import { loginRequired, checkAdmin } from '../../middleware';
const router = express.Router();
import cheerio from 'cheerio';
import request from 'request';
import qs from 'querystring';
import toSchoolMajorList from './api/toSchoolMajorList';
import fromSchoolList from './api/fromSchoolList';
import toSchoolList from './api/toSchoolList';
import transferAgreement from './api/transferAgreement';
// public request
router.get('/:schoolCode/majors', (req, res, next)=> {
    console.log('req.params.schoolCode: ',req.params.schoolCode)
    toSchoolMajorList(req.params.schoolCode).then((result)=>{
        res.send({numbers: result.data, list: result.data, period: result.period})
    }).catch(next)
});

router.get('/colleges', (req, res, next)=> {
    fromSchoolList().then((result)=>{
        res.send({numbers: result.data.length, list: result.data, period: result.period})
    }).catch(next)
});

router.get('/universities', (req, res, next)=> {
    toSchoolList().then((result)=>{
        res.send({numbers: result.data.length, list: result.data, period: result.period})
    }).catch(next)
});

router.get('/agreement/:from/:to/:major', (req, res, next)=> {
    const {from, to, major } = req.params;
    transferAgreement(from, to, major).then((result)=>{
        res.send({...result})
    }).catch(next)
});

// console.log('============================')
// console.log('============================')
// console.log('============================')
// console.log('============================')

export default router;
