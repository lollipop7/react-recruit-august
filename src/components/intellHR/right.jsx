import React,  {Component} from 'react';
import {Button} from 'antd';

class RightPanel extends Component {
  render(){
    return(
      <div className="empty-posi"> 
        <p>暂无智能推荐中的职位</p>
        <Button type='primary'>去创建</Button>
      </div>
    )
  }
}

export default RightPanel;