import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';

class TemplateComponent extends Component{
    componentWillMount() {
        this.props.fetchOneVolunteerChance(Id);
    }
    renderSomething(){
        if(this.props.details){
            return(
                <h1>
                    title: {this.props.details}
                </h1>
            )
        }
        return <Loader />
    }
    render() {
        return(
            <div>{this.renderSomething()}</div>
        )
    }
}

export default connect(({reducer})=>{
    return {details: reducer.key}
}, actions)(TemplateComponent);