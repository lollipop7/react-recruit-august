import React, {Component} from 'react';
import { Button, Progress } from 'antd';
import ProgressComponent from './progress';

export default class IntentCommPage extends Component {

    componentDidMount(){
        NProgress.done();
     }

    resetFormResume(){
        console.log('清除表单内容')
    }

    render(){
        return (
            <div>
                <div className="intell-top">
                    <div className="boxes pull-left">
                        <ul className='box'>
                            <li className='box-item'>
                                <p>智能意向沟通任务1</p>
                                <span>进行中</span>
                            </li>
                            <li className='box-item'>
                                <div className="progress">
                                    <Progress 
                                        percent={102} 
                                        format={percent => `${102}/300`}
                                        strokeWidth={4}
                                    ></Progress>
                                </div>
                            </li>
                            <li className='box-item'>
                                <span>创建于：2018-08-03 14:32:23</span>
                            </li>
                        </ul>
                    </div>
                    <div className="float-button">
                        <Button type="primary" onClick= {this.resetFormResume}></Button>
                        <span>新建任务</span>
                    </div>
                </div>
            </div>
        )
    }
}