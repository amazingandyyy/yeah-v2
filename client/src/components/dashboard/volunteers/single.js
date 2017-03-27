import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import {Link, hashHistory} from 'react-router';
import {Loader, Space, ComponentLeader} from '../../widgets';

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
        this.getOneVolunteer(id)
    }
    getOneVolunteer(id) {
        this
            .props
            .fetchOneVolunteer(id);
    }
    uuidd(id) {
        return (id + 1) * 45 + 33;
    }
    renderVolunteers() {
        console.log(this.props.event)
        if (this.props.event) {
            return this
                .props
                .event
                .map((event) => {
                    return (
                        <div className="volunteer-item" key="1">
                            <div className="event-title">
                                <span className="position">{event.position}</span>
                                {event.title && ` at ` + event.title}
                            </div>
                            <div className="organization">
                                <span>with
                                </span>
                                <a href={event.organization.url} target="_blank">{event.organization.name}</a>
                            </div>
                            <div className="information">
                                <div className="info">
                                    <div className="left">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    </div>
                                    <div className="right">{event.location.address}</div>
                                </div>
                                <div className="info">
                                    <div className="left">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                    <div className="right">{event.time}</div>
                                </div>
                            </div>
                            <div>
                                <div>Duties</div>
                                {event.duties}
                            </div>
                            <div>
                                <div>Prerequisites</div>
                                {event.prerequisites}
                            </div>
                            <div>
                                <div>Apply Method</div>
                                {event.applyMethod}
                            </div>
                        </div>
                    )
                })
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
                        className="rightBtn"
                        onClick={this
                        .register
                        .bind(this)}>
                        <i className="fa fa-rocket"></i>
                        Register
                    </div>
                </div>
                <div className="content">
                    <ComponentLeader title=""/>
                    <div className="component-content course-Single">
                        <div className="section">
                            <div className="row">
                                <div className="col-sm-1 col-md-2"></div>
                                <div
                                    className="col-sm-10 col-md-8"
                                    style={{
                                    'padding': '0px'
                                }}>
                                    {this.renderVolunteers()}
                                </div>
                            </div>
                            <div className="col-sm-1 col-md-2"></div>
                            <Space h={50}/>
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}

function mapStateToProps({volunteer}) {
    return {event: volunteer.event}
}

export default connect(mapStateToProps, actions)(Single);