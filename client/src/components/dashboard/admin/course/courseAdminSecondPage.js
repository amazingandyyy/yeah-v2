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

const syllabusStatusTrue = 'Yes, I already sent to yeaheducation@gmail.com';

class CourseAdminSecondPage extends Component{
    constructor(props){
        super(props);

        this.state = { }
    } 

    componentWillMount(){
        window.scrollTo(0,0);
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

    renderNumList({ input, data, placeholder, unitMeta, ...rest, }){
        let hourListArray = _.map(data, 'hour');
        let hourList = hourListArray.map(d=>d+' '+unitMeta)
        return (
            <span style={{width: '100%'}}>
                <DropdownList
                    placeholder={placeholder}
                    className="yeah-input"
                    data={hourList}
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

        const tagList =['Business','Computer Science','Enconomics','Chemistry','Physics','Phycology','English','Engineering', 'History','Music','Math', 'Art', 'Biology'];
        const hourList = [ {hour:'3'}, {hour:'4'}, {hour:'5'} ];
        const weekList = [ {hour:'2'}, {hour:'3'}, {hour:'4'}, {hour:'5'}, {hour:'6'} ];
        
        const { handleSubmit, dirty, submitting, reset } = this.props;
        return (

            <form onSubmit = {this.props.handleSubmit}>
                <div className="form-subtitle-bg">About The Course</div>
                <div className="form-wrapper">
                    <label>Course Title*</label>
                    <div className="form-group">
                        <Field 
                            type="type"
                            name="title" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Full Course Title"
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
                            required
                        />
                    </div>
                </div>                
                <div className="form-wrapper">
                    <label>Brief Overview of the Course(For marketing purpose, 200 words)*</label>
                    <h6><em>At least six sentences ;  about 150-300 words .</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="overview" 
                            component="textarea" 
                            cols="40" 
                            rows="6"
                            className="yeah-input"
                            placeholder="Brief Overview (150~300 words)"
                            maxLength="500" minLength="150"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Starting Date*</label>
                    <div className="form-group">
                        <Field 
                            type="date" 
                            name="startingDate" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Course date"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Course Structure*</label>
                    <div className="form-group">
                        <Field 
                            name="hoursPerWeek" 
                            component={this.renderNumList}
                            placeholder='How many hours per class?'
                            unitMeta='hrs per class'
                            data={hourList}
                            className="yeah-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Field 
                            name="totalWeeks" 
                            component={this.renderNumList}
                            placeholder='How many classes totally?'
                            unitMeta='classes'
                            data={weekList}
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>
                <hr />
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
                    <label>Location Notes</label>
                    <div className="form-group">
                        <Field 
                            type="type"
                            name="locationNotes" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="Exp. Classroom 320, go through the red door on the left side"
                            maxLength="200"
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Required Textbooks or Readers or Equipment*</label>
                    <h6><em>Each class should have readings. Each week, instructor should at least 5 hours of reading before the class meeting. Please provide a link to the pdf version of textbook or ways to obtain the textbook, if applicable.</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type"
                            name="textbook" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="Brief Description and where to get the textbook"
                            maxLength="500" minLength="10"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Academic Schedule(Syllabus)*</label>
                    <ul>
                        <li>Please bring together a detail>demic schedule that covers each and every week of the class meetings.</li> 
                        <li>Please refer to <a href="http://www.haas.berkeley.edu/Undergrad/courses/Syllabi/UGBA103_BA130/2014-fall-103-livdan.pdf" style={{color:'#5BD5F7'}}>Sample Syllabus</a> for the format.</li>  
                        <li>
                            <span>
                                Note：Each class meeting should have AT LEAST 5 hours of pre-class readings; Pre-class quiz (to check if students accomplish readings); Class Content (ppt/ note); Post-class exam (to check how much students understand from the lecture); homework (5 hours of workload minimum); Each class should also have a final exam on the last day of instruction. (Please seperate topic, readings due before the class, homework assigned on the day of lecture, case, quiz and exam.) 
                            </span>
                        </li>
                        <li>Please send an EDITABLE copy (word or google doc format) to  <a href="mailto:yeaheducation@gmail.com" style={{color:'#5BD5F7'}}>yeaheducation@gmail.com</a></li>
                    </ul>                    
                    <div className="form-group">
                        <Field 
                            name="syllabusStatus" 
                            component={this.renderSelectList}
                            data={[ {option: syllabusStatusTrue}, {option: 'Not yet, I will send to yeaheducation@gmail.com soon'}]}
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>
                <div className="form-subtitle-bg">
                    <hr />
                    Weekly Highlight
                </div>
                <p>Explanation/Details;  Example: This lecture shall focus on DCF modeling and its application. Students will be exposed to 4 different techniques in solving related problems. Four Harvard Cases, including X, Y, Z will be discussed during class lecture. </p>
                <br />

                <h5>We will build this kind of graph on the website</h5>
                <img src={require('../../../../styles/img/weeklyHighlight.png')} alt="" style={{width: '100%', margin: '20px 0'}}/>

                
                <div className="form-wrapper">
                    <label>1st Week Highlights (Focus on Class Content)*</label>
                    <h6><em>Title</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightTitle1" 
                            component="input"
                            className="yeah-input"
                            placeholder="1st Week Highlights"
                            required
                        />
                    </div>
                    <h6><em>Description (About 50 words)*</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightDescription1" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="1st Week Highlights"
                            maxLength="500" minLength="150"
                            required
                        />
                    </div>
                </div>                

                <div className="form-wrapper">
                    <label>2nd Week Highlights (Focus on Class Content)*</label>
                    <h6><em>Title</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightTitle2" 
                            component="input"
                            className="yeah-input"
                            placeholder="2nd Week Highlights"
                            required
                        />
                    </div>
                    <h6><em>Description (About 50 words)*</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightDescription2" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="2nd Week Highlights"
                            maxLength="500" minLength="150"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>3rd Week Highlights (Focus on Class Content)*</label>
                    <h6><em>Title</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightTitle3" 
                            component="input"
                            className="yeah-input"
                            placeholder="3rd Week Highlights"
                            required
                        />
                    </div>
                    <h6><em>Description (About 50 words)*</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightDescription3" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="3rd Week Highlights"
                            maxLength="500" minLength="150"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>4th Week Highlights (Focus on Class Content)</label>
                    <h6><em>Title</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightTitle4" 
                            component="input"
                            className="yeah-input"
                            placeholder="4th Week Highlights"
                        />
                    </div>
                    <h6><em>Description (About 50 words)</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightDescription4" 
                            component="textarea"
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="4th Week Highlights"
                            maxLength="500" minLength="150"
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>5th Week Highlights (Focus on Class Content)</label>
                    <h6><em>Title</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightTitle5" 
                            component="input"
                            className="yeah-input"
                            placeholder="5th Week Highlights"
                        />
                    </div>
                    <h6><em>Description (About 50 words)</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightDescription5" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="5th Week Highlights"
                            maxLength="500" minLength="150"
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>6th Week Highlights (Focus on Class Content)</label>
                    <h6><em>Title</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightTitle6" 
                            component="input"
                            className="yeah-input"
                            placeholder="6th Week Highlights"
                        />
                    </div>
                    <h6><em>Description (About 50 words)</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="heighlightDescription6" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="6th Week Highlights"
                            maxLength="500" minLength="150"
                        />
                    </div>
                </div>  

                <div className="flex-container btn-container">
                    <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                    <button type="button" onClick={this.props.previousPage} className="flex-item btn btn-primary" >Previous</button>
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

export { syllabusStatusTrue };
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
//                             
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
//                             
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