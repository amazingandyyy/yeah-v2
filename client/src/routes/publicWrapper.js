import React, {Component} from 'react';
import {Header,Footer} from '../components/widgets';

export default function(ComposedComponent, headerClassName='') {
    class Wrapper extends Component {
        componentWillReceiveProps() {
            // window.previousLocation = this.props.location;
            console.log(window.previousLocation)
        }

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