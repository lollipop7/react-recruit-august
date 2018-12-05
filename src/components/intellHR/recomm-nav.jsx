import React, {Component} from 'react';
import {Input, Icon} from 'antd';

class RecommNav extends Component {
  constructor(props){
    super(props);
    this.state={
      jobname: ''
    }
    this.emitEmpty = this.emitEmpty.bind(this);
  }

  handleChange(key, v) {
    this.setState({
      [key]: v.target.value
    })
  }

  emitEmpty = () => {
    this.jobNameInput.focus();
    this.setState({ jobname: '' });
  }

  render(){
    const {jobname} = this.state;
    const suffix = jobname ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const jobList = ['']
    return (
      <div className="left-nav"
        style={{
          left: 1000,
          width: 200,
        }}
      >
        <div className="title">
          <img  
            style={{
              marginRight: 10,
              width: 20
            }}
            src="static/images/intellHR/icon-ai-s.png" alt=""/>
            <span 
              style={{
                display: "inline-block",
                verticalAlign: "top"
              }}
            >智能推荐</span>
        </div>
        <div 
            style={{
              margin: "0 auto",
              width: 160,
            }}
        >
          <Input 
            placeholder="职位搜索"
            onChange = {v=>this.handleChange('jobname', v)}
            value={jobname}
            style={{
              marginTop: 20
            }}
            prefix={
                <a 
                    href="javascript:;"
                    onClick={this.handleSearch}
                >
                    <img src="static/images/manager/search.png" alt="搜索"/>
                </a>
            }
            suffix={suffix}
            ref={node=>this.jobNameInput=node}
          />
        </div>

      </div>
    )
  }
}

export default RecommNav;