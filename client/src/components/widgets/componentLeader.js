import React, {Component} from 'react';
import Particles from 'react-particles-js';

const ComponentLeader = ({title}) => {
    return (
        <div className="component-leader">
            <Particles/>
            <div className="title">{title}</div>
        </div>
    )
}

export default ComponentLeader;
