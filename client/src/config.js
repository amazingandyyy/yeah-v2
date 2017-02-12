// const NODE_ENV = 'production';
const NODE_ENV = 'devlopment';
let config;
if(NODE_ENV === 'production'){
    config = {
        base_url: 'http://104.131.39.34:8000'
    }
}else{
    config = {
        base_url: 'http://localhost:8000'
    }
}

export default config;