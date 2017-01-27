import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Loader } from '../../widgets';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';

class AssistComponent extends Component{
    componentWillMount() {
        this.props.getCollegesList();
    }
    
    renderCollegeInput() {
        // let collegeList = _.map(this.props.colleges, 'name');
        console.log('colleges:', this.props.colleges);
        if(this.props.colleges){
            return (
                <div className="form-wrapper">
                <label>From</label>
                <div className="form-group">
                    <select className="yeah-input">
                        {this.props.colleges.map(college=>{
                            return <option value={college.code}>{college.name}</option>
                        })}
                    </select>
                </div>
                </div>
            );
        }
    }
    handleFormSubmit(data) {
        console.log('data: ', data);
    }
        
    render() {
        const {handleSubmit, submitting, reset, dirty} = this.props;

        return(
            <div className="display-componet">
                <div className="header">Assist</div>
                <div className="content">
                <div className="container">
                <div className="card">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="flex-container">
                        <span className="flex-item">
                            {this.renderCollegeInput()}
                        </span>
                        <span className="flex-item">
                            {this.renderCollegeInput()}
                        </span>
                    </div>
                </form>
                <span>
                </span>

                </div>
                </div>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps({assist}){
    return {colleges: assist.colleges}
}
AssistComponent = reduxForm({form: 'assistForm'})(AssistComponent);
AssistComponent = connect(mapStateToProps, actions)(AssistComponent);
export default AssistComponent;