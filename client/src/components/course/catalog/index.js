import React, {Component} from 'react';
import { CourseList } from '../index';
import { Header, Footer, Loader } from '../../widgets';

class Catalog extends Component{
    renderCourses(){
        if(CourseList){
            return CourseList.map(({course}, index)=>{
                return (<div className="resourseCard" key={index}>
                        <div className="title">{course.title}</div>
                        <div className="date">{course.startingDate}</div>
                        <div className="overview">{course.overview}</div>
                </div>)
            })
        }else{
            return <Loader />
        }
    }
    render() {
        return(
            <div>
                <Header className="fixed inverse"/>
                    <div className="course-catalog-component">
                    <div className="section">
                        <div className="title">Courses Catalog</div>
                        <hr/>
                        <div className="row">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-8" style={{'padding': '0px'}}>
                            <table>
                                {this.renderCourses()}
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                <Footer />
            </div>
        )
    }
}

export default Catalog;