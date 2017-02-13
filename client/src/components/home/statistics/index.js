import React, {Component} from 'react';
import Slider from 'react-slick'

export default class Statistics extends Component {
  render() {
    const settings = {
        autoplay: true,
        autoplaySspeed: 1000,
        slidesToShow: 1
    }
    return (
      <div className="statistics-component">
        <Slider {...settings}>
            <div className="slide-container">
                在过去3年中，Yeah共举办20+场公益转学讲座
            </div>
            <div className="slide-container">
              Yeah共帮助
              40+ 人成功进入UC Berkeley
              7人成功进入UCLA
              3 人成功进入 University of Michigan Ann Arbor
              2 人成功进入 Columbia University
              1 人成功进入 New York University
            </div>
            <div className="slide-container">
            Yeah共帮助6人进入伯克利Haas商学院 （录取率4%-5%）
            </div>
            <div className="slide-container">
            Yeah共帮助6人进入伯克利Haas商学院 （录取率4%-5%）
            </div>
        </Slider>
        <Slider {...settings}>
            <div className="slide-container">
                美国TOP 50 院校录取率 100%
            </div>
            <div className="slide-container">
              UC院校录取率100%
            </div>
            <div className="slide-container">
              UCB，UCLA全额保证计划录取率92%
            </div>
            <div className="slide-container">
              GPA 3.8以上，UCB及UCLA录取率76%
            </div>
            <div className="slide-container">
              加州湾区每进入UCB的4个学生中就有1人来自Yeah
            </div>
        </Slider>
      </div>
    );
  }
}