import React, {Component} from 'react';
import Volunteer from './volunteer';

class TemplateComponent extends Component{
    render() {
        return(<span>
                <div className="header">Explore</div>
                <div className="content">
                    <Volunteer />
                </div>
            </span>)
    }
}

export default TemplateComponent;