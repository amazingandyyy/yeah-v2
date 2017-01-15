import React from 'react';

 const Loader = ({ style }) => {
    return (
      <div style={{...style, margin: 'auto'}}>
        <img src="https://s3-us-west-1.amazonaws.com/athons/loading.svg" className="fa fa-spin" style={{animation: 'fa-spin 0.5s infinite linear'}}/>
      </div>
    );
}

export { Loader };