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
                    <div className="body">
                        <img src={student.photo} width={80}/>
                        <div className="name">{student.name}</div>
                        <div className="service">{student.service}</div>
                        <div className="major">{student.major}</div>
                        <div className="content">{student.content}</div>
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