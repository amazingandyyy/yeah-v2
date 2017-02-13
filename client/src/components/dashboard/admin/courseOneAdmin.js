import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
// import 'react-widgets/lib/scss/react-widgets.scss';
import '../../../styles/react-widget/scss/react-widgets.scss';
import Multiselect from 'react-widgets/lib/Multiselect';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { reduxForm, Field } from 'redux-form';
import GoogleMapSearch from '../../widgets/googleMapSearch';
import { Loader } from '../../widgets';
import { hashHistory } from 'react-router';


class CourseAdmin extends Component{
    componentWillMount(){
        const pathname = this.props.location.pathname;
        const Id = pathname.split('/').pop();
        if(Id){
            console.log("Id", Id);
            this.props.fetchOneCourseChance(Id);
        }
    }
    constructor(props){
        super(props)
        this.state = {
            tags: [ {id: 1, text: "Apples"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    }
    handleFormSubmit( data) {
        // Getting data object
    const oldLocation = this.props.details.location;
    const newLocation = data.location;
    if(oldLocation.label === newLocation) {
        // locations not changed, replase data.location with oldLocation
        delete data['location'];
    }
    
        this.props.updateOneCourse(this.props.details._id,data);
        //show the time
        // console.log('Specific Date: ', data.date.getMonth()+1,data.date.getDate(),data.date.getFullYear());
        // console.log('Specific Time:', data.time.getHours(), data.time.getMinutes());
        // this.props.createCourseResource(data);
    }

    renderMultiselect ({input, data}) {
        return (
            <span style={{width: '100%'}}>
                <Multiselect 
                    className="yeah-input"
                    {...input}
                    onBlur={()=> input.onBlur()}
                    value={input.value || []}
                    data={data}
                />
            </span>
        );
    }

    renderDatePicker({input, ...rest}){
        return(
            <span className="flex-item">
                <DateTimePicker time={false} {...rest} onChange={input.onChange} placeholder='Select Starting Date'/>
            </span>    
        );
    }

    renderTimePicker({input, ...rest}){
        return(
            <span className="flex-item">
                <DateTimePicker calendar={false} {...rest} onChange={input.onChange} placeholder='Select Starting Time'/>
            </span>    
        );
    }


    

    render(){
        // Localize the time
        const { details } = this.props;

        momentLocalizer(moment);

        const tagList =['Business','Computer Science','Enconomics','Chemistry','Physics','Phycology','English','Engineering', 'History','Music','Math'];
        const { handleSubmit, dirty, submitting, reset } = this.props;

        if(details)
            {
                momentLocalizer(moment);

                return (
                <form
                    onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
                >
                    <div className="form-title-bg">Update The Training Program</div>
                    <div className="form-wrapper">
                        <label>Title*</label>
                        <div className="form-group">
                            <Field 
                                type="type" 
                                name="title" 
                                component="input" 
                                className="yeah-input"
                                placeholder="Course title"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-wrapper">
                        <label>Instructor*</label>
                        <div className="form-group">
                            <Field 
                                type="type" 
                                name="instructor" 
                                component="input" 
                                className="yeah-input"
                                placeholder="Course instructor"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <label>Date*</label>
                        <div className="form-group">
                            <Field 
                                type="date" 
                                name="date" 
                                component="input" 
                                className="yeah-input"
                                placeholder="Course date"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <label>Location*</label>
                        <div className="form-group">
                            <Field 
                                type="type" 
                                name="location" 
                                component={GoogleMapSearch} 
                                placeholder="Course location"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <label>Tags*</label>
                        <div className="form-group">
                            <Field 
                                name="tags"
                                component={this.renderMultiselect.bind(this)}
                                data={tagList}
                            />
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <label>Description*</label>
                        <div className="form-group">
                            <Field 
                                type="text"
                                cols="40" 
                                rows="8"
                                name="description" 
                                component="textarea" 
                                className="yeah-input"
                                required
                                placeholder="Course Details and discription..."
                            />
                        </div>
                    </div>
                    <div className="flex-container btn-container">
                        <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                        <button type="submit" disabled={ !dirty } className="flex-item btn btn-primary">Update</button>
                    </div>
                </form>
                
            )}
            else{
                return <Loader />
            }
    }
}

function mapStateToProps({course}) {
    // if(course.details) {
    //     const { details } = course;
    //     console.log('details:',);
    //     return {
    //         initialValues: {
    //             // firstName: userData.name.first,
    //             // lastName: userData.name.last,
    //             // email: userData.email.data,
    //             // FBData: userData.facebook
    //         }
            
    //     }
    // }else{
    //     return {
    //        initialValues: {
    //             date: moment().add(1, 'day').format('YYYY-MM-DD')
    //         }
    //     }
    // }

    if (course.event){

    return {
            details: course.event,
            initialValues: {
                date: course.event.date,
                title: course.event.title,
                description: course.event.description,
                instructor: course.event.instructor,
                location:course.event.location.label,
                tags:course.event.tags

            }
    }
}   
else{
        return {
        //    initialValues: {
        //         date: moment().add(1, 'day').format('YYYY-MM-DD')
        //     }
        }
    }


}

CourseAdmin = reduxForm({
    form: 'updateCourseResource'
})(CourseAdmin);

export default connect(mapStateToProps, actions)(CourseAdmin);