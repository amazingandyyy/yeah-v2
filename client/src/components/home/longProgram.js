import React, {Component} from 'react';
import{ YeahModal,SalesModal } from '../modals';

export default class LProgram extends Component {
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
          <div className="title-label" style={{color: '#02b3e4'}}>旗舰孵化器项目</div>
          <div className="description">
            欧耶首创，两年服务
            <br/>
            全面提升学经历，最大化成功率
            <br/>
            我们愿意与你从头开始； 陪伴，是最长情的告白
            <br/>            
            <span onClick={this.openSalesModal.bind(this)} className="action-button" style={{color: '#02b3e4'}}>加入孵化器 ></span>
          </div>
          <div className="col-sm-12">
          </div>
        </div>
        </div>
        </div>
        {this.state.showSalesModal && <YeahModal><SalesModal /></YeahModal>}
      </div>
    );a
  }
}