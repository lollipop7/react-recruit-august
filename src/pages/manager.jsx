import React, {Component} from 'react';
import { Button} from 'antd'

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';
// 左侧导航栏
import LeftNavComponent from 'components/manager/left-nav';

export default class ManagerPage extends Component {

    componentDidMount(){
        NProgress.done();
    }

    render() {
        const {location,routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content manager-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border list-block">
                        <div className="pull-left">
                            <LeftNavComponent location={location} />
                        </div>
                        <div className="pull-right">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}
