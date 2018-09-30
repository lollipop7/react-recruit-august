import {
    SINGLECALL,
    PHONELOGINFO
} from 'constants/intellHR';

const initialState = {
    hasSingleCall: false,
    singleCallData: [],
    isShowCommLog: false,
    phoneLogInfo: []
}

export default function intellhr(state = initialState, actions){
    switch(actions.type){
        case SINGLECALL:
            return {...state, singleCallData: actions.singleCallData, hasSingleCall: true};
        case PHONELOGINFO:
            return {...state, phoneLogInfo: actions.phoneLogInfo, isShowCommLog: true};
        default:
            return state;
    }
}