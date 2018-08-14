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
            {name: '智能意向沟通', path: '/intellHR'},
            {name: '自动面试邀约', path: '/intellHR/interview-invitate'},
            {name: '历史候选人', path: '/intellHR/statis-analy'},
            {name: '设置智能HR', path: '/intellHR/toset-intellHR'},
        ] 
        ,{location} = this.props
        ,{pathname} = location;
        return (
            <div className="left-nav">
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