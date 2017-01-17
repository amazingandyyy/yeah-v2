import React, { Component } from 'react';
import { connect } from 'react-redux';

class Volunteer extends Component {
    render() {
        return (
            <div className="section">
              <div className="title">
                Volunteer Events
              </div>
              <div>
                <div className="card resource">
                <div className="image">
                  <span style={{color:'rgb(2,179,228)'}}>new!</span>
                  <div className="overlay" style={{background:'rgb(2,179,228)'}}></div>
                </div>
                <div className="body">
                  <div className="card-title">
                  Help high school students
                  </div>
                </div>
                </div>
                <div className="card resource">
                <div className="image">
                  <span style={{color:'rgb(2,204,186)'}}>new!</span>
                  <div className="overlay" style={{background:'rgb(2,204,186)'}}></div>
                </div>
                <div className="body">
                  <div className="card-title">
                  Help high school students
                  </div>
                </div>
                </div>
                <div className="card resource">
                <div className="image">
                  <span style={{color:'rgb(169,81,237)'}}>new!</span>
                  <div className="overlay" style={{background:'rgb(169,81,237)'}}></div>
                </div>
                <div className="body">
                  <div className="card-title">
                  Help high school students
                  </div>
                </div>
                </div>
              </div>
            </div>
        )
    }
}

export default connect(null, null)(Volunteer);