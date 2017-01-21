import axios from 'axios';
const token = localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export * from './auth';
export * from './profile';
export * from './admin';

// Fetch Resources
export * from './volunteer';