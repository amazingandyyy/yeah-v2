import axios from 'axios';

if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export * from './auth';
export * from './profile';
export * from './admin';

// Fetch Resources
export * from './volunteer';