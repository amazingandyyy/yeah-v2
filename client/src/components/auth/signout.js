import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    constructor(){
        super()

        this.state = {
            currentCount: 3
        }
    }
    componentWillMount() {
        this.props.signUserOut()
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer.bind(this), 1000);
        this.setState({intervalId: intervalId});
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    timer(){
        var newCount = this.state.currentCount - 1;
        if(newCount >= 0) {
            this.setState({ currentCount: newCount });
        } else {
            window.location = '/'
        }
    }
    render() {
        return (
            <div className="signout-component">
                <h1>Hope to see you soon!</h1>
                <div>
                    Page will direct to home page in <span>{this.state.currentCount}</span> seconds.
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Signout)