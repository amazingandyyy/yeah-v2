import React, {Component} from 'react';
import Volunteer from './volunteer';
import Course from './course';
import Internship from './internship'
class TemplateComponent extends Component{
    render() {
        return(<span>
                <div className="header">Explore</div>
                <div className="content">
                    <Volunteer />
                    <Course />
                    <Internship />
                </div>
            </span>)
    }
}

export default TemplateComponent;