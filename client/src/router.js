import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from './components/app';
import Home from './components/home';

import Auth from './components/auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'
import SetPassword from './components/auth/setPassword';
import ResetPassword from './components/auth/resetPassword';
import IForget from './components/auth/iForget';
import IForget2 from './components/auth/iForget2';

import Dashboard from './components/dashboard';
import Start from './components/dashboard/start';
import Setting from './components/dashboard/setting';
import Explore from './components/dashboard/explore';
import ExploreBrowser from './components/dashboard/explore/browser';

import Admin from './components/dashboard/admin';
import VolunteerAdmin from './components/dashboard/volunteerAdmin';
import VolunteerDetail from './components/volunteer/details';
import VolunteerDetailEdit from './components/volunteer/edit';

import CourseAdmin from './components/dashboard/courseAdmin';
import CourseDetail from './components/course/details';
import CourseDetailEdit from './components/course/edit';

import IntershipAdmin from './components/dashboard/intershipAdmin';
import IntershipDetail from './components/intership/details';
import IntershipDetailEdit from './components/intership/edit';

import RequireAuth from './components/auth/loginGuard';
import RequireAdmin from './components/auth/adminGuard';

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
                <Route path="/auth/signup/setpassword" component={SetPassword}/>
                <Route path="/auth/signout" component={Signout}/>
                <Route path="/auth/iforget" component={IForget}/>
                <Route path="/auth/iforget2" component={IForget2}/>
                <Route path="/auth/resetpassword/:token" component={ResetPassword}/>
            </Route>
            <Route path="/dashboard" component={RequireAuth(Dashboard)}>
                <IndexRoute component={Start}/>
                <Route path="/dashboard/start" component={Start}/>
                <Route path="/dashboard/setting" component={Setting}/>
                <Route path="/dashboard/explore" component={Explore}>
                    <IndexRoute component={ExploreBrowser} />
                    <Route path="/dashboard/explore/volunteer/:id" component={ VolunteerDetail } />
                    <Route path="/dashboard/explore/volunteer/:id/edit" component={ RequireAdmin(VolunteerDetailEdit) } />
                    <Route path="/dashboard/explore/intership/:id" component={ IntershipDetail } />
                    <Route path="/dashboard/explore/intership/:id/edit" component={ RequireAdmin(IntershipDetailEdit) } />
                    <Route path="/dashboard/explore/course/:id" component={ CourseDetail } />
                    <Route path="/dashboard/explore/course/:id/edit" component={ RequireAdmin(CourseDetailEdit) } />
                </Route>
                <Route path="/dashboard/admin" component={RequireAdmin(Admin)}>
                    <IndexRoute />
                    <Route path="/dashboard/admin/volunteer" component={VolunteerAdmin}/>
                    <Route path="/dashboard/admin/course" component={CourseAdmin}/>
                    <Route path="/dashboard/admin/intership" component={IntershipAdmin}/>
                </Route>
            </Route>
        </Router>
    )
}

export default RouterComponent;