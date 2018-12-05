import React, {Component} from 'react';
import {Tooltip, notification } from 'antd';

// lodash
import filter from 'lodash/filter';
import assign from 'lodash/assign';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'actions';

class CommLog extends Component {
    state = {
        _selectedIndex: 0,
        rightPhoneLog: []
    }

    // 使用Promise封装setState
    setStateAsync(state){
        return new Promise((resolve)=>{
            this.setState(state, resolve)
        })
    }

    finish = (status) => {
        switch(status){
            case 0 : 
                return '已接通';
            case 6 : 
                return '未接通';
            default : ;
        }
    }

    formatSeconds = (value) =>{
        let secondTime = parseInt(value);// 秒
        let minuteTime = 0;// 分
        let hourTime = 0;// 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        let result = "" + parseInt(secondTime) + "秒";

        if(minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "分" + result;
        }
        if(hourTime > 0) {
            result = "" + parseInt(hourTime) + "小时" + result;
        }
        //把result的值放在state里让后拿去展示，上面的也一样
        return result;
    }

    handleChangeTab = (_selectedIndex, item) => {
        this.setStateAsync({
            _selectedIndex
        })
        this.setStateAsync({
            rightPhoneLog: [item]
        })
       
    }

    render(){
        const {_selectedIndex, rightPhoneLog} = this.state,
         {customerdetail, phoneLogInfo, staged} = this.props,
         {username, telephone} = customerdetail;
         const {
             mobile, name,
             callLogsList
         } = phoneLogInfo;
         let currentPhoneLogs = filter(callLogsList, item => {
            return item.callStatus === 2
        })
        rightPhoneLog[0] = currentPhoneLogs[_selectedIndex];
        rightPhoneLog[0].finishStatus = this.finish(currentPhoneLogs[_selectedIndex].finishStatus);
        return (
            <div className="comm-log">
                <div className="base-slider-wrap">
                    <div className="base-slider">
                        <div className="customer-info">
                            <span className="ant-avatar  ant-avatar-icon">
                                {name ? name.slice(0, 1) : ''}
                            </span>
                            <div className="customer-detail">
                                <p className="name">{name}</p>
                                <p className="mobile">{mobile}</p>
                            </div>
                        </div>
                        <div className="intent-log">
                            <p style={{
                                fontSize: "14px",
                                color: "rgba(0,0,0,.45)"
                            }}>共{currentPhoneLogs.length}条通话记录</p>
                            <div className="follow-card-wrap">
                                { 
                                    currentPhoneLogs.map((item, index) => {
                                        const duration = this.formatSeconds(item.duration);
                                        const finishStatus = this.finish(item.finishStatus);
                                        const startTime = item.startTime;
                                        return (
                                            <div 
                                                className={`follow-card ${index == _selectedIndex?  'follow-card-active' : ''}`} 
                                                key={index}
                                                onClick={()=>this.handleChangeTab(index, item)}
                                            >
                                                <ul>
                                                    <li>
                                                        <span>AI-{item.robotType == 1 ? '意向沟通' : '面试邀约'}</span>
                                                        <span>通话时长：{duration}</span>
                                                    </li>
                                                    <li>
                                                        {finishStatus} - {item.callResult}
                                                    </li>
                                                    <li>
                                                        {startTime}
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="base-slider-extra">
                        {
                            <div className="customer-detail-call-log">
                                <div className="call-log-header">
                                    <h5>通话记录<span className="call-log-id">id: {rightPhoneLog[0].callInstanceId}</span></h5>
                                    <div className="component-base-icon"></div>
                                </div>
                                <div className="calllog-switch">
                                    <audio controls className="call-audio" src={rightPhoneLog[0].phoneLog.luyinOssUrl}></audio>
                                </div>
                                <div className="call-log-detail"> 
                                    <div className="conversation">
                                        <audio src={rightPhoneLog[0].phoneLog.luyinOssUrl}></audio>
                                        <div className="session-wrapper">
                                            {
                                                rightPhoneLog[0].phoneLog.phoneLogs.map((item, index)=>{
                                                    if(item.speaker == 'AI'){
                                                        return (
                                                            <div className="session-item" key={index}>
                                                                <div className="session-item-info session-item-left">
                                                                    <span className="ant-avatar ant-avatar-image">
                                                                        <img src="/static/images/intellHR/icon-AI.png"/>
                                                                    </span>
                                                                    <div className="ant-popover ant-popover-placement-left">
                                                                        <div className="ant-popover-content">
                                                                            <span>{item.content}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="err-wrap"></div>
                                                                </div>
                                                            </div>
                                                        )
                                                        
                                                    } else if (item.speaker == 'ME'){
                                                        return (
                                                            <div className="session-item" key={index}>
                                                                <div className="session-item-info session-item-right">
                                                                    <span className="ant-avatar ant-avatar-icon">
                                                                        <i className="anticon">{name ? name.slice(0, 1) : ''}</i>
                                                                    </span>
                                                                    <div className="receiver ant-popover ant-popover-placement-right">
                                                                        <div className="ant-popover-content">
                                                                            <span>
                                                                                <i className="icon-yuyin"></i>
                                                                                {item.content}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="err-wrap">
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="edit-user-level">
                                    <div className="call-log-tags">
                                        <span>通话时长{rightPhoneLog[0].duration}秒</span><span>对话{rightPhoneLog[0].phoneLog.phoneLogs.length}轮</span>
                                    </div>
                                    <div className="call-log-info">
                                        <span>任务类型：AI-{rightPhoneLog[0].robotType == 1 ? '意向沟通' : '面试邀约'}</span>
                                    </div>
                                    <div className="call-log-respond">
                                        <span>意向结果：{rightPhoneLog[0].finishStatus}-{rightPhoneLog[0].callResult}</span>
                                    </div>
                                </div>
                            </div> 
                        }    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    phoneLogInfo: state.IntellHR.phoneLogInfo,
    
})

const mapDispatchToProps = dispatch => ({
    getPhoneLogInfoByRID: bindActionCreators(Actions.IntellHRActions.getPhoneLogInfoByRID, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommLog)