import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {YeahModal, SalesModal} from './widgets/modals';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row services">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                                转学服务
                            </div>
                            <ul>
                                <li><Link>欧耶优才孵化器</Link></li>
                                <li><Link>申请冲刺加速器</Link></li>
                                <li><Link>私校申请服务</Link></li>
                                <li><Link>转学私人顾问</Link></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                                职场培训 Program
                            </div>
                            <ul>
                                <li><Link>Banking 课程</Link></li>
                                <li><Link>Accounting 课程</Link></li>
                                <li><Link>Consoulting 课程</Link></li>
                                <li><Link>Web Development 课程</Link></li>
                                <li><Link>Data Science 课程</Link></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                                关于公司
                            </div>
                            <ul>
                                <li><Link>团队</Link></li>
                                <li><Link>新闻中心</Link></li>
                                <li><Link>联络合作</Link></li>
                                <li><Link>加入我们</Link></li>
                                <li><Link>开发者专区</Link></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                                关注我们
                            </div>
                            <ul>
                                <li><a href="https://www.facebook.com/yeaheducation/" target="_blank">脸书专页</a></li>
                                <li><Link>官方微博</Link></li>
                            </ul>
                            <div className="title">
                                微信账号
                            </div>
                            <ul>
                                <li>
                                    <img className="wechat-qrcode" src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/qrcodes/super_advisor.png"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                <hr/>
                <div className="claim">
                    Copyright © 2014-2017 Yeah Education Group All rights reserved.
                </div>
                </div>
            </div>
        )
    }
}

export default Footer;
                // <ReactModal
                //     isOpen={this.state.showSalesModal}
                //     contentLabel="Minimal Modal Example"
                //     parentSelector={() => document.getElementById('app')}
                //     closeTimeoutMS={500}>
                // <SalesModal />
                // </ReactModal>