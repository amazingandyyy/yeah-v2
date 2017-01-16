import axios from 'axios';
import {TRY_CONNECT, FETCH_HACKATHON} from './types';
const ROOT_URL = 'http://localhost:8000';

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export * from './auth';
export * from './profile';