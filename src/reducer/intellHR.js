import {
    SINGLECALL,
    PHONELOGINFO
} from 'constants/intellHR';

const initialState = {
    hasSingleCall: false,
    singleCallData: [],
    showCommLog: false,
    phoneLogInfo: []
}

export default function intellhr(state = initialState, actions){
    switch(actions.type){
        case SINGLECALL:
            return {...state, singleCallData: actions.singleCallData, hasSingleCall: true};
        case PHONELOGINFO:
            return {...state, phoneLogInfo: actions.phoneLogInfo, showCommLog: true};
        default:
            return state;
    }
}