require('dotenv').config();
import google_config from './googleOAuth';
let settingIsGood = true;
if(!process.env.JWT_SECRET){settingIsGood = false; console.log('no process.env.JWT_SECRET')}
if(!process.env.MONGODB_URI){settingIsGood = false; console.log('no process.env.MONGODB_URI')}
if(!process.env.AWS_ACCESS_KEY_ID){settingIsGood = false; console.log('no process.env.AWS_ACCESS_KEY_ID')}
if(!process.env.AWS_SECRET_ACCESS_KEY){settingIsGood = false; console.log('no process.env.AWS_SECRET_ACCESS_KEY')}
if(!process.env.UNIQUE_SALT){settingIsGood = false; console.log('no process.env.UNIQUE_SALT')}

let config;
if (process.env.NODE_ENV == 'production') {
    // production
    config = {
        jwt_secret: process.env.JWT_SECRET,
        mongo_uri: process.env.MONGODB_URI,
        aws_id: process.env.AWS_ACCESS_KEY_ID,
        aws_secret: process.env.AWS_SECRET_ACCESS_KEY,
        mongo_log: 'Real one',
        aws_s3_bucket: 'yeah-assets',
        aws_s3_url_base: 'https://s3-us-west-1.amazonaws.com',
        aws_ses_sender: 'yeaheducation@gmail.com',
        redirect_url_base: 'https://yeah-v2-server.herokuapp.com',
        unique_salt: process.env.UNIQUE_SALT,
        PORT: process.env.PORT,
        g: google_config,
    }
} else {
    // development configuration
    config = {
        jwt_secret: 'secret',
        mongo_uri: 'mongodb://localhost/yeah-v2-sandbox',
        aws_id: process.env.AWS_ACCESS_KEY_ID,
        aws_secret: process.env.AWS_SECRET_ACCESS_KEY,
        mongo_log: 'mongodb://localhost/yeah-v2-sandbox',
        aws_s3_bucket: 'yeah-assets-dev',
        aws_s3_url_base: 'https://s3-us-west-2.amazonaws.com',
        aws_ses_sender: 'yeaheducation@gmail.com',
        redirect_url_base: 'http://localhost:8000',
        unique_salt: 'process.env.UNIQUE_SALT',
        PORT: process.env.PORT || 8000,
        g: google_config,
    }
}

export default config;
export { settingIsGood };

// add user to be admin
import adminController from '../modules/admin/controller';
adminController.removeAdmin();
adminController.addAdminByEmail('amazingandyyy@gmail.com');
adminController.addAdminByEmail('kevintian.us@gmail.com');
adminController.addAdminByEmail('imdavidf@gmail.com');
// adminController.removeAdminByEmail('amazingandyyy2@gmail.com');

import volunteerController from '../modules/volunteer/controller';
// volunteerController.deleteAll();

// import courseModel from '../modules/course/model';
// import {bankingCourse} from './data';

// Course.create(bankingCourse).then((savedData) => {
//     console.log('Add Banking course', savedData);
// })