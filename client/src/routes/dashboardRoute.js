import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

// import Dashboard from '../components/dashboard';
import Start from '../components/dashboard/start';
import Setting from '../components/dashboard/setting';
import Explore from '../components/dashboard/explore';
import ExploreBrowser from '../components/dashboard/explore/browser';

// import Admin from '../components/dashboard/admin';
import VolunteerAdmin from '../components/dashboard/admin/volunteerAdmin';
import VolunteerOneAdmin from '../components/dashboard/admin/volunteerOneAdmin';
import VolunteerDetail from '../components/volunteer';
import VolunteerDetailEdit from '../components/volunteer/edit';

import CourseAdmin from '../components/dashboard/admin/course/courseAdmin';
import CourseOneAdmin from '../components/dashboard/admin/courseOneAdmin';
import CourseDetail from '../components/course';
import CourseDetailEdit from '../components/course/edit';
import CourseAdminSuccess from '../components/dashboard/admin/course/courseAdminSuccess';

import InternshipAdmin from '../components/dashboard/admin/internshipAdmin';
import InternshipOneAdmin from '../components/dashboard/admin/internshipOneAdmin';
import InternshipDetail from '../components/internship';
import InternshipDetailEdit from '../components/internship/edit';
import Assist from '../components/dashboard/assist';
import UCInfomation from '../components/dashboard/ucinfo';

import loginGuard from '../components/auth/loginGuard';
import RequireAdmin from '../components/auth/adminGuard';

const DashboardRoute = {
  path: '/dashboard',
  getComponent(location, cb) {
    System
      .import ('../components/dashboard')
      .then(module => {
        return loginGuard(module.default, cb);
      })
  },
  indexRoute: {
    component: Start
  },
  childRoutes: [
    {
      path: '/dashboard/start',
      component: Start
    }, {
      path: '/dashboard/assist',
      component: Assist
    }, {
      path: '/dashboard/ucinfo',
      component: UCInfomation
    }, {
      path: '/dashboard/setting',
      component: Setting
    }, {
      path: '/dashboard/explore',
      component: Explore,
      indexRoute: {
        component: ExploreBrowser
      }
    }, {
      path: '/dashboard/admin',
      getComponent(location, cb) {
        System
          .import ('../components/dashboard/admin')
          .then(module => {
            return loginGuard(module.default, cb);
          })
      },
      indexRoute: {
        component: VolunteerAdmin
      },
      childRoutes: [
        {
          path: '/dashboard/admin/volunteer',
          component: VolunteerAdmin
        }, {
          path: '/dashboard/admin/volunteer/:id',
          component: VolunteerOneAdmin
        }, {
          path: '/dashboard/admin/course',
          component: CourseAdmin
        }, {
          path: '/dashboard/admin/course/:id',
          component: CourseOneAdmin
        }, {
          path: '/dashboard/admin/coursesuccess',
          component: CourseAdminSuccess
        },{
          path: '/dashboard/admin/internship',
          component: InternshipAdmin
        }, {
          path: '/dashboard/admin/internship/:id',
          component: InternshipOneAdmin
        }
      ]
    }
  ]
}

export default DashboardRoute;

// const DashboardRoute = (     <Route path="/dashboard"
// component={RequireAuth(Dashboard)}>         <IndexRoute component={Start}/>
//       <Route path="/dashboard/start" component={Start}/>         <Route
// path="/dashboard/assist" component={Assist}/>         <Route
// path="/dashboard/ucinfo" component={UCInfomation}/>         <Route
// path="/dashboard/setting" component={Setting}/>         <Route
// path="/dashboard/explore" component={Explore}>             <IndexRoute
// component={ExploreBrowser} />             <Route
// path="/dashboard/explore/volunteer/:id" component={ VolunteerDetail } />
//        <Route path="/dashboard/explore/internship/:id" component={
// InternshipDetail } />             <Route path="/dashboard/explore/course/:id"
// component={ CourseDetail } />         </Route>         <Route
// path="/dashboard/admin" component={RequireAdmin(Admin)}>
// <IndexRoute />             <Route path="/dashboard/admin/volunteer"
// component={VolunteerAdmin}/>             <Route
// path="/dashboard/admin/course" component={CourseAdmin}/>             <Route
// path="/dashboard/admin/course/:id" component={CourseOneAdmin}/>
// <Route path="/dashboard/admin/internship" component={InternshipAdmin}/>
//   </Route>     </Route> )