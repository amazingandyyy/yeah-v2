
function signUserIn({email, password}) {
    return function (dispatch) {
        // Submit email/password to server
        console.log(email, password)
        // axios
        //     .post(`/signin`, {email, password})
        //     .then(res => {
        //         dispatch({type: AUTH_USER})
        //         localStorage.setItem('token', res.data.token);
        //         browserHistory.push('/secret')
        //         axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         dispatch({type: AUTH_ERROR, payload: 'Bad Login Info'})
        //     });
    }
}

function signUserUp(userObj) {
    return function (dispatch) {
        // Submit email/password to server
        console.log('userObj: ', userObj)
        axios
            .post(`/signup`, userObj)
            .then(res => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('token', res.data.token);
                browserHistory.push('/secret')
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Failed to Sign up, please try again.'})
            });
    }
}

function signUserOut() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER})
        localStorage.removeItem('token');
    }
}

export { signUserIn, signUserUp, signUserOut };