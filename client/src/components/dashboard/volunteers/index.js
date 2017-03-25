import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import { Loader, Space, ComponentLeader } from '../../widgets';

class Explore extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: this.props.events
    }
  }
  componentWillMount(){
      this.props.fetchAllVolunteer();
  }
  renderVolunteers(){
    console.log(this.props.events)
    if(this.props.events){
      return this.props.events.map(event => {
        return <div>
          {event.title}
        </div>
      })
    }
    return <Loader/>
  }
  render() {
    return (
      <div className="display-component explore">
          <div>
          <div className="header">Explore</div>
            <div className="content">
              <ComponentLeader title="Finding Volunteers"/>  
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
                  <Space height="50"/>
              </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps({volunteer}){
    return { events: volunteer.events }
}

export default connect(mapStateToProps, actions)(Explore);