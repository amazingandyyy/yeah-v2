import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Introduction extends Component {
  render() {
    return (
      <div className="intro-component">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-xl-8">
            <video
              className="intro_video"
              src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/videos/intro_video.mp4" 
              muted
              autoPlay="autoplay" 
              type="video/mp4"
              loop>
            </video>
          </div>
          <div className="col-md-12 col-xl-4">
            
              <div className="headline-card">
              <Link to='/course/58b0e6fd74e18ef81a8cb12d'>
                <div className="header" style={{backgroundColor: `rgb(2,179,228)`}}>
                  <div>3/5</div>
                </div>
                <div className="body">
                  Career Workshop 公益讲座
                </div>
              </Link>
              </div>

            <div className="headline-card">
            <Link to='/course/58b0e6fd74e18ef81a8cb12d'>
            <div className="header" style={{backgroundColor: `rgb(2,204,186)`}}>
                <div>3/12</div>
              </div>
              <div className="body">
                Investment Banking 投行入门
              </div>
            </Link>
            </div>

            <div className="headline-card">
            <Link to='/course/58b0e6fd74e18ef81a8cb12d'>
              <div className="header" style={{backgroundColor: `rgb(169,81,237)`}}>
                <div>3/26</div>
              </div>
              <div className="body">
                Web Development 网页开发入门
              </div>
            </Link>
            </div>

          </div>
        </div>
      </div>        
      </div>
    );
  }
}