import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
// import 'react-widgets/lib/scss/react-widgets.scss';
import '../../styles/react-widget/scss/react-widgets.scss';
import Multiselect from 'react-widgets/lib/Multiselect';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { reduxForm, Field } from 'redux-form';

class IntershipAdmin extends Component{
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
        this.props.createIntershipResource(data);
    }

    renderMultiselect ({input, ...rest}) {
        return (
            <span style={{width: '100%'}}>
                <Multiselect 
                    className="yeah-input"
                    {...input}
                    onBlur={()=> input.onBlur()}
                    value={input.value || []}
                    {...rest}
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

        const tagList =['Animals','Computers','Children','Environment','Education','Homeless','Sports','Arts', 'Culture','Community','International'];
        const { handleSubmit, dirty, submitting, reset } = this.props;
        return (
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
                <fieldset className="form-group">
                <div className="form-title-bg">Create A Intership Program</div>
                <div className="form-wrapper">
                    <label>Position*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="position" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Intership position"
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
                            placeholder="Intership date"
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
                            component="input" 
                            className="yeah-input"
                            placeholder="Intership location"
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
                            placeholder="Intership Details and discription..."
                        />
                    </div>
                </div>
                </fieldset>
                <div className="flex-container btn-container">
                    <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                    <button type="submit" disabled={ submitting || !dirty } className="flex-item btn btn-primary">Create</button>
                </div>
            </form>
            
        )
    }
}


IntershipAdmin = reduxForm({
    form: 'createIntershipResource',
    initialValues: {
        date: moment().add(1, 'day').format('YYYY-MM-DD')
    }

}, null, actions)(IntershipAdmin);

export default connect(null, actions)(IntershipAdmin);
