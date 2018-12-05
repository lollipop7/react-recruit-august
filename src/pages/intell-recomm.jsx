import React, {Component} from 'react';
import each from 'lodash/each';
import pick from 'lodash/pick';

import ScrollPageContent from 'components/scroll-page-content';
import RecommNav from 'components/intellHR/recomm-nav';
import RightPanel from 'components/intellHR/right';
import BreadCrumbComponent from 'components/breadcrumb';

export default class IntellHRPage extends Component {
    componentDidMount(){
      NProgress.done();
    }
    render(){
        let routesCopy = [];
        const {location, routes} = this.props;
        each(routes,item=>{
            routesCopy.push(pick(item,['breadcrumbName','path']));
        });
        each(routesCopy,(item,index)=>{
            if(item.path === 'aiRecruit'){
                routesCopy[index].path = '/aiRecruit/intellHR';
            }
        });
        return (
            <ScrollPageContent>
              <div className="page-content">
                <BreadCrumbComponent routes={routesCopy}/>
                <div className="box-border wrap-box">
                    <div className="intell-hr"
                        style={{
                            right: 1000
                        }}
                    >
                        <RecommNav />
                        <div className="intell-right"
                            style={{
                                left: 1020,
                                width: 980,
                            }}
                        >
                        <RightPanel></RightPanel>
                        </div>
                    </div>
                </div>
              </div>
            </ScrollPageContent>
        )
    }
}
