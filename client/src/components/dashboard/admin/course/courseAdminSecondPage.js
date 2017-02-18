import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
// import 'react-widgets/lib/scss/react-widgets.scss';
import '../../../../styles/react-widget/scss/react-widgets.scss';
import Multiselect from 'react-widgets/lib/Multiselect';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';
import { reduxForm, Field } from 'redux-form';
import GoogleMapSearch from '../../../widgets/googleMapSearch';


class CourseAdminSecondPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            tags: [ {id: 1, text: "Apples"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    } 

    handleFormSubmit(data) {
        // Getting data object
        console.log('data: ', data);
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

    renderWeekList({ input, data, ...rest }){
        let hourList = _.map(data, 'hour');
        return (
            <span style={{width: '100%'}}>
                <DropdownList
                    placeholder="Select A Number"
                    className="yeah-input"
                    data={hourList}
                    textField='hour'
                    {...input}
                />
            </span>
        );
    }

    renderSelectList({ input, data, ...rest }){
        let optionList = _.map(data, 'option');
        return (
            <span style={{width: '100%'}}>
                <DropdownList
                    placeholder="Options"
                    className="yeah-input"
                    data={optionList}
                    textField='option'
                    {...input}
                />
            </span>
        );
    }

    render(){
        // Localize the time
        momentLocalizer(moment);

        const tagList =['Business','Computer Science','Enconomics','Chemistry','Physics','Phycology','English','Engineering', 'History','Music','Math'];
        const hourList = [ {hour:'1'}, {hour:'2'}, {hour:'3'}, {hour:'4'}, {hour:'5'}, {hour:'6'} ]
        const { handleSubmit, dirty, submitting, reset } = this.props;
        return (

            <form onSubmit = {this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-title-bg">Create A Training Program</div>
                <br />
                <div className="form-subtitle-bg">About The Course</div>
                
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
                    <label>Brief Overview of the Course(For marketing purpose)*</label>
                    <h6><em>At least six sentences ;  about 100- 200 words required.</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="overview" 
                            component="textarea" 
                            cols="40" 
                            rows="6"
                            className="yeah-input"
                            placeholder="Brief Overview"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>How many hours per week*</label>
                    <div className="form-group">
                        <Field 
                            name="hoursPerWeek" 
                            component={this.renderWeekList}
                            data={hourList}
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>For How many weeks(How many courses)*</label>
                    <div className="form-group">
                        <Field 
                            name="weeks" 
                            component={this.renderWeekList}
                            data={hourList}
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Required Textbooks or Readers*</label>
                    <h6><em>Each class should have required readings. Each week, instructor should at least 5 hours of reading before the class meeting. Please provide a link to the pdf version of textbook or ways to obtain the textbook, if applicable.</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="textbook" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Brief Overview"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Academic Schedule(Syllabus)*</label>
                    <h6>Please bring together a detail>demic schedule that covers each and every week of the class meetings. Please refer to any college syllabus for the format. (One example could be found in the following link. <a href="http://www.haas.berkeley.edu/Undergrad/courses/Syllabi/UGBA103_BA130/2014-fall-103-livdan.pdf">http://www.haas.berkeley.edu/Undergrad/courses/Syllabi/UGBA103_BA130/2014-fall-103-livdan.pdf</a>) Note：Each class meeting should have AT LEAST 5 hours of pre-class readings; Pre-class quiz (to check if students accomplish readings); Class Content (ppt/ note); Post-class quiz (to check how much students understand from the lecture); homework (5 hours of workload minimum); Each class should also have a final exam on the last day of instruction. (Please seperate topic, readings due before the class, homework assigned on the day of lecture, case, quiz and exam.) Please send an EDITABLE copy (word or google doc format) to yeaheducation@gmail.com</h6>                    
                    <div className="form-group">
                        <Field 
                            name="syllabus" 
                            component={this.renderSelectList}
                            data={[ {option: 'Yes, I already sent it.'}, {option: 'Not yet, but I will send it soon.'}]}
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>
                
                <br />
                <div className="form-subtitle-bg">Weekly Highlight</div>
                <p>Explanation/Details;  Example: This lecture shall focus on DCF modeling and its application. Students will be exposed to 4 different techniques in solving related problems. Four Harvard Cases, including X, Y, Z will be discussed during class lecture. </p>
                <br />

                <h5>We will build this kind of graph on the website</h5>
                <img src={require('../../../../styles/img/weeklyHighlight.png')} alt="" style={{width: '100%', margin: '20px 0'}}/>

                
                <div className="form-wrapper">
                    <label>1st Week Highlights (Focus on Class Content)*</label>
                    <h6><em>1 Title + 50 words</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlight1" 
                            component="textarea" 
                            cols="40" 
                            rows="5"
                            className="yeah-input"
                            placeholder="1st Week Highlights"
                            required
                        />
                    </div>
                </div>                

                <div className="form-wrapper">
                    <label>2nd Week Highlights*</label>
                    <h6><em>1 Title + 50 words Explanation/Details</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlight2" 
                            component="textarea" 
                            cols="40" 
                            rows="5"
                            className="yeah-input"
                            placeholder="2nd Week Highlights"
                            required
                        />
                    </div>
                </div>     

                <div className="form-wrapper">
                    <label>3rd Week Highlights*</label>
                    <h6><em>1 Title + 50 words Explanation/Details</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlight3" 
                            component="textarea" 
                            cols="40" 
                            rows="5"
                            className="yeah-input"
                            placeholder="3rd Week Highlights"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>4th Week Highlights*</label>
                    <h6><em>1 Title + 50 words Explanation/Details</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlight4" 
                            component="textarea" 
                            cols="40" 
                            rows="5"
                            className="yeah-input"
                            placeholder="4th Week Highlights"
                            required
                        />
                    </div>
                </div> 

                <div className="form-wrapper">
                    <label>5th Week Highlights*</label>
                    <h6><em>1 Title + 50 words Explanation/Details</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlight5" 
                            component="textarea" 
                            cols="40" 
                            rows="5"
                            className="yeah-input"
                            placeholder="5th Week Highlights"
                            required
                        />
                    </div>
                </div>   

                <div className="form-wrapper">
                    <label>6th Week Highlights*</label>
                    <h6><em>1 Title + 50 words Explanation/Details</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlight6" 
                            component="textarea" 
                            cols="40" 
                            rows="5"
                            className="yeah-input"
                            placeholder="6th Week Highlights"
                            required
                        />
                    </div>
                </div>  

                <div className="flex-container btn-container">
                    <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                    <button type="submit" disabled={ !dirty } className="flex-item btn btn-primary">Next</button>
                </div>                
            </form>

        );
    }
}


CourseAdminSecondPage = reduxForm({
    form: 'createCourseResource',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(CourseAdminSecondPage);

export default connect(null, actions)(CourseAdminSecondPage);

// <div className="form-wrapper">
//                     <label>Date*</label>
//                     <div className="form-group">
//                         <Field 
//                             type="date" 
//                             name="date" 
//                             component="input" 
//                             className="yeah-input"
//                             placeholder="Course date"
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="form-wrapper">
//                     <label>Location*</label>
//                     <div className="form-group">
//                         <Field 
//                             type="type" 
//                             name="location" 
//                             component={GoogleMapSearch} 
//                             placeholder="Course location"
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="form-wrapper">
//                     <label>Tags*</label>
//                     <div className="form-group">
//                         <Field 
//                             name="tags"
//                             component={this.renderMultiselect.bind(this)}
//                             data={tagList}
//                         />
//                     </div>
//                 </div>

//                 <div className="form-wrapper">
//                     <label>Description*</label>
//                     <div className="form-group">
//                         <Field 
//                             type="text"
//                             cols="40" 
//                             rows="8"
//                             name="description" 
//                             component="textarea" 
//                             className="yeah-input"
//                             required
//                             placeholder="Course Details and discription..."
//                         />
//                     </div>
//                 </div>