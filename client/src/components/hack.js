import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import { Loader } from './widgets';

class Hack extends Component {
  componentWillMount() {
    this
      .props
      .fetchHackathon({keyword: 'hackathon', address: 'San Francisco'});
  }
  renderHackathons() {
    if (this.props.hackathons.hackathons) {
      // console.log('hey', this.props.hackathons.hackathons.events[0])
      return this
        .props
        .hackathons
        .hackathons
        .events
        .map(hackathon => {
          return (
            <a
              key={hackathon.id}
              target="_blank"
              href={hackathon.url}
              className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{hackathon.name.text}</h5>
                <small>{hackathon
                    .start
                    .local
                    .split('T')[0]}</small>
              </div>
              <small></small>
            </a>
          )
        })
    }
    return <Loader />
  }
  render() {
    return (
      <div className="hack">
        <div className="container">
          <p className="title">Hack</p>
          <div className="list-group">
            {this.renderHackathons()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({hackathons}) {
  return {hackathons}
}

export default connect(mapStateToProps, actions)(Hack)