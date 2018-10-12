import {
    SINGLECALL,
    PHONELOGINFO,
    SHOW_ROBOT_CALL_MODAL,
    HIDE_ROBOT_CALL_MODAL
} from 'constants/intellHR';

const initialState = {
    hasSingleCall: false,
    hasHisCall: false,
    phoneLogInfo: [],
    robotCallModalVisiable: false
}

export default function intellhr(state = initialState, actions){
    switch(actions.type){
        case SINGLECALL:
            return {...state, hasSingleCall: true};
        case PHONELOGINFO:
            return {...state, phoneLogInfo: actions.phoneLogInfo, hasHisCall: true};
        case SHOW_ROBOT_CALL_MODAL:
            return {...state, robotCallModalVisiable: true};
        case HIDE_ROBOT_CALL_MODAL:
            return {...state, robotCallModalVisiable: false}    
        default:
            return state;
    }
}