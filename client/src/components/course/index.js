import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
          <div style={{paddingTop: '57px'}}>
          {this.props.children}
          </div>
      </div>
    );
  }
}

const CourseList = [
  require('./workshop/03052017/data').default,
  require('./consulting/data').default,
  require('./workshop/03182017/data').default,
  require('./banking/data').default,
  require('./datasci/data').default,
  require('./webdev/data').default
]

export { CourseList };