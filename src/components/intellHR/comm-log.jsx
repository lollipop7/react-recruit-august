import React, {Component} from 'react';
import {Tooltip } from 'antd';

// lodash
import find from 'lodash/find';
import assign from 'lodash/assign';
import isEmpty from 'lodash/isEmpty';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'actions';

class CommLog extends Component {
    state = {
        selectedIndex: 0,
    }

    finish(status){
        switch(status){
            case 0 : return '已接通';
            case 6 : return '未接通';
            default : ;
        }
    }

    formatSeconds(value){
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
        return result;
    }

    handleChangeTab = (selectedIndex) => {
        this.setState({selectedIndex}, ()=>{
            // console.log(this.state.selectedIndex)
        })
    }

    render(){
        const {selectedIndex} = this.state,
         {customerdetail, phoneLogInfo} = this.props,
         {username, telephone} = customerdetail;
         const {
             mobile, name,
             callLogsList
         } = phoneLogInfo;
        const currentPhoneLog = find(callLogsList, item => {
            return item.finishStatus === 0 && item.callStatus === 2
        })
        const invitePhoneLog = find(callLogsList, item => {
            return item.finishStatus !== 0 && item.callStatus === 2
        })
        let {
            phoneLog = {},
            callInstanceId,
            duration,
            startTime
        } = currentPhoneLog;
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
                            }}>共2条通话记录</p>
                            <div className="follow-card-wrap">
                                <div className={`follow-card ${selectedIndex==0 ? 'follow-card-active' : ''}`}
                                    onClick={()=>this.handleChangeTab(0)}
                                >
                                    <ul>
                                        <li>
                                            <span>AI-面试邀约</span>
                                            <span>通话时长：{this.formatSeconds(invitePhoneLog.duration)}</span>
                                        </li>
                                        <li>
                                            {/* 已接通、未接通、空号 */}
                                            {/* 已接通:（AI-面试邀约）：候选人接受了面试、候选人拒绝了面试、候选人意向模糊  */}
                                            {this.finish(invitePhoneLog.finishStatus)}
                                        </li>
                                        <li>
                                            {invitePhoneLog.startTime}
                                        </li>
                                    </ul>
                                </div>
                                <div className={`follow-card ${selectedIndex==1 ? 'follow-card-active' : ''}`}
                                    onClick={()=>this.handleChangeTab(1)}
                                >
                                    <ul>
                                        <li>
                                            <span>AI-意向沟通</span>
                                            <span>通话时长：{this.formatSeconds(duration)}</span>
                                        </li>
                                        <li>
                                            {/* 已接通:（AI-意向沟通）：候选人有求职意向、候选人暂无求职意向、候选人意向模糊  */}
                                            {this.finish(currentPhoneLog.finishStatus)}
                                        </li>
                                        <li>
                                            {startTime}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="base-slider-extra">
                            <div className="customer-detail-call-log">
                                <div className="call-log-header">
                                    <h5>通话记录<span className="call-log-id">id: {callInstanceId}</span></h5>
                                    <div className="component-base-icon">
                                    </div>
                                </div>
                                <div className="calllog-switch">
                                    <audio controls className="call-audio" src={phoneLog.luyinOssUrl}></audio>
                                </div>
                                <div className="call-log-detail"> 
                                    <div className="conversation">
                                        <audio src={phoneLog.luyinOssUrl}></audio>
                                        <div className="session-wrapper">
                                            {
                                                phoneLog.phoneLogs.map((item, index)=>{
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
                                            {/* <div className="session-item">
                                                <div className="session-item-info session-item-left">
                                                    <span className="ant-avatar ant-avatar-image">
                                                        <img src="/static/images/intellHR/icon-AI.png"/>
                                                    </span>
                                                    <div className="ant-popover ant-popover-placement-left">
                                                        <div className="ant-popover-content">
                                                            <span>喂，您好</span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap"></div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-right">
                                                    <span className="ant-avatar ant-avatar-icon">
                                                        <i className="anticon">{username ? username.slice(0, 1) : ''}</i>
                                                    </span>
                                                    <div className="receiver ant-popover ant-popover-placement-right">
                                                        <div className="ant-popover-content">
                                                            <span>
                                                                <i className="icon-yuyin"></i>
                                                                嗯，你好，你哪里啊
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-left">
                                                    <span className="ant-avatar ant-avatar-image">
                                                        <img src="/static/images/intellHR/icon-AI.png"/>
                                                    </span>
                                                    <div className="ant-popover ant-popover-placement-left">
                                                        <div className="ant-popover-content">
                                                            <span>你好，我是金融行业的猎头顾问，请问您最近有在看新的工作机会吗？</span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap"></div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-right">
                                                    <span className="ant-avatar ant-avatar-icon">
                                                        <i className="anticon">{username ? username.slice(0, 1) : ''}</i>
                                                    </span>
                                                    <div className="receiver ant-popover ant-popover-placement-right">
                                                        <div className="ant-popover-content">
                                                            <span>
                                                                <i className="icon-yuyin"></i>
                                                                嗯，我现在没有看啊
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-left">
                                                    <span className="ant-avatar ant-avatar-image">
                                                        <img src="/static/images/intellHR/icon-AI.png"/>
                                                    </span>
                                                    <div className="ant-popover ant-popover-placement-left">
                                                        <div className="ant-popover-content">
                                                            <span>好的，稍后我们安排负责相应职位的资深顾问为您服务，您看可以吗？</span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap"></div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-right">
                                                    <span className="ant-avatar ant-avatar-icon">
                                                        <i className="anticon">{username ? username.slice(0, 1) : ''}</i>
                                                    </span>
                                                    <div className="receiver ant-popover ant-popover-placement-right">
                                                        <div className="ant-popover-content">
                                                            <span>
                                                                <i className="icon-yuyin"></i>
                                                                好的
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-left">
                                                    <span className="ant-avatar ant-avatar-image">
                                                        <img src="/static/images/intellHR/icon-AI.png"/>
                                                    </span>
                                                    <div className="ant-popover ant-popover-placement-left">
                                                        <div className="ant-popover-content">
                                                            <span>嗯那就不打搅您了，祝您工作愉快，再见</span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap"></div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-left">
                                                    <span className="ant-avatar ant-avatar-image">
                                                        <img src="/static/images/intellHR/icon-AI.png"/>
                                                    </span>
                                                    <div className="ant-popover ant-popover-placement-left">
                                                        <div className="ant-popover-content">
                                                            <span>好的，稍后我们安排负责相应职位的资深顾问为您服务，您看可以吗？</span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap"></div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-right">
                                                    <span className="ant-avatar ant-avatar-icon">
                                                        <i className="anticon">{username ? username.slice(0, 1) : ''}</i>
                                                    </span>
                                                    <div className="receiver ant-popover ant-popover-placement-right">
                                                        <div className="ant-popover-content">
                                                            <span>
                                                                <i className="icon-yuyin"></i>
                                                                好的
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="session-item">
                                                <div className="session-item-info session-item-left">
                                                    <span className="ant-avatar ant-avatar-image">
                                                        <img src="/static/images/intellHR/icon-AI.png"/>
                                                    </span>
                                                    <div className="ant-popover ant-popover-placement-left">
                                                        <div className="ant-popover-content">
                                                            <span>嗯那就不打搅您了，祝您工作愉快，再见</span>
                                                        </div>
                                                    </div>
                                                    <div className="err-wrap"></div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="edit-user-level">
                                    <div className="call-log-tags">
                                        <span>通话时长{duration}秒</span><span>对话{phoneLog.phoneLogs.length}轮</span>
                                    </div>
                                    <div className="call-log-info">
                                        <span>任务类型：AI-求职意向沟通</span>
                                    </div>
                                    {/* <div className="call-log-respond">
                                        <span>意向结果：候选人有求职意向</span>
                                    </div> */}
                                </div>
                            </div> 
            
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

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommLog)