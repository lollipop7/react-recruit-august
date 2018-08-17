import React, {Component} from 'react';
import { Button, Progress } from 'antd';

export default class ProgressComponent extends Component {

    data = [
        {count: 102, total: 300, span: '进行中'}
        ,{count: 50, total: 50, span: '已完成'}
        ,{count: 25, total: 50, span: '暂停'}
    ];

    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.state = {
            _selectedIndex : 0
        }
    }

    handleSelect = (_selectedIndex) => {
        this.setState({_selectedIndex})
    }

    handleAddTask = () => {
        console.log('新建任务不超过3个')
    }

    render(){
        const {_selectedIndex} = this.state;
        return(
            <div className="intell-top">
                <div className="boxes pull-left">
                    {this.data.map((item, index) => {
                        const percent = parseInt((item.count / item.total) * 100);
                        return (
                            <ul 
                                className={`box ${_selectedIndex == index ? 'active' : ''}`} 
                                onClick = {() => this.handleSelect(index)}
                            >
                                <li className='box-item'>
                                    <p>智能意向沟通任务1</p>
                                    <span className={item.span=='进行中' ? 'doing' : ''}>{item.span}</span>
                                </li>
                                <li className='box-item'>
                                    <div className="progress">
                                        <Progress 
                                            percent={percent} 
                                            format={percent => `${item.count}/${item.total}`}
                                            strokeWidth={4}
                                        ></Progress>
                                    </div>
                                </li>
                                <li className='box-item'>
                                    <span>创建于：2018-08-03 14:32:23</span>
                                </li>
                            </ul>
                        );    
                    })}
                </div>
                <div className="float-button"
                    onClick={this.handleAddTask}
                >
                    <Button type="primary" onClick= {this.resetFormResume}></Button>
                    <span>新建任务{3/3}</span>
                </div>
            </div>
        )
    }
}