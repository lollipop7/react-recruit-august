import React, {Component} from 'react';
import {Button , Icon, Link} from 'antd';

import trim from 'lodash/trim';
import find from 'lodash/find';

import StepsComponent from 'components/steps';
import EditableTagGroup from './tags';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class HeaderInfoComponent extends Component {

    isSetTitle = false;

    componentWillUpdate(nextProps,nextState) {
        const {resumeInfo={}} = nextProps.data;
        // 设置简历页面的标题
        if(resumeInfo.username&&!this.isSetTitle){
            document.title = `${trim(resumeInfo.username)}的个人简历`;
        }
    }

    printResume = () => {
        // this.props.handleChangeType(0);
        // 打印简历
        window.print();
    }

    mapChannelToChinese(channel) {
        switch(channel){
            case '51job':
                return '前程无忧';
            case 'zhilian':
                return '智联招聘';
            case 'unknown':
                return '其他';
        }
    }

    downloadResume = () => {
        if(this.props.isDownLoading) return ;
        NProgress.configure({className:'top0'});
        NProgress.start();
        // 下载简历
        const {data} = this.props;
        /**
         * currentPId 当前职位id
         * resumeid 简历id
         */
        const {resumeid,resumeInfo} = data;
        this.props.downloadResume({
            resumeid
        },resumeInfo.username);
    }

    getCurrentStage =()=> {
        const {stagesMap} = this.props.data;
        if(stagesMap){
            const currentStage = find(stagesMap,item=>{
                return item.iscurrentstage === '1';
            })
            return currentStage;
        }
        return {};
    }

    changeStage = () => {
        const currentStage = this.getCurrentStage();
        // stageid为7 状态流程已结束
        if(currentStage.stageid === '7') return ;
        this.props.showModal(currentStage);
    }

    // 图片onError事件
    imgOnError = event => {
        const img = event.target;
        img.src = './static/images/head.jpg';
        img.onError = null;
    }

    handleClick = () => {
        this.setState({
            width: '88px',
            borderColor: '#26ae74',
            color: '#26ae74'
        })
    }

    handleShare = () => {
        const {data} = this.props;
        const {resumeid} = data;
        this.props.showShareModal(data);
        this.props.getResumeUrl({resumeid:`${resumeid}`});
    }
    handleEvaluate = () => {
        const { evaluationId=[]} = this.props.data;
        //获取评估表内容
        if (evaluationId.length!=0 ){
            this.props.getEvaluation({evaluationId:evaluationId})
        }
        //显示评估表
        this.props.showEvaluationModal();
    }
    showBackgroundModal = () => {
        this.props.showBackgroundModal()
    }
    
    async handleRobotCall(stage){
        const 
        {data, historyEmail, triSingleCall} = this.props,
        {   
            resumeInfo={},
            resumeid,
        } = data,
        {
            username,
            telephone,
        } = resumeInfo;
        
        // "resumeid": "string,简历id",
        // "mobile": "string,手机号",
        // "userName": "string,用户名",
        // "company_id": "integer,公司id",
        // "robot_type": "integer,机器人类型；1-意向沟通机器人，2-面试邀约机器人"
        let robot_type = stage.stageid == 1 ? 1 : 2;
        console.log('打电话', robot_type)
        triSingleCall({
            resumeid : resumeid,
            robot_type: robot_type,
            mobile: '18951317287',
            userName: username,
            company_id: '11'
        })
    }

    handleReload = (stage) => {
        const {data, getPhoneLogInfoByRID , handleChangeType} = this.props,
        {resumeid} = data;
        
        new Promise(()=>{
            getPhoneLogInfoByRID({
            robot_type: 1 || 2,
            resumeid: resumeid  
            })
        }).then(()=>{
            if(stage){
                stage.stageid>1 && handleChangeType(3)
            }
        })
    }
    

    render() {
        const {data,modalVisible,currentStage,evaluation, hasSingleCall, hasHisCall } = this.props,
            {
                resumeInfo={},
                resumeid, //简历id
                currentPId='', //当前职位id
                currentPName='', // 申请职位名称
                currentPworkcity='', // 申请区域
                positions=[], // 当前简历同时申请的
                stagesMap, // 流程状态列表
                evaluationId//评估表ID
            } = data,
            {
                headimg, // 头像
                username, //姓名
                telephone, //电话
                email, //邮箱
                workyears, //工作年限
                educationbg, //学历
                channel, // 简历来源
            } = resumeInfo;
            const stage = find(stagesMap,item=>{
                return item.iscurrentstage === '1';
            })
        return (
            <div className="header-info">
                <div>
                    <div className="inline-block">
                        <img
                            src={headimg && headimg !== '' ? headimg : "./static/images/head.jpg"}
                            alt="默认头像"
                            onError={this.imgOnError}
                        />
                    </div>
                    <div className="info-right inline-block">
                        <ul>
                            <li style={{
                                overflow: 'hidden',
                                minHeight: 40
                            }}>
                                <div className="pull-left">
                                    <span>{trim(username)}</span>
                                    <span style={{
                                        marginLeft: 30,
                                        marginRight: 17
                                    }}>{telephone}</span>
                                    {email && <span>|</span>}
                                    <span style={{
                                        marginLeft: 17
                                    }}>{email}</span>
                                </div>
                                <div className="pull-right noprint">
                                    {
                                        stage!=undefined && stage.stageid>=5 &&
                                                    <Button
                                                        type="primary"
                                                        onClick={this.showBackgroundModal}
                                                    >
                                                        背调TA
                                                    </Button>
                                    }
                                    <Button type="primary" onClick={this.downloadResume}>
                                        简历下载
                                    </Button>
                                    <Button type="primary" onClick={this.printResume} >
                                        打印简历
                                    </Button>

                                    <Button className="share"
                                        onClick={this.handleShare}
                                        style={{position: "relative",top:-2}}
                                    >
                                        <img
                                            style = {{
                                                width: 40,
                                                height: 40
                                            }}
                                            src="./static/images/resume/share.jpg" alt="分享"/>
                                    </Button>
                                </div>
                            </li>
                            <li>
                                <span style={{
                                    marginRight: 6
                                }}>{workyears}</span>
                                {educationbg && <span>|</span>}
                                <span style={{
                                    marginLeft: 6
                                }}>{educationbg}</span>
                            </li>
                            <li style={{
                                marginTop: 14
                            }}>
                                简历来源 : {this.mapChannelToChinese(channel)}
                            </li>
                            <li style={{
                                marginTop: 15
                            }}>
                                申请职位 : {currentPName}
                            </li>
                            <li style={{
                                marginTop: 15
                            }}>
                                职位区域 : {currentPworkcity}
                            </li>
                        </ul>
                        {/*招聘流程*/}
                        <StepsComponent stagesMap={stagesMap} />
                    </div>
                    <div className="info-bottom">
                        <div className="table">
                            <div className="table-cell" style={{width:120,height:48,position:"relative",top:-7}} >
                                <span style={{lineHeight:"48px"}}>同时申请职位 :</span>
                            </div>
                            <div className="table-cell"
                                style={{
                                        overflow:"auto"
                                }}>
                                <ul className="inline-block"
                                    style={{
                                        listStyleType: 'none',
                                        height:"100%",
                                        overflow:"auto"
                                    }}
                                >
                                    {
                                        positions.map((item,index)=>{
                                            const {positionid,stageid,stagename} = item;
                                            return (
                                                <li key={index} className="inline-block">
                                                    &nbsp;{index+1}.{item.positionname}
                                                    (<a
                                                        href="javascript:;"
                                                        onClick={
                                                            positionid === currentPId ?
                                                            () => {} :
                                                            ()=>this.props.getStageLog({
                                                                positionId: positionid,
                                                                resumeId: resumeid
                                                            })
                                                        }
                                                        style={{
                                                            color: '#898989',
                                                            textDecoration: 'underline'
                                                        }}
                                                    >{stagename}</a>)
                                                    {index !== positions.length - 1 ? ' ;' : ''}
                                                    <span>&nbsp;&nbsp;</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className='intell-opt'>
                                {stage !== undefined && stage.stageid == 1 &&
                                    <Button 
                                        onClick={()=>this.handleRobotCall(stage)}
                                        className="watch-invitaion-button">
                                    AI意向沟通
                                    </Button>
                                }
                                {stage !== undefined && stage.stageid == 2 &&
                                    <Button 
                                        onClick={()=>this.handleRobotCall(stage)}
                                        className="watch-invitaion-button">
                                    AI面试邀约
                                    </Button>
                                } 
                                <Button className="next-btn"
                                    onClick={this.changeStage}
                                >
                                操作
                                </Button>
                                {/* <div> 
                                <img  src="./static/images/resume/right-arrow.png" alt="more"/>
                                </div> */}
                                {/* {stage !== undefined && stage.stageid < 3 && hasSingleCall &&
                                    <div className="comm-result">
                                        <span>AI邀约结果：</span>
                                        <Button 
                                            className="reload-btn"
                                            icon="reload" 
                                            onClick={()=>this.handleReload(stage)}>刷新</Button>
                                    </div>
                                } */}
                                { hasSingleCall || hasHisCall &&
                                    <div className='comm-link'
                                        onClick={()=>this.handleReload(stage)}> 
                                    查看AI沟通记录
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="table">
                            <div className="table-cell" style={{width: 50}}>
                                <span>标签 :</span>
                            </div>
                            <div className="table-cell tags">
                                <EditableTagGroup data={stagesMap}/>
                            </div>
                        </div>
                        <div className="table">
                            <div className="table-cell">
                                <span>面试评估表 :</span>
                                <Button
                                    className='assess'
                                    style={{
                                        color:((evaluationId!=undefined && evaluationId.length!=0))?'#28ad78':'#b6b6b6'
                                    }}
                                    onClick={this.handleEvaluate}
                                    disabled={stage!=undefined && stage.stageid>2?false:true}
                                >
                                        <img className="as"
                                        style={{
                                            width: 16,
                                            height: 22,
                                        }}
                                        src={
                                           (evaluationId!=undefined && evaluationId.length!=0)?"./static/images/resume/as-table.png":"./static/images/resume/as.png"}
                                            alt="面试评估表"/>
                                    {(evaluationId!=undefined && evaluationId.length!=0)?"已添加":'点此添加'}
                                </Button>
                            </div>
                            {/* <div className="table-cell">
                              <span>AI沟通结果 :</span>
                              <Button className="cele-intent-button">候选人有意向</Button>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isDownLoading: state.Resume.isDownLoading,
    currentStage : state.Resume.currentStage,
    hasSingleCall: state.IntellHR.hasSingleCall
})
const mapDispatchToProps = dispatch => ({
    downloadResume: bindActionCreators(Actions.ResumeActions.downloadResume, dispatch),
    getStageLog: bindActionCreators(Actions.ResumeActions.getStageLog, dispatch),
    showModal: bindActionCreators(Actions.ResumeActions.showModal, dispatch),
    showShareModal: bindActionCreators(Actions.ResumeActions.showShareModal, dispatch),
    showEvaluationModal: bindActionCreators(Actions.ResumeActions.showEvaluationModal, dispatch),
    getEvaluation: bindActionCreators(Actions.ResumeActions.getEvaluation, dispatch),
    getResumeUrl: bindActionCreators(Actions.ResumeActions.getResumeUrl, dispatch),
    showBackgroundModal: bindActionCreators(Actions.ResumeActions.showBackgroundModal, dispatch),
    triSingleCall: bindActionCreators(Actions.IntellHRActions.triSingleCall, dispatch),
    getPhoneLogInfoByRID: bindActionCreators(Actions.IntellHRActions.getPhoneLogInfoByRID, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderInfoComponent);
