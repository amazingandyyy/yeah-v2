import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as actions from '../../actions';
import { Loader } from '../widgets';
import moment from 'moment';

class Setting extends Component {
  componentWillMount(){
    this.props.fetchProfile()
  }
  renderProfile(){
    if(this.props.profile){
      return (<div>
      <h2>Profile</h2>
      <h5>Name: {this.props.profile.name}</h5>
      <h5>Email: {this.props.profile.email}</h5>
      <h5>Joined At: {moment.unix(this.props.profile.createAt).format("MM/DD/YYYY")}</h5>
      </div>)
    }else{
      return  <Loader />
    }
  }
  render() {
    return (
      <div className="display-componet">
        <div className="header">Setting</div>
        <div className="content">
          <div className="container">
            {this.renderProfile()}
          <div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({profile}){
  return {
    profile
  }
}

export default connect(mapStateToProps, actions)(Setting);