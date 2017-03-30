import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import{ YeahModal } from '../../widgets/modals';

class Application extends Component {
  constructor(props) {
        super(props);
        this.state = {
            details: props.data,
            modal: {
              new_app: false
            }
        }
    }
        
    openModal(modalId){
        switch (modalId) {
          case 'new_app':
            this.setState({
                modal: {
                  new_app: true
                }
            })
            break;
        
          default:
            break;
        }
    }

  renderAdminApp() {
    return (<div>
      <button className="btn btn-primary" onClick={this.openModal.bind(this, 'new_app')}>
        new application
      </button>
    </div>)
  }

  render() {
    return (
      <div className="display-component application">
        <div className="header">Applications</div>
        <div className="content">
        <div className="container">
          <div className="title">
            Applications
          </div>
          {this.props.isAdmin && this.renderAdminApp()}
        </div>
        </div>
        {this.state.modal.new_app && <YeahModal><NewAppForm/></YeahModal>}
      </div>
    );
  }
}
const NewAppForm = () => {
      return (<div>
      <div className="title-icon signup animated pulse"><i className="fa fa-check" aria-hidden="true"></i></div>
      <div className="action">
          Please Complete signup form
      </div>
      <br/>
      new App
    </div>)
}
function mapStateToProps({application, auth}){
    return {
      isAdmin: auth.isAdmin,
      apps: application.apps,
      app: application.app,
      error: application.error
    }
}

export default connect(mapStateToProps, actions)(Application)