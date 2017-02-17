import React, {Component} from 'react';
import commentData from './data';

export default class SProgram extends Component {
    componentWillMount(){
        console.log('commentData: ', commentData)
    }
    renderCard(){
        return commentData.map(student=>{
            return (
                <div className="card comment" key={student.name}>
                <div className="header">
                    <div className="photo" style={{backgroundImage: `url(${student.photo})` }}></div>
                </div>
                <div className="body">
                    <div className="name">{student.name}</div>
                    <div className="service">{student.service}</div>
                    <hr />
                    <div className="content">...{student.content}...</div>
                    <div className="acceptBy">同时录取&nbsp;{student.acceptBy}</div>
                    <div className="university">最终入学&nbsp;{student.university}</div>
                    <div className="university">{student.major}&nbsp;专业</div>
                </div>
                </div>
            )
        })
    }
  render() {
    return (
      <div className="section comment" style={{background: "#f4f4ef"}}>
      <div className="title">听听欧耶毕业生怎么说？</div>
        <div className="h-scrollable no-border">
            {this.renderCard()}
        </div>
      </div>
    );
  }
}