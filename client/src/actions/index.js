import axios from 'axios';
import {TRY_CONNECT, FETCH_HACKATHON} from './types';

if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export * from './auth';
export * from './profile';