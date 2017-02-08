import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Loader } from '../../widgets';
import { Link } from 'react-router';
import qs from 'querystring';

class Course extends Component {
    componentWillMount(){
      this.props.fetchAllCourseChances();
    }
    renderList() {
      if(this.props.events){
        if(this.props.events.length > 0) {
          return this.props.events.map(event => {
            if (!event.colorSetting){ event.colorSetting = colorSchema[Math.floor(Math.random()*colorLength)] };
            if (!event.thumbnail){ event.thumbnail = 'http://bit.ly/2jvvHDd' };
            let eventQuery = {
              colorSetting: event.colorSetting,
              thumbnail: event.thumbnail
            }
            return (
                <Link to={ {pathname: `/course/${event._id}` }}  key={event._id}>
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
          return <p>no resources just yet</p>
        }
      }else{
        return <Loader style={{ margin: 'auto', width: '30px', marginTop: '50px'}} />
      }
    }
    render() {
        return (
            <div className="section">
              <div className="blur-h right"></div>
              <div className="title">Training Program</div>
              <div className="h-scrollable">
                {this.renderList()}
              </div>
              <div style={{clear:'both'}}></div>
            </div>
        )
    }
}

const colorSchema = [ 'rgb(2,179,228)', 'rgb(2,204,186)', 'rgb(169,81,237)', 'rgb(20,109,218)', 'rgb(50,210,166)', 'rgb(189,100,217)' ]
const colorLength = colorSchema.length;
function mapStateToProps({ course }){
  return {
    events: course.events
  }
}
export default connect(mapStateToProps, actions)(Course);