import React from 'react';

export default function({name, color, style}){
  const styleSetting = {
    margin: 'auto',
    marginRight: '5px', 
    marginLeft: '5px',
    position: 'relative',
    display: 'inline-block'
  }
  switch (name) {
    case 'logout':
      return (
        <div style={{...style, ...styleSetting}}>
            <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/logout.svg" />
        </div>)
    case 'home':
      return (
        <div style={{...style, ...styleSetting}}>
            <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/home.svg" />
        </div>)
    case 'setting':
      return (
        <div style={{...style, ...styleSetting}}>
            <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/setting.svg" />
        </div>)
    case 'catalog':
      return (
        <div style={{...style, ...styleSetting}}>
            <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/catalog.svg" />
        </div>)

    default:
      return 
        (<noscript/>)
  }
}