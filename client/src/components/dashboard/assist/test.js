import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Loader } from '../../widgets';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import '../../../styles/react-widget/scss/react-widgets.scss';

class AssistComponent extends Component{
    componentWillMount() {
        this.props.getCollegesList();
    }
    
    renderCollegeInput ({input, ...rest}) {
        let collegeList = _.map(this.props.colleges, 'name');
        return (
            <span style={{width: '100%'}}>
                <DropdownList
                placeholder="Your College"
                    className="yeah-input"
                    data={collegeList}
                    textField='name'
                    caseSensitive={false}
                    filter='contains'
                />
            </span>
        );
    }
// <Multiselect
//     className="yeah-input"
//     {...input}
//     onBlur={()=> input.onBlur()}
//     value={input.value || []}
//     {...rest}
// data={collegeList}
// />

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
                    
                <span>
                <form
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    className="col-xs">

                    <div className="form-wrapper">
                    <label>Colleges</label>
                    <div className="form-group">
                        <Field 
                            name="tags"
                            component={this.renderCollegeInput.bind(this)}
                        />
                    </div>
                    </div>
                    
                </form>
                </span>

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