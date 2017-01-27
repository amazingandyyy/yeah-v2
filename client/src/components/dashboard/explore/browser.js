import React, {Component} from 'react';
import Volunteer from './volunteer';
import Course from './course';
import Intership from './intership'
class TemplateComponent extends Component{
    render() {
        return(<span>
                <div className="header">Explore</div>
                <div className="content">
                    <Volunteer />
                    <Course />
                    <Intership />
                </div>
            </span>)
    }
}

export default TemplateComponent;