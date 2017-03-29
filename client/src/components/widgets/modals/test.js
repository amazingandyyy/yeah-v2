import React, {Component} from 'react';

class SignUpModal extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="sales">
                <div className="title-icon wechat animated wobble"><i className="fa fa-weixin" aria-hidden="true"></i></div>
                <div className="action">
                    SignUpModal!
                </div>
                <br/>
                <img className="animated bounceIn" style={{'width': '300px'}} src={require('./super_advisor.png')}/>
            </div>
        )
    }
}

export default SignUpModal;