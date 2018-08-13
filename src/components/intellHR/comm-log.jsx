import React, {Component} from 'react';
import {Tooltip } from 'antd';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'actions';

export default class CommLog extends Component {
    state = {
        _selectedIndex: 0,
    }
    render(){
        const {_selectedIndex} = this.state,
         {customerdetail} = this.props,
         {username, telephone} = customerdetail;
        return (
            <div className="comm-log">
                <div className="base-slider-wrap">
                    <div className="base-slider">
                        <div className="customer-info">
                            <span className="ant-avatar  ant-avatar-icon">
                                {username ? username.slice(0, 1) : ''}
                            </span>
                            <div className="customer-detail">
                                <p className="name">{username}</p>
                                <p className="mobile">{telephone}</p>
                            </div>
                        </div>
                        <div className="intent-log">
                            <p style={{
                                fontSize: "14px",
                                color: "rgba(0,0,0,.45)"
                            }}>共2条通话记录</p>
                            <div className="follow-card-wrap">
                                <div className={`follow-card follow-card-active`}
                                >
                                    <ul>
                                        <li>
                                            <span>AI-面试预约</span>
                                            <span>通话时长：{"01分30秒"}</span>
                                        </li>
                                        <li>
                                            {"候选人接受了面试"}
                                        </li>
                                        <li>
                                            {"2018-08-03 14:32"}
                                        </li>
                                    </ul>
                                </div>
                                <div className="follow-card">
                                    <ul>
                                        <li>
                                            <span>AI-面试预约</span>
                                            <span>通话时长：{"01分30秒"}</span>
                                        </li>
                                        <li>
                                            {"候选人接受了面试"}
                                        </li>
                                        <li>
                                            {"2018-08-03 14:32"}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="base-slider-extra">
                            <div className="customer-detail-call-log">
                                <div className="call-log-header">
                                    <h5>通话记录<span className="call-log-id">id: {"256080754"}</span></h5>
                                    <div className="component-base-icon">
                                    </div>
                                </div>
                                <div className="calllog-switch">
                                    <audio controls className="call-audio" src="https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/RobotPhoneCommunicate/256080754_early_media.wav"></audio>
                                </div>
                                <div className="call-log-detail"> 
                                    <div className="conversation">
                                        <audio src="https://byrobot-prod.oss-cn-hangzhou.aliyuncs.com/RobotPhoneCommunicate/251692409_user.wav"></audio>
                                        <div className="session-wrapper">
                                            <div className="session-item">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="edit-user-level">
                                    <div className="call-log-tags">
                                        <span>通话时长45秒</span><span>对话9轮</span>
                                    </div>
                                    <div className="call-log-info">
                                        <span>任务类型：AI-求职意向沟通</span>
                                    </div>
                                    <div className="call-log-respond">
                                        <span>意向结果：候选人有求职意向</span>
                                    </div>
                                </div>
                            </div> 
            
                    </div>
                </div>
            </div>
        )
    }
}