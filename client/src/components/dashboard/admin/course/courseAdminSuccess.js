import React, { Component } from 'react';
import '../../../../../src/styles/success.scss';
import { Link } from 'react-router';


class CourseAdminSuccess extends Component {
    render() {
        return (
            <div>
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmarkCircle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmarkCheck" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <div style={{textAlign: 'center'}}>
                <h3 style={{marginTop: '20px'}}>The course is successfully created!</h3>
                <Link to="/dashboard/admin/course">
                    <button type="button" className="flex-item btn btn-primary" style={{marginTop: '20px'}}>Create Another Course</button>                
                </Link>
                </div>
                
            </div>
        );
    }
}

export default CourseAdminSuccess;