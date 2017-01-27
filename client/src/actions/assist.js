import axios from 'axios';
import { ASSIST_GET_COLLEGES } from './types';
import superagent from 'superagent';

const getCollegesList = () => {
    return function (dispatch) {
        axios
            .get(`/api/assist/colleges`)
            .then(res => {
                // console.log('colleges: ', res.data.list)
                dispatch({type: ASSIST_GET_COLLEGES, payload: res.data.list})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export {
    getCollegesList
}
