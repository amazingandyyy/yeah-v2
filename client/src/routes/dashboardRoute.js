import React, {Component} from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Start from '../components/dashboard/start';
import Setting from '../components/dashboard/setting';

import ExploreCoursesCatalog from '../components/dashboard/courses/catalog';

import VolunteerAdmin from '../components/dashboard/admin/volunteerAdmin';
import VolunteerOneAdmin from '../components/dashboard/admin/volunteerOneAdmin';

import CourseAdmin from '../components/dashboard/admin/course/courseAdmin';
import CourseOneAdmin from '../components/dashboard/admin/courseOneAdmin';
import CourseAdminSuccess from '../components/dashboard/admin/course/courseAdminSuccess';

import InternshipAdmin from '../components/dashboard/admin/internshipAdmin';
import InternshipOneAdmin from '../components/dashboard/admin/internshipOneAdmin';

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
      path: '/dashboard/app',
      getComponent(location, cb) {
        System
          .import ('../components/dashboard/application')
          .then(module => {
            return loginGuard(module.default, cb);
          })
      },
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
        component: ExploreCoursesCatalog
      }
    }, {
      path: '/dashboard/volunteers',
      getComponent(location, cb) {
        System
          .import ('../components/dashboard/volunteers')
          .then(module => {
            return loginGuard(module.default, cb);
          })
      },
      indexRoute: {
        getComponent(location, cb) {
          System
            .import ('../components/dashboard/volunteers/catalog.js')
            .then(module => {
              return loginGuard(module.default, cb);
            })
        }
      },
      childRoutes: [
        {
          path: '/dashboard/volunteers/:id',
          getComponent(location, cb) {
          System
              .import ('../components/dashboard/volunteers/single.js')
              .then(module => {
                return loginGuard(module.default, cb);
              })
          }
        }
      ]
    }, {
      path: '/dashboard/admin',
      getComponent(location, cb) {
        System
          .import ('../components/dashboard/admin')
          .then(module => {
            return loginGuard(module.default, cb);
          })
      },
      // indexRoute: {
      //   component: VolunteerAdmin
      // },
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