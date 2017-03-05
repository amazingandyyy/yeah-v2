import React, {Component} from 'react';
import Slider from 'react-slick'
import CountUp from 'react-countup';
import AnimatedNumber from 'react-animated-number';
import Empty from './empty';

export default class Statistics extends Component {
  render() {
    const settings = {
        autoplay: true,
        infinite: true,
        autoplaySspeed: 2800,
        slidesToShow: 1,
        nextArrow: <Empty/>,
        prevArrow: <Empty/>
    }
    return (
      <div className="statistics-component">
          <Slider {...settings}>
              <div className="slide-container">
                  <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/webcontent/stats1.png" />
              </div>
              <div className="slide-container">
                  <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/webcontent/stats2.png" />
              </div>
              <div className="slide-container">
                  <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/webcontent/stats3.png" />
              </div>
          </Slider>
      </div>
    );
  }
}