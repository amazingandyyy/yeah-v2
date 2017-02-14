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
        autoplaySspeed: 3000,
        slidesToShow: 1,
        nextArrow: <Empty/>,
        prevArrow: <Empty/>
    }
    return (
      <div className="statistics-component">
          <div>
            2016<br/>
            Yeah共帮助<br/>
          </div>
          <Slider {...settings}>
              <div className="slide-container">
                  Yeah共举办20+场公益转学讲座
              </div>
              <div className="slide-container">
                40+ 人成功进入UC Berkeley
              </div>
              <div className="slide-container">
                7 人成功进入UCLA
              </div>
              <div className="slide-container">
                6 人进入伯克利Haas商学院
              </div>
          </Slider>
          <hr/>
          <div>
            社大转学成果<br/>
          </div>
          <Slider {...settings}>
              <div className="slide-container">
                美国TOP50院校录取率 100%
              </div>
              <div className="slide-container">
                UC院校录取率100%
              </div>
              <div className="slide-container">
                UCB/UCLA全额保证计划录取率92%
              </div>
              <div className="slide-container">
                GPA 3.8以上，UCB及UCLA录取率76%
              </div>
              <div className="slide-container">
                每进入UCB的4个中国学生中就有1人来自Yeah
              </div>
          </Slider>
      </div>
    );
  }
}