import React, {Component} from 'react';
import { CourseList } from '../index';
import { Header, Footer, Loader, Space, ComponentLeader } from '../../widgets';
import { Link } from 'react-router';
import moment from 'moment';

class About extends Component{
    renderContent() {
        return (
            <div className="about-component">
            
            </div>
        )
    }
    render() {
        return(
            <div>
                <Header className="fixed"/>
                <ComponentLeader title="About" />
                {this.renderContent()}
                <Footer />
            </div>
        )
    }
}

export default About;