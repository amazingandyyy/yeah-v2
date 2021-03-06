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


class InternshipAdmin extends Component{
    constructor(props){
        super(props)
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
        const oldLocation = this.props.details.location;
        const newLocation = data.location;
        if(oldLocation.label === newLocation) {
            // locations not changed, replase data.location with oldLocation
            delete data['location'];
        }
        const Id = this.props.details._id;
        this.props.updateOneInternshipChance(Id,data);
    }
    componentWillMount(){
        const pathname = this.props.location.pathname;
        const id = pathname.split('/').pop();
        console.log('id',id);
        if(id){
            this.props.fetchOneInternshipChance(id);
        }
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
        momentLocalizer(moment);
        const {details} = this.props;
        console.log('details',this.props.details);
        const tagList =['Animals','Computers','Children','Environment','Education','Homeless','Sports','Arts', 'Culture','Community','International'];
        const { handleSubmit, dirty, submitting, reset } = this.props;
        if(details)
            {        
            return (
                    <form
                        onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
                    >
                        <div className="form-title-bg">Update The Internship Program</div>
                        <div className="form-wrapper">
                            <label>Position*</label>
                            <div className="form-group">
                                <Field 
                                    type="type" 
                                    name="position" 
                                    component="input" 
                                    className="yeah-input"
                                    placeholder="Internship position"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label>Company*</label>
                            <div className="form-group">
                                <Field 
                                    type="type" 
                                    name="company" 
                                    component="input" 
                                    className="yeah-input"
                                    placeholder="Company Full Name"
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
                                    placeholder="Internship date"
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
                                    placeholder="Internship location"
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
                                    placeholder="Internship Details and discription..."
                                />
                            </div>
                        </div>
                        <div className="flex-container btn-container">
                            <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                            <button type="submit" disabled={ submitting || !dirty } className="flex-item btn btn-primary">Update</button>
                        </div>
                    </form>
                    
                )}
            else{
                return(<Loader />)
            }
    }
}

function mapStateToProps({internship}){
    if(internship.event)
        {
            console.log('location', internship.event.location.label);
            return {
                details:internship.event,
                initialValues: {
                    position: internship.event.position,
                    company: internship.event.company,
                    date: internship.event.date,
                    location: internship.event.location.label,
                    tags: internship.event.tags,
                    description: internship.event.description
            }};
        }
     else{
         return {
             
         }
     }   
}

InternshipAdmin = reduxForm({
    form: 'createInternshipResource',
})(InternshipAdmin);

export default connect(mapStateToProps, actions)(InternshipAdmin);
