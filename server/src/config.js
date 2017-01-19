require('dotenv').config();

const enviroment = process.env.NODE_ENV;
let config;
const shareConfig = {
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_s3_bucket: 'yeah-assets',
    aws_s3_url_base: 'https://s3-us-west-1.amazonaws.com'
}

if(enviroment == 'production'){
    config = {
        ...shareConfig,
        enviroment,
        jwt_secret: process.env.JWT_SECRET,
        mongo_uri: process.env.MONGODB_URI,
        mongo_log: 'real mongoDB',
        domain_uri: 'http://yeah-beta.us-west-1.elasticbeanstalk.com'
    }
}else{
    config = {
        ...shareConfig,
        enviroment,
        jwt_secret: process.env.JWT_SECRET || 'local jwt secret',
        mongo_uri: 'mongodb://localhost/yeah-v2-sandbox',
        mongo_log: 'mongodb://localhost/yeah-v2-sandbox',
        domain_uri: 'http://localhost:8000'
    }
}

export default config;