import React, {Component} from 'react';
import {Button} from 'antd';
import IntellTopComponent from './intell-top';

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
                    <div className="boxes"></div>
                    <div className="float-button">
                        <Button type="primary" onClick= {this.resetFormResume}></Button>
                        <span>新建任务</span>
                    </div>
                </div>
            </div>
        )
    }
}