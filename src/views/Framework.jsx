import React, {Component} from 'react';
import NavBarComponents from 'components/navbar';

export default class  extends Component {
    
    render() {
        const {location} = this.props,
            pathname = location.pathname,
            patternLogin = /\/login/i, // 匹配login路径
            patternResume = /(\/resumeInfo)/i; // 匹配 /resumeInfo/:resumeId/:logId
        const patternShowResume = /\/showResume/i;  //简历分享
        const patternEvaluation = /\/evaluation/i;  //面试评估表
        const patternCaseView =  /\/CaseView/i; //背调
        const patternResumeDetail = /\/resumeDetail/i;  //简历详情
        return (
            <div>
                {!patternLogin.test(pathname) && !patternResume.test(pathname) && !patternShowResume.test(pathname) && !patternEvaluation.test(pathname) && !patternCaseView.test(pathname) && !patternResumeDetail.test(pathname) && <NavBarComponents location={location} />}
                {this.props.children}
            </div>
        );
    }
}