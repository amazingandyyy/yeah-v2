import React from 'react';

export default function(props){
  let loaderStyle = {margin: 'auto', width: '20px', animation: 'fa-spin 0.5s infinite linear'}
  if(props.style){
    loaderStyle = {...loaderStyle, ...props.style }
  }
  if(props.size) {
    loaderStyle['width'] = props.size
  }
    return (
      <div style={{ margin: 'auto', textAlign: 'center', height: '100%'}}>
        <img src="https://s3-us-west-1.amazonaws.com/athons/loading.svg" className="fa fa-spin" style={loaderStyle}/>
      </div>
    );
}