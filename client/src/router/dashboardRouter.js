import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Dashboard from '../components/dashboard';
import Start from '../components/dashboard/start';
import Setting from '../components/dashboard/setting';
import Explore from '../components/dashboard/explore';
import ExploreBrowser from '../components/dashboard/explore/browser';

import Admin from '../components/dashboard/admin';
import VolunteerAdmin from '../components/dashboard/admin/volunteerAdmin';
import VolunteerDetail from '../components/volunteer';
import VolunteerDetailEdit from '../components/volunteer/edit';

import CourseAdmin from '../components/dashboard/admin/courseAdmin';
import CourseDetail from '../components/course';
import CourseDetailEdit from '../components/course/edit';

import InternshipAdmin from '../components/dashboard/admin/internshipAdmin';
import InternshipDetail from '../components/internship';
import InternshipDetailEdit from '../components/internship/edit';
import Assist from '../components/dashboard/assist';
import UCInfomation from '../components/dashboard/ucinfo';

import RequireAuth from '../components/auth/loginGuard';
import RequireAdmin from '../components/auth/adminGuard';

const DashboardRouter = (
        <Route path="/dashboard" component={RequireAuth(Dashboard)}>
            <IndexRoute component={Start}/>
            <Route path="/dashboard/start" component={Start}/>
            <Route path="/dashboard/assist" component={Assist}/>
            <Route path="/dashboard/ucinfo" component={UCInfomation}/>
            <Route path="/dashboard/setting" component={Setting}/>
            <Route path="/dashboard/explore" component={Explore}>
                <IndexRoute component={ExploreBrowser} />
                <Route path="/dashboard/explore/volunteer/:id" component={ VolunteerDetail } />
                <Route path="/dashboard/explore/volunteer/:id/edit" component={ RequireAdmin(VolunteerDetailEdit) } />
                <Route path="/dashboard/explore/internship/:id" component={ InternshipDetail } />
                <Route path="/dashboard/explore/internship/:id/edit" component={ RequireAdmin(InternshipDetailEdit) } />
                <Route path="/dashboard/explore/course/:id" component={ CourseDetail } />
                <Route path="/dashboard/explore/course/:id/edit" component={ RequireAdmin(CourseDetailEdit) } />
            </Route>
            <Route path="/dashboard/admin" component={RequireAdmin(Admin)}>
                <IndexRoute />
                <Route path="/dashboard/admin/volunteer" component={VolunteerAdmin}/>
                <Route path="/dashboard/admin/course" component={CourseAdmin}/>
                <Route path="/dashboard/admin/internship" component={InternshipAdmin}/>
            </Route>
        </Route>
    )

export default DashboardRouter;