import React, {Component} from 'react';
import {Link} from 'react-router';
import {YeahModal, SalesModal} from './modals';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row services">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                                Consultant
                            </div>
                            <ul>
                                <li><Link to="/incubator">College Incubator</Link></li>
                                <li><Link to="/accelerator">Application Accelerator</Link></li>
                                <li><Link to="/accelerator">Private University</Link></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                            <Link to="/course/catalog">
                                Crush Courses
                            </Link>
                            </div>
                            <ul>
                                <li><Link to="/course/banking">Banking Course</Link></li>
                                <li><Link to="/course/consulting">Accounting Course</Link></li>
                                <li><Link to="/course/consulting">Consoulting Course</Link></li>
                                <li><Link to="/course/webdev">Web Development Course</Link></li>
                                <li><Link to="/course/datasci">Data Science Course</Link></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                                Company
                            </div>
                            <ul>
                                <li><Link to="/about">Team</Link></li>
                                <li><Link to="/news">News</Link></li>
                                <li><Link to="/about">Contacts</Link></li>
                                <li><Link to="/about">Career</Link></li>
                                <li><Link to="/about">Developer</Link></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="title">
                                Follow Us
                            </div>
                            <ul>
                                <li><a href="https://www.facebook.com/yeaheducation/" target="_blank">Facebook Page</a></li>
                            </ul>
                            <div className="title">
                                Wechat QRcode
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
                    Copyright © 2013-2017 Yeah Education Group All rights reserved.
                </div>
                </div>
            </div>
        )
    }
}

export default Footer;





// import React, {Component} from 'react';
// import {Link} from 'react-router';
// import {YeahModal, SalesModal} from './modals';

// class Footer extends Component {
//     render() {
//         return (
//             <div className="footer">
//                 <div className="container">
//                     <div className="row services">
//                         <div className="col-xs-12 col-sm-6 col-md-3">
//                             <div className="title">
//                                 转学服务
//                             </div>
//                             <ul>
//                                 <li><Link>欧耶优才孵化器</Link></li>
//                                 <li><Link>申请冲刺加速器</Link></li>
//                                 <li><Link>私校申请服务</Link></li>
//                                 <li><Link>转学私人顾问</Link></li>
//                             </ul>
//                         </div>
//                         <div className="col-xs-12 col-sm-6 col-md-3">
//                             <div className="title">
//                             <Link to="/course/catalog">
//                                 职场培训 Program
//                             </Link>
//                             </div>
//                             <ul>
//                                 <li><Link to="/course/banking">Banking 课程</Link></li>
//                                 <li><Link to="/course/consulting">Accounting 课程</Link></li>
//                                 <li><Link to="/course/consulting">Consoulting 课程</Link></li>
//                                 <li><Link to="/course/webdev">Web Development 课程</Link></li>
//                                 <li><Link to="/course/datasci">Data Science 课程</Link></li>
//                             </ul>
//                         </div>
//                         <div className="col-xs-12 col-sm-6 col-md-3">
//                             <div className="title">
//                                 关于公司
//                             </div>
//                             <ul>
//                                 <li><Link to="/about">团队</Link></li>
//                                 <li><Link to="/about">新闻中心</Link></li>
//                                 <li><Link to="/about">联络合作</Link></li>
//                                 <li><Link to="/about">加入我们</Link></li>
//                                 <li><Link to="/about">开发者专区</Link></li>
//                             </ul>
//                         </div>
//                         <div className="col-xs-12 col-sm-6 col-md-3">
//                             <div className="title">
//                                 关注我们
//                             </div>
//                             <ul>
//                                 <li><a href="https://www.facebook.com/yeaheducation/" target="_blank">脸书专页</a></li>
//                             </ul>
//                             <div className="title">
//                                 微信账号
//                             </div>
//                             <ul>
//                                 <li>
//                                     <img className="wechat-qrcode" src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/qrcodes/super_advisor.png"/>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 <hr/>
//                 <div className="claim">
//                     Copyright © 2014-2017 Yeah Education Group All rights reserved.
//                 </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Footer;