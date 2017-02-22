import React, {Component} from 'react';
import Slider from 'react-slick'
import CountUp from 'react-countup';
import AnimatedNumber from 'react-animated-number';
import Empty from './empty';

export default class Facts extends Component {
  render() {
    const settings = {
        autoplay: true,
        infinite: true,
        autoplaySspeed: 3000,
        slidesToShow: 1,
        nextArrow: <Empty/>,
        prevArrow: <Empty/>
    }
    return (
      <div className="statistics-component">
          <Slider {...settings}>
              <div className="slide-container">
                  <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/fact1.svg" />
              </div>
              <div className="slide-container">
                  <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/fact2.svg" />
              </div>
              <div className="slide-container">
                  <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/fact3.svg" />
              </div>
          </Slider>
      </div>
    );
  }
}