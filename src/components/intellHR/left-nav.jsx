import React, {Component} from 'react';
import {Link} from 'react-router';

export default class LeftNavComponent extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {};
    }

    handleClick(item){
        const {name, path} = item
        ,{location} = this.props
        ,{pathname} = location;
        if(path === pathname) return;
        NProgress.start();
    }

    render(){
        const navData = [
            {name: '智能意向沟通', path: '/aiRecruit/intellHR'},
            {name: '自动面试邀约', path: '/aiRecruit/intellHR/interview-invitate'},
            {name: '历史候选人', path: '/aiRecruit/intellHR/statis-analy'},
            {name: '设置智能HR', path: '/aiRecruit/intellHR/toset-intellHR'},
        ] 
        ,{location} = this.props
        ,{pathname} = location;
        return (
            <div className="left-nav"
                style={{
                    paddingTop: 45,
                    left: 1100,
                    width: 100,
                }}
            >
                <ul className="nav-list">
                    {navData.map((item, index) => {
                        const {name, path} = item;
                        return (
                            <Link to={path}>
                                <li key={index}
                                    className={pathname===path ? 'active' : ''}
                                    onClick={()=>this.handleClick(item)}
                                >
                                    <img src={`static/images/intellHR/icon-${index+1}${pathname===path ? '-active' : ''}.png`}/>
                                    <p>{name}</p>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}