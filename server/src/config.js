require('dotenv').config();

const config = {
    jwt_secret: process.env.JWT_SECRET || 'JWT_SECRETjwt_secretJWT_SECRET',
    mongo_uri: process.env.MONGODB_URI
}

export default config;