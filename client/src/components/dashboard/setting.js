import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as actions from '../../actions';
import { Loader } from '../widgets';
import moment from 'moment';
import Dropzone from 'react-dropzone';

class Setting extends Component {
  componentWillMount(){
    this.props.fetchProfile()
  }
  renderProfile(){
    const { name, email } = this.props.profile;
    console.log(name);
    if(name){
      return (<div>
        <h2>Profile</h2>
        <p>name: {name.first} {name.last}</p>
        <p>email: {email.data}</p>
        {this.renderAvatar()}
      </div>)
    }else{
      return  <Loader />
    }
  }
  renderAvatar(){
    if(this.props.profile.avatar){
      return (<img src={this.props.profile.avatar} />)
    }else{
      return (<p>no image</p>)
    }
  }
  onDrop(files) {
    this.props.uploadProfileAvatar(files);
  }
  render() {
    return (
      <div className="display-componet">
        <div className="header">Settings</div>
        <div className="content">
          <div className="container">
            {this.renderProfile()}
            <div>
              <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
            </div>
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

// <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
//   <div>Try dropping some files here, or click to select files to upload.</div>
// </Dropzone>