import React, {Component} from 'react';
import { CourseList } from '../index';
import { Header, Footer, Loader, Space, ComponentLeader } from '../../widgets';
import { Link } from 'react-router';
import moment from 'moment';

class Catalog extends Component{
    renderCourses(){
        if(CourseList){
            return CourseList.reverse().map(({_id, course}, index)=>{
                return (<Link to={'/course/'+_id} key={index}>
                <div className="resourseCard">
                    <div className="decoration">
                        <div className="point">
                            <div className="start">start at</div>
                            {moment(course.startingDate).format('MM/DD')}
                        </div>
                    </div>
                    <div className="title">{course.title}</div>
                    <div className="date">{moment(course.startingDate).format('dddd, MMMM Do, YYYY')}</div>
                    <div className="overview">{course.overview}</div>
                </div></Link>)
            })
        }else{
            return <Loader />
        }
    }
    renderMore(){
        return (
            <div className="comingMore">
                Coming Soon
            </div>
        )
    }
    render() {
        return(
            <div>
                <ComponentLeader title="Course Catalog"/>  
                <div className="component-content course-catalog">
                <div className="section">
                    <div className="row">
                    <div className="col-sm-1 col-md-2">
                    </div>
                    <div className="col-sm-10 col-md-8" style={{'padding': '0px'}}>
                        {this.renderCourses()}
                        {this.renderMore()}
                    </div>
                    </div>
                    <div className="col-sm-1 col-md-2">
                    </div>
                    <Space h="50"/>
                </div>
                </div>
            </div>
        )
    }
}

export default Catalog;