import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import CourseDetail from '../components/course';

const TreasureRouter = (
    <Route path="/course">
        <Route path="/course/:id" component={ CourseDetail } />
    </Route>
)

export default TreasureRouter;