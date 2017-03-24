import React, {Component} from 'react';
import AssistForm from './form';
const AssistComponent = () => {
    return (
        <div className="display-component">
            <div className="header">Major Requirement Checking System</div>
            <div className="content">
                <div className="container">
                    <div className="card">
                        <AssistForm /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssistComponent;