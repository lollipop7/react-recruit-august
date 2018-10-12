import React, {Component} from 'react';
import {Modal} from 'antd';

// redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'actions'; 

class RobotCallModal extends Component {
  constructor(props){
    super(props)
  }

  async handleRobotCall(){
    const {username, telephone, triSingleCall, staged, resumeid, hideRobotCallModal} = this.props;
    // "resumeid": "string,简历id",
    // "mobile": "string,手机号",
    // "userName": "string,用户名",
    // "company_id": "integer,公司id",
    // "robot_type": "integer,机器人类型；1-意向沟通机器人，2-面试邀约机器人"
    let robot_type = staged.stageid == 1 ? 1 : 2;
    new Promise(resolve => {
      triSingleCall({
        resumeid : resumeid,
        robot_type: robot_type,
        mobile: telephone,
        userName: username,
        company_id: '11'
      })
    })
    .then(hideRobotCallModal())
    .catch(hideRobotCallModal())
  }

  render(){
    const {hideRobotCallModal,triSingleCall, robotCallModalVisiable, staged} = this.props;
    let stageTitle = '';
    if(staged !== undefined){
      stageTitle = staged.stageid == 1 ? '意向沟通' : '面试邀约';
    }
    return(
      <Modal
          title={`确认${stageTitle}`}
          visible = {robotCallModalVisiable}
          className = "grey-close-header"
          onCancel = {hideRobotCallModal}
          width = {510}
          onOk = {this.handleRobotCall.bind(this)}
          maskClosable = {false}
      >
        <h1>
          确认将以上1人加入AI-智能{stageTitle}？
        </h1>
        <p>将会获候选人取联系方式。</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  robotCallModalVisiable: state.IntellHR.robotCallModalVisiable
})

const mapDispatchToProps = dispatch => ({
  hideRobotCallModal: bindActionCreators(Actions.IntellHRActions.hideRobotCallModal, dispatch),
  triSingleCall: bindActionCreators(Actions.IntellHRActions.triSingleCall, dispatch),
})

RobotCallModal = connect(mapStateToProps, mapDispatchToProps)(RobotCallModal);
export default RobotCallModal