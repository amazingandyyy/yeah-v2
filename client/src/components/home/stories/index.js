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
                <div className="university">转入{student.university}</div>
                <div className="body">
                    <div className="photo" style={{backgroundImage: `url(${student.photo})` }}></div>
                    <div className="name">{student.name}</div>
                    <div className="major">{student.major}&nbsp;专业</div>
                    <hr />
                    <div className="content">...{student.content}...</div>
                    <hr/>
                    <div className="service">参加项目：{student.service}</div>
                    <div className="acceptBy">同时录取：&nbsp;{student.acceptBy}</div>
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