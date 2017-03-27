import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import {Link, hashHistory} from 'react-router';
import {Loader, Space, ComponentLeader} from '../../widgets';
import VolunteerTemplate from './template';
class Single extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event: this.props.event
        }
    }
    componentWillMount() {
        this.props.resetOneVolunteer()
        let parems = Number(this.props.location.pathname.split('/').reverse()[0]);
        let id = (parems - 33) / 45;
        this.props.fetchOneVolunteer(id);
    }
    renderVolunteer() {
        console.log(this.props.event)
        if (this.props.event) {
            return <VolunteerTemplate data={this.props.event}/>
        }
        return <Loader/>
    }
    goBack() {
        hashHistory.goBack()
    }
    register() {}
    render() {
        return (
            <span>
                <div className="header">
                    <div
                        className="leftBtn"
                        onClick={this
                        .goBack
                        .bind(this)}>
                        <i className="fa fa-chevron-left"></i>
                        Back
                    </div>
                    Detials
                    <div
                        className="rightBtn useless"
                        onClick={this
                        .register
                        .bind(this)}>
                        OOOOO
                    </div>
                </div>
                <div className="content">
                    {this.renderVolunteer()}
                </div>
            </span>
        )
    }
}

function mapStateToProps({volunteer}) {
    return {event: volunteer.event}
}

export default connect(mapStateToProps, actions)(Single);