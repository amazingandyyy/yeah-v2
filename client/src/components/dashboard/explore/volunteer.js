import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Loader } from '../../widgets';
import { Link } from 'react-router';
import qs from 'querystring';

class Volunteer extends Component {
    componentWillMount(){
      this.props.fetchAllVolunteerChances();
    }
    renderList() {
      if(this.props.events){
        return this.props.events.map(event => {
        if (!event.colorSetting){ event.colorSetting = colorSchema[Math.floor(Math.random()*colorLength)] };
        if (!event.thumbnail){ event.thumbnail = 'http://bit.ly/2jvvHDd' };
        let eventQuery = {
          colorSetting: event.colorSetting,
          thumbnail: event.thumbnail
        }
          return (
              <Link to={ {pathname: `/dashboard/explore/volunteer/${event._id}`, query:eventQuery }}  key={event._id}>
              <div className="card resource">
                <div className="image" style={{backgroundImage: `url(${event.thumbnail})`}}>
                  <span style={{color: event.colorSetting}}>new!</span>
                  <div className="overlay" style={{background: event.colorSetting}}></div>
                </div>
                <div className="body"><div className="card-title">{event.title}</div></div>
              </div>
              </Link>
          )
        })
      }else{
        return <Loader style={{ margin: 'auto', width: '30px', marginTop: '50px'}} />
      }
    }
    render() {
        return (
            <div className="section">
              <div className="blur-h right"></div>
              <div className="title">Volunteer Program</div>
              <div className="h-scrollable">
                {this.renderList()}
              </div>
              <div style={{clear:'both'}}></div>

            </div>
        )
    }
}

const colorSchema = [ 'rgb(2,179,228)', 'rgb(2,204,186)', 'rgb(169,81,237)' ]
const colorLength = colorSchema.length;
function mapStateToProps({ volunteer }){
  return {
    events: volunteer.events
  }
}
export default connect(mapStateToProps, actions)(Volunteer);