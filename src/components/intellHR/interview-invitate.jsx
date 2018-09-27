import React, {Component} from 'react';
import { Table, Button, Menu, Dropdown, Icon } from 'antd';

import ProgressComponent from './progress';
import TableComponent from './table';

export default class InterviewInvitatePage extends Component { 

    constructor(props){
        super(props);
        
        this.state={
            isongoing: false,
            isfinished: false,
            type: 1
        }
    }

    componentDidMount(){
        NProgress.done();
     }

    resetFormResume = () => {
        console.log('清除表单内容')
    }

    
    handleTab = (type) => {
        this.setState({type})
    }

    handleMenuClick = (value) => {

    }

    render(){
        const {
            isongoing,  isfinished, type
        } = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1">编辑</Menu.Item>
              <Menu.Item key="2">删除</Menu.Item>
            </Menu>
        );
        console.log(this.props);
        return (
            <div>
                <ProgressComponent/>
                <div className="intell-tabs">
                    <ul className="table">
                        <li className={`table-cell tab-item ${type===1 ? 'active' : ''}`}
                            onClick = {() => this.handleTab(1)}
                        >进行中(4)</li>
                        <li className={`table-cell tab-item ${type===2 ? 'active' : ''}`}
                            onClick = {() => this.handleTab(2)}
                        >已完成(8)</li>
                        <li className="table-cell ctr-btns">
                            <Button style = {{ width: 118, height: 30 }} 
                                type="primary"
                            ><Icon type="plus" />新建沟通</Button>
                            <Dropdown overlay={menu}>
                                <Button style={{ marginLeft: 8, width: 94, height: 30 }}>
                                    Button <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </li>
                    </ul>
                    <div className="main-content">
                        <div className={`${type == 1 ? '' : 'none'}`}>
                            <TableComponent type={1}></TableComponent>
                        </div>
                        <div className={`${type == 2 ? '' : 'none'}`}>
                            <TableComponent  type={2}></TableComponent>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}