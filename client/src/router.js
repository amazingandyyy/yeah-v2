import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import Home from './components/home';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'

import RequireAuth from './components/auth/require_auth';

const RouterComponent = () => {
    return (
        <Router history={browserHistory}>
        <Route path="/" component= {App}>
            <IndexRoute component= {Home} />
            <Route path="/signin" component= {Signin} />
            <Route path="/signup" component= {Signup} />
            <Route path="/signout" component= {Signout} />
        </Route>
        </Router>
    )
}

export default RouterComponent;