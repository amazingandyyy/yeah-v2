import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
// import 'react-widgets/lib/scss/react-widgets.scss';

import CourseAdminFirstPage from './courseAdminFirstPage';
import CourseAdminSecondPage from './CourseAdminSecondPage';
import CourseAdminThirdPage from './courseAdminThirdPage';

class CourseAdmin extends Component{
    constructor(props){
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);

        this.state = {
            tags: [ {id: 1, text: "Apples"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"],
            page: 1
        }
    }

    nextPage(){
        this.setState({ page : this.state.page + 1});
    }
    
    previousPage(){
        this.setState({ page : this.state.page - 1});
    }

    handleFormSubmit(data) {
        // Getting data object
        console.log('data: ', data);
        //show the time
        // console.log('Specific Date: ', data.date.getMonth()+1,data.date.getDate(),data.date.getFullYear());
        // console.log('Specific Time:', data.time.getHours(), data.time.getMinutes());
        // this.props.createCourseResource(data);
    }
    

    render(){
        
        const { page } = this.state;
        return(        
            <div>
                {page ===1 && <CourseAdminFirstPage onSubmit={this.nextPage} />}   
                {page ===2 && <CourseAdminSecondPage previousPage={this.previousPage} onSubmit={this.nextPage} />}    
                {page ===3 && <CourseAdminThirdPage previousPage={this.previousPage} />}               
            </div>);

    }
}

CourseAdmin.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default connect(null, actions)(CourseAdmin);