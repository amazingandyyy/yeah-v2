<<<<<<< HEAD
import production_config from './config/production/config';
=======
import production_config from '../production/config';
>>>>>>> refs/remotes/origin/master

// const NODE_ENV = 'production';
const NODE_ENV = 'devlopment';
let config;
if(NODE_ENV === 'production'){
    config = {
        base_url: production_config.base_url
    }
}else{
    config = {
        base_url: 'http://localhost:8000'
    }
}

export default config;