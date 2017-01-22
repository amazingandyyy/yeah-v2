import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from './components/app';
import Home from './components/home';

import Auth from './components/auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'

import Dashboard from './components/dashboard';
import Start from './components/dashboard/start';
import Setting from './components/dashboard/setting';
import Explore from './components/dashboard/explore';
import ExploreBrowser from './components/dashboard/explore/browser';

import Admin from './components/dashboard/admin';
import VolunteerAdmin from './components/dashboard/volunteerAdmin';
import CourcesAdmin from './components/dashboard/courcesAdmin';
import VolunteerDetail from './components/volunteer/details';
import VolunteerDetailEdit from './components/volunteer/edit';
import RequireAuth from './components/auth/require_auth';
import RequireAdmin from './components/auth/admin_require';

const RouterComponent = () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
            </Route>
            <Route path="/auth" component={Auth}>
                <IndexRoute component={Signin}/>
                <Route path="/auth/signin" component={Signin} />
                <Route path="/auth/signup" component={Signup}/>
                <Route path="/auth/signout" component={Signout}/>
            </Route>
            <Route path="/dashboard" component={RequireAuth(Dashboard)}>
                <IndexRoute component={Start}/>
                <Route path="/dashboard/start" component={Start}/>
                <Route path="/dashboard/setting" component={Setting}/>
                <Route path="/dashboard/explore" component={Explore}>
                    <IndexRoute component={ExploreBrowser} />
                    <Route path="/dashboard/explore/volunteer/:id" component={ VolunteerDetail } />
                    <Route path="/dashboard/explore/volunteer/:id/edit" component={ RequireAdmin(VolunteerDetailEdit) } />
                </Route>
                <Route path="/dashboard/admin" component={RequireAdmin(Admin)}>
                    <IndexRoute component={VolunteerAdmin} />
                    <Route path="/dashboard/admin/volunteer" component={VolunteerAdmin}/>
                    <Route path="/dashboard/admin/cources" component={CourcesAdmin}/>
                </Route>
            </Route>
            <Route path="/volunteer/:id" component={ VolunteerDetail } />
        </Router>
    )
}

export default RouterComponent;