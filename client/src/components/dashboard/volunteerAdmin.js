import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import 'react-widgets/lib/less/react-widgets.less';
import Multiselect from 'react-widgets/lib/Multiselect';


import { reduxForm, Field } from 'redux-form';

class VolunteerAdmin extends Component{
    handleFormSubmit(data) {
        console.log('data: ', data);
        // this.props.createVolunteerResource(data);
    }

    renderMultiselect ({input, ...rest}) {
        return (
            <Multiselect {...input}
                onBlur={()=> input.onBlur()}
                value={input.value || []}
            {...rest}/>
        );
    }

    render(){
        const tagList = ['Major','Library','IT'];
        return (
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
                <fieldset className="form-group">
                <h3>Volunteer Event Details:</h3>
                <div>
                    <lable>Activity Name: </lable>
                    <Field 
                        type="text" 
                        name="title" 
                        component="input" 
                        className="form-control"
                        required 
                    />
                </div>
                <div>
                    <lable>Organization: </lable>
                    <Field 
                        type="text" 
                        name="oranization" 
                        component="input" 
                        className="form-control"
                        required
                    />
                </div>
                <div>
                    <lable>When: </lable>
                    <Field 
                        type="text" 
                        name="time" 
                        component="input" 
                        className="form-control"
                        required
                    />
                </div>

                <div>
                    <lable>Where: </lable>
                    <Field 
                        type="text" 
                        name="location" 
                        component="input" 
                        className="form-control"
                        required
                    />
                </div>

                <div>
                    <lable>Tags:</lable>
                    <Field 
                        name="tag"
                        component={this.renderMultiselect.bind(this)}
                        data={['Animals','Computers','Children','Environment','Education','Homeless','Sports']}
                    />
                </div>

                <div>
                    <lable>Description: </lable>
                    <Field 
                        type="text" 
                        name="description" 
                        component="textarea" 
                        className="form-control"
                        required
                    />
                </div>
                </fieldset>
                <button type="submit" className="btn btn-primary">Create</button>
            
            </form>
            
        )
    }
}



VolunteerAdmin = reduxForm({
    form: 'createVolunteerResource',

}, null, actions)(VolunteerAdmin);

export default connect(null, actions)(VolunteerAdmin);