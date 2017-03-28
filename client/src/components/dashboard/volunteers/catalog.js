import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {Link,hashHistory} from 'react-router';
import { Loader, Space, ComponentLeader } from '../../widgets';
class Catalog extends Component{
    constructor(props){
    super(props)
    this.state = {
      events: this.props.events
    }
  }
  componentWillMount(){
      this.props.fetchAllVolunteer();
  }
  getOneVolunteer(id){
      this.props.fetchOneVolunteer(id);
  }
  uuidd(id){
    return (id+1)*45+33;
  }
  checkDetails(id){
    hashHistory.push(`/dashboard/volunteers/${id}`)
  }
  renderVolunteers(){
    console.log(this.props.events)
    if(this.props.events){
      return this.props.events.map((event) => {
        return (
          <div className="volunteer-item" key={event._id} onClick={this.checkDetails.bind(this, event._id)}>
          <div className="event-title">
            <span className="position">{event.position}</span> {event.title && ` at `+event.title}
          </div>
          <div className="organization">
            <span>hosted by </span>
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
        </div>)
      })
    }
    return <Loader/>
  }
    render() {
        return(<span>
            <div className="header">Explore Volunteers</div>
            <div className="content">
              {this.props.events && <ComponentLeader title={`${this.props.events.length} positions Found`}/>}
              <div className="component-content course-catalog">
              <div className="section">
                  <div className="row">
                  <div className="col-sm-1 col-md-2">
                  </div>
                  <div className="col-sm-10 col-md-8" style={{'padding': '0px'}}>
                  {this.renderVolunteers()}
                  </div>
                  </div>
                  <div className="col-sm-1 col-md-2">
                  </div>
                  <Space h={50} />
              </div>
              </div>
          </div>
        </span>)
    }
}


function mapStateToProps({volunteer}){
    return { 
      events: volunteer.events,
      event: volunteer.event
    }
}

export default connect(mapStateToProps, actions)(Catalog);