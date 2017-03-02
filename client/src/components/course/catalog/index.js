import React, {Component} from 'react';
import { CourseList } from '../index';
import { Header, Footer, Loader, Space } from '../../widgets';
import { Link } from 'react-router';
import moment from 'moment';

class Catalog extends Component{
    renderCourses(){
        if(CourseList){
            return CourseList.map(({_id, course})=>{
                return (<Link to={'/course/'+_id} key={_id}>
                <div className="resourseCard">
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
                <Header className=""/>
                <div className="component-leader">
                    <div className="title">Course Catalog</div>
                </div>
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
                    <Space height="50"/>
                </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Catalog;