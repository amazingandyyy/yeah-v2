import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from './components/app';
import Home from './components/home';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'

import Dashboard from './components/dashboard';
import Start from './components/dashboard/start';
import Setting from './components/dashboard/setting';
import Explore from './components/dashboard/explore';

import Admin from './components/dashboard/admin';
import VolunteerAdmin from './components/dashboard/volunteerAdmin';
import CourcesAdmin from './components/dashboard/courcesAdmin';

import RequireAuth from './components/auth/require_auth';

const RouterComponent = () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component= {App}>
                <IndexRoute component= {Home} />
                <Route path="/signin" component= {Signin} />
                <Route path="/signup" component= {Signup} />
                <Route path="/signout" component= {Signout} />
            </Route>
            <Route path="/dashboard" component= {RequireAuth(Dashboard)}>
                <IndexRoute component= {Start} />
                <Route path="/dashboard/start" component= {Start} />
                <Route path="/dashboard/setting" component= {Setting} />
                <Route path="/dashboard/explore" component= {Explore} />
                <Route path="/dashboard/admin" component= {Admin}>
                    <Route path="/dashboard/admin/volunteer" component= {VolunteerAdmin} />
                    <Route path="/dashboard/admin/cources" component= {CourcesAdmin} />
                </Route>
            </Route>
        </Router>
    )
}

export default RouterComponent;