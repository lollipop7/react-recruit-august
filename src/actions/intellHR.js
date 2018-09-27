import * as types from 'constants/intellHR';
import {AjaxByRobotPost, cancelRequestByKey} from 'utils/ajax';
// TODO: 智能机器人
// TODO: 查看通话记录

//单次外呼数据
const SINGLECALL = {type: types.SINGLECALL};
// 指定通话的详细信息
const PHONELOGINFO = {type: types.PHONELOGINFO};

//通过调用此接口可以通过手机号直接进行单次电话外呼，外呼结果会通过回调返回
export const triSingleCall = (data) => (dispatch, getState) => {
    AjaxByRobotPost('singleCallByMobile', data)
    .then(res=>{
        dispatch({...SINGLECALL, singleCallData: res})
    }, err=>{
    });
}

// 通过此接口可以获取指定通话的详细信息 /api/robot/getPhoneLogInfoByRID
export const getPhoneLogInfoByRID = (data) => (dispatch, getState) => {
    AjaxByRobotPost('getPhoneLogInfoByRID', data)
    .then(res=>{
        dispatch({...PHONELOGINFO, phoneLogInfo: res})
    }, err=>{
        console.log(err)
    })
}