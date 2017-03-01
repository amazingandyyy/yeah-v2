import React, {Component} from 'react';
import { Loader, Header, Footer } from '../../widgets';

class Catalog extends Component{
    render() {
        return(
            <div>
                <Header className="fixed inverse"/>
                    Catalog
                <Footer />
            </div>
        )
    }
}

export default Catalog;