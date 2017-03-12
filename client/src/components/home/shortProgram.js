import React, {Component} from 'react';
import Link from 'react-router';
import{ YeahModal,SalesModal } from '../widgets/modals';

export default class SProgram extends Component {
  constructor(props){
      super(props);
      this.state = {
          showSalesModal: false
      }
  }
  openSalesModal(){
      this.setState({
          showSalesModal: true
      })
  }
  render() {
    return (
      <div className="section longProgram">
        <div className="container-fluid" style={{maxWidth: '1000px'}}>
        <div className="row">
        <div className="col-sm-12">
          <Link to="/accelerator"><div className="title-label" style={{color: '#FF5483'}}>限额加速器计划</div></Link>
          <div className="description">
            2017 全新企划
            <br/>
            限量名额，品质保证
            <br/>
            三对一导师精英模式，转学成功率+650%
            <br/>            
            <span onClick={this.openSalesModal.bind(this)} className="action-button" style={{color: '#FF5483'}}>申请加速器 ></span>
          </div>
          <div className="col-sm-12">
          </div>
        </div>
        </div>
        </div>
        {this.state.showSalesModal && <YeahModal><SalesModal /></YeahModal>}
      </div>
    );
  }
}