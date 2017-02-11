import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import CourseDetail from '../components/course/detail';
import VolunteerDetail from '../components/volunteer/detail';
import InternshipDetail from '../components/internship/detail';

const TreasureRouter = (
   <span>
    <Route path="/course">
        <Route path="/course/:id" component={ CourseDetail } />
    </Route>
    <Route path="/volunteer">
        <Route path="/volunteer/:id" component={ VolunteerDetail } />
    </Route>
    <Route path="/internship">
        <Route path="/internship/:id" component={ InternshipDetail } />
    </Route>
   </span>
)

export default TreasureRouter;