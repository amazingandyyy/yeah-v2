import React, {Component} from 'react';
import Catalog from '../../course/catalog/content';

class TemplateComponent extends Component{
    render() {
        return(<span>
                <div className="header">Explore Courses</div>
                <div className="content">
                    <Catalog/>
                </div>
            </span>)
    }
}

export default TemplateComponent;

// <Volunteer />
// <Course />
// <Internship />