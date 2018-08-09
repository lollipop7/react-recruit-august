import React, {Component} from 'react';
import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/resumeSearch/left-nav';
import BreadCrumbComponent from 'components/breadcrumb';

export default class IntellHRPage extends Component {
    componentDidMount(){
      NProgress.done();
    }
    render(){
        console.log(this.props);
        const {location, routes} = this.props,
        {pathname} = location,
        patternIntellHR = /\/intellHR/i;
        return (
            <ScrollPageContent>
              <div className="page-content intell-hr">
                <BreadCrumbComponent routes={routes}/>
                <div className="box-border list-block">
                    <div className="pull-left">
                       {patternIntellHR.test(pathname)&&<LeftNavComponent location={location}/>} 
                    </div>
                    <div className="pull-right">
                        {this.props.children}

                    </div>
                </div>
              </div>
            </ScrollPageContent>
        )
    }
}
