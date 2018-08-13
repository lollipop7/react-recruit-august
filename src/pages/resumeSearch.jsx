import React, {Component,PropTypes} from 'react';

import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/resumeSearch/left-nav';
import BreadCrumbComponent from 'components/breadcrumb';

export default class ResumeSearchComponent extends Component {

    componentDidMount(){
        NProgress.done();
    }

    render() {
        const {location,routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content" ref="pageContent">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border wrap-box">
                        <div className="wrap-left">
                            <LeftNavComponent location={location}/>
                            <div className="resumeSearchContent">
                                {this.props.children}
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </ScrollPageContent>
        );
    }
}