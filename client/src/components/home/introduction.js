import React, {Component} from 'react';

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
            <div className="headline-card"></div>
            <div className="headline-card"></div>
            <div className="headline-card"></div>
          </div>
        </div>
      </div>        
      </div>
    );
  }
}



// <div className="left-column">
//   <video
//     className="intro_video"
//     src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/videos/intro_video.mp4" 
//     muted
//     autoPlay="autoplay" 
//     type="video/mp4" 
//     loop>
//   </video>
// </div>
// <div className="right-column">
//   
// </div>