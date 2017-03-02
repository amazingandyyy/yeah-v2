import axios from 'axios';
const token = localStorage.getItem('yeah_token');
import config from '../config';

let request = axios.create({
  baseURL: config.base_url || 'http://localhost:8000',
  "Access-Control-Allow-Origin": "*"
});

if (token) {
    request.defaults.headers.common['Authorization'] = token;
}
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default request;