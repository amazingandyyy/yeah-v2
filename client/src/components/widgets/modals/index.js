import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { store } from '../../../index';
import { Provider } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

class YeahModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSalesModal: false
        }
    }
    
    handleCloseModal(){
        document.body.removeChild(this.modalTarget);
    }

    componentDidMount(){
        this.modalTarget = document.createElement('div');
        this.modalTarget.className = 'yeah-modal';
        document.body.appendChild(this.modalTarget);
        this._render()
    }

    componentWillUpdate(){
        this.modalTarget = document.createElement('div');
        this.modalTarget.className = 'yeah-modal animated';
        document.body.appendChild(this.modalTarget);
        this._render()
    }

    componentWillUnmount(){
         ReactDOM.unmountComponentAtNode(this.modalTarget);
    }

    _render(){
        ReactDOM.render(<Provider store={store}>
        <div className="wrapper animated bounceIn">
            <div className="close-button" onClick={this.handleCloseModal.bind(this)}>
            </div>
            <div className="body">
                {this.props.children}
            </div>
            <div className="action">

            </div>
        </div>
        </Provider>, this.modalTarget)
    }

    render(){
        return <noscript />
    }
}
class SalesModal extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="sales">
                <div className="title-icon wechat animated wobble"><i className="fa fa-weixin" aria-hidden="true"></i></div>
                <div className="action">
                    扫码/长按二维码，立刻与欧耶大使报名！
                </div>
                <br/>
                <img className="animated bounceIn" style={{'width': '300px'}} src={require('./super_advisor.png')}/>
            </div>
        )
    }
}

export { YeahModal, SalesModal };