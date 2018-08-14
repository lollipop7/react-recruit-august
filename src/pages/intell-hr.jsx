import React, {Component} from 'react';
import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/intellHR/left-nav';
import BreadCrumbComponent from 'components/breadcrumb';

export default class IntellHRPage extends Component {
    componentDidMount(){
      NProgress.done();
    }
    render(){
        const {location, routes} = this.props;

        return (
            <ScrollPageContent>
              <div className="page-content">
                <BreadCrumbComponent routes={routes}/>
                <div className="box-border wrap-box">
                    <div className="intell-hr">
                        <LeftNavComponent location={location}/>
                        <div className="intell-right">
                        {this.props.children}
                        </div>
                    </div>
                </div>
              </div>
            </ScrollPageContent>
        )
    }
}
