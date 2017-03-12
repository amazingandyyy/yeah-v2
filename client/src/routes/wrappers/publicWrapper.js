import React, { Component } from 'react';
import { Header,Footer } from '../../components/widgets';
import { hashHistory } from 'react-router';

export default function(ComposedComponent, headerClassName='') {
    class Wrapper extends Component {
        render() {
            return (
                <div>
                    <Header className={headerClassName}/>
                        <ComposedComponent {...this.props} />
                    <Footer />
                </div>
            )
        }
    }
    return Wrapper;
}