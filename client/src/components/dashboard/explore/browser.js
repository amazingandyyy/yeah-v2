import React, {Component} from 'react';
import Volunteer from './volunteer';

class TemplateComponent extends Component{
    render() {
        return(
            <div>
                <Volunteer />
                <Volunteer />
                <Volunteer />
                <Volunteer />
            </div>
        )
    }
}

export default TemplateComponent;