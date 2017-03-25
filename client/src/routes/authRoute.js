import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Auth from '../components/auth';
import Signin from '../components/auth/signin';
import Signup from '../components/auth/signup';
import Signout from '../components/auth/signout'
import SetPassword from '../components/auth/setPassword';
import IForget from '../components/auth/iForget';
import IForget2 from '../components/auth/iForget2';

const AuthRoute = {
    path: '/auth',
    getComponent(location, cb) {
        System.import('../components/auth')
        .then(module => cb(null, module.default))
    },
    indexRoute: {
        component: Signin
    },
    childRoutes: [
        {
            path: '/auth/signin',
            component: Signin
        }, {
            path: '/auth/signup',
            component: Signup
        },{
            path: '/auth/signup/setpassword',
            component: SetPassword
        },{
            path: '/auth/signout',
            component: Signout
        },{
            path: '/auth/iforget',
            component: IForget
        },{
            path: '/auth/iforget2',
            component: IForget2
        },{
            path: '/auth/resetpassword/:token',
            getComponent(location, cb) {
                System.import ('../components/auth/resetPassword')
                .then(module => cb(null, module.default))
            }
        }
    ]
}

export default AuthRoute;