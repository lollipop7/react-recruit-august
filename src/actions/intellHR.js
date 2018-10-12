import * as types from 'constants/intellHR';
import {AjaxByRobotPost, cancelRequestByKey} from 'utils/ajax';
import { notification } from 'antd';
// TODO: 智能机器人
// TODO: 查看通话记录

//单次外呼数据
const SINGLECALL = {type: types.SINGLECALL};
// 指定通话的详细信息
const PHONELOGINFO = {type: types.PHONELOGINFO};

const SHOW_ROBOT_CALL_MODAL = {type: types.SHOW_ROBOT_CALL_MODAL};
const HIDE_ROBOT_CALL_MODAL = {type: types.HIDE_ROBOT_CALL_MODAL};

//通过调用此接口可以通过手机号直接进行单次电话外呼，外呼结果会通过回调返回
export const triSingleCall = (data) => (dispatch, getState) => {
    AjaxByRobotPost('singleCallByMobile', data)
    .then(res=>{
        dispatch(SINGLECALL);
        notification.success({
            message: '提示',
            description: '外呼成功'
        });
    }, err=>{
        notification.error({message:err.data.returnMsg});
    });
}

// 通过此接口可以获取指定通话的详细信息 /api/robot/getPhoneLogInfoByRID
export const getPhoneLogInfoByRID = (data) => (dispatch, getState) => {
    let uri = 'getPhoneLogInfoByRID';
    cancelRequestByKey(uri);
    AjaxByRobotPost(uri, data)
    .then(res=>{
        if(res.returnCode == '900'){
            dispatch({...PHONELOGINFO, phoneLogInfo: res.returnCode})
        } else {
            dispatch({...PHONELOGINFO, phoneLogInfo: res})
        }
    }, err=>{
        notification.error({message:err.data.returnMsg});
    })
}

export const showRobotCallModal = (data) => (dispatch, getState) => {
    dispatch({...SHOW_ROBOT_CALL_MODAL})
}

export const hideRobotCallModal = (data) => (dispatch, getState) => {
    dispatch({...HIDE_ROBOT_CALL_MODAL})
}