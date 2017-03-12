import React, {Component} from 'react';
import { Header, Footer, Loader, Space, ComponentLeader } from '../../widgets';
import Content from './content';

class Catalog extends Component{
    render() {
        return(
            <div>
                <Header className=""/>
                <Content />
                <Footer />
            </div>
        )
    }
}

export default Catalog;