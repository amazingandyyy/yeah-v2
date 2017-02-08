import React, { Component } from 'react';
import $ from 'jquery';

class UCInfomation extends Component{
    render(){
        return (
<<<<<<< HEAD
        <div className="display-component">
=======
        <div className="display-componet">
>>>>>>> origin/david
            <div className="header">UC Stats</div>
            <div className="content" style={{background: 'white'}}>
                <div className="container" style={{paddingTop: '80px'}}>
                    <div className='tableauPlaceholder' style={{transform: 'scale(1.1)', width: '1004px', height: '862px'}}>
                        <object className='tableauViz' width='1004px' height='862px' style={{display:'none'}}><param name='host_url' value='https%3A%2F%2Fvisualizedata.ucop.edu%2F'/>
                        <param name='site_root' value='&#47;t&#47;Public'/><param name='name' value='TransferbyCCM&#47;ByMajorName'/><param name='tabs' value='yes'/><param name='toolbar' value='yes'/><param name='showShareOptions' value='true'/><param name='display_spinner' value='no'/></object>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default UCInfomation;