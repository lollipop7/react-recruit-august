import React, {Component} from 'react';

import ProgressComponent from './progress';

export default class IntentCommPage extends Component {

    componentDidMount(){
        NProgress.done();
     }

    resetFormResume = () => {
        console.log('清除表单内容')
    }

    

    render(){
        return (
            <div>
                <ProgressComponent/>
            </div>
        )
    }
}