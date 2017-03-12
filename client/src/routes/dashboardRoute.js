import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import Start from '../components/dashboard/start';
import Setting from '../components/dashboard/setting';
import Courses from '../components/dashboard/courses';
import ExploreCatalog from '../components/dashboard/courses/catalog';

import VolunteerAdmin from '../components/dashboard/admin/volunteerAdmin';
import VolunteerOneAdmin from '../components/dashboard/admin/volunteerOneAdmin';
import VolunteerDetail from '../components/volunteer';

import CourseAdmin from '../components/dashboard/admin/course/courseAdmin';
import CourseOneAdmin from '../components/dashboard/admin/courseOneAdmin';
import CourseDetail from '../components/course';
import CourseAdminSuccess from '../components/dashboard/admin/course/courseAdminSuccess';

import InternshipAdmin from '../components/dashboard/admin/internshipAdmin';
import InternshipOneAdmin from '../components/dashboard/admin/internshipOneAdmin';
import InternshipDetail from '../components/internship';
import Assist from '../components/dashboard/assist';
import UCInfomation from '../components/dashboard/ucinfo';

import {loginGuard} from './wrappers';

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
      path: '/dashboard/courses',
      getComponent(location, cb) {
        System
          .import ('../components/dashboard/courses')
          .then(module => {
            return loginGuard(module.default, cb);
          })
      },
      indexRoute: {
        component: ExploreCatalog
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