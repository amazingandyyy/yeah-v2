import request from './request';
import { ASSIST_GET_COLLEGES,
         ASSIST_GET_UNIVERSITIES,
         ASSIST_GET_MAJORS,
         ASSIST_RESET_MAJORS,
         ASSIST_GET_AGREEMENT,
         ASSIST_RESET_AGREEMENT
} from './types';

const getCollegesList = () => {
    return function (dispatch) {
        request
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

const getUniversityList = () => {
    return function (dispatch) {
        request
            .get(`/api/assist/universities`)
            .then(res => {
                // console.log('colleges: ', res.data.list)
                dispatch({type: ASSIST_GET_UNIVERSITIES, payload: res.data.list})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

const getMajorList = (from, to) => {
    return function (dispatch) {
        dispatch({type: ASSIST_RESET_MAJORS})
            request
                .get(`/api/assist/${to}/majors`)
                .then(res => {
                    console.log(res.data.list);
                    dispatch({type: ASSIST_GET_MAJORS, payload: res.data.list})
                })
                .catch(error => {
                    console.log(error);
                });
    }
}

const getTransferRequirement = (from, to, major) => {
    return function (dispatch) {
        dispatch({type: ASSIST_RESET_AGREEMENT})
            request
                .get(`/api/assist/agreement/${from}/${to}/${major}`)
                .then(res => {
                    dispatch({type: ASSIST_GET_AGREEMENT, payload: res.data.agreementBody})
                })
                .catch(error => {
                    console.log(error);
                });
    }
}

const resetAssist = () => {
    return function (dispatch) {
        dispatch({type: ASSIST_RESET_AGREEMENT})
    }
}

export {
    getCollegesList,
    getUniversityList,
    getMajorList,
    getTransferRequirement,
    resetAssist
}
