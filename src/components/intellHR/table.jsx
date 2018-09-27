import React, {Component} from 'react';
import {Table, Button, Icon, Select, Input, Tooltip } from 'antd';

import columnsFinished from 'data/table-columns/intell-finished';
import columnsOngoing from 'data/table-columns/intell-ongoing';

const data = [
    {
        key: 0,
        hxr: '谢盼盼',
        dyzw: '财务总监',
        lxfs: '13612030284',
        zt: '已接听',
        thsc: '01分32秒',
        hjsj: '2018-06-29 14:42:06',
        yx: '有意向',
        cz: '已读',
        ddks: '2018-06-29 14:42:06'
    },
    {
        key: 1,
        hxr: '谢盼盼',
        dyzw: '财务总监',
        lxfs: '13612030284',
        zt: '已接听',
        thsc: '01分32秒',
        hjsj: '2018-06-29 14:42:06',
        yx: '有意向',
        cz: '已读',
        ddks: '2018-06-29 14:42:06'
    },
    {
        key: 2,
        hxr: '谢盼盼',
        dyzw: '财务总监',
        lxfs: '13612030284',
        zt: '已接听',
        thsc: '01分32秒',
        hjsj: '2018-06-29 14:42:06',
        yx: '有意向',
        cz: '已读',
        ddks: '2018-06-29 14:42:06'
    },
    {
        key: 3,
        hxr: '谢盼盼',
        dyzw: '财务总监',
        lxfs: '13612030284',
        zt: '已接听',
        thsc: '01分32秒',
        hjsj: '2018-06-29 14:42:06',
        yx: '有意向',
        cz: '已读',
        ddks: '2018-06-29 14:42:06'
    },
    {
        key: 4,
        hxr: '谢盼盼',
        dyzw: '财务总监',
        lxfs: '13612030284',
        zt: '已接听',
        thsc: '01分32秒',
        hjsj: '2018-06-29 14:42:06',
        yx: '有意向',
        cz: '已读',
        ddks: '2018-06-29 14:42:06'
    },
    {
        key: 5,
        hxr: '谢盼盼',
        dyzw: '财务总监',
        lxfs: '13612030284',
        zt: '已接听',
        thsc: '01分32秒',
        hjsj: '2018-06-29 14:42:06',
        yx: '有意向',
        cz: '已读',
        ddks: '2018-06-29 14:42:06'
    }
]

export default class TableComponent extends Component {
    constructor(props){
        super(props);

    }

    render(){
        const {type} = this.props;

        return (
            <div className="list-block">
                <div className="opts-group">
                    <Select
                        placeholder = "所有职位"
                        style={{ width: 180, height: 30 }}
                    >
                        {
                            [
                                "互联网金融",
                                "银行",
                                "证券",
                                "基金、互联网基金",
                                "保险、互联网保险",
                                "期货",
                                "信托、互联网信托",
                                "互联网支付",
                                "网络借贷",
                                "大数据征信",
                                "互联网金融资讯"
                            ].map((item, index) => {
                                return(
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    
                    { type === 1 &&
                        <div className="inline-block">
                            <Button style={{ marginLeft: 10, width: 90, height: 30 }}>
                                <Icon type="pause" /> 暂停
                            </Button>
                        </div>
                    }
                    { type === 2 &&
                        <div className="inline-block">
                            <Select
                                placeholder = "全部状态"
                                style={{ width: 122, height: 30, marginLeft: 10 }}
                            >
                                {
                                    [
                                        "全部状态",
                                        "已接通",
                                        "未接通",
                                        "空号"
                                    ].map((item, index) => {
                                        return(
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <Select
                                placeholder = "全部意向"
                                style={{ width: 122, height: 30, marginLeft: 10 }}
                            >
                                {
                                    [
                                        "全部意向",
                                        "有意向",
                                        "无意向",
                                        "意向模糊"
                                    ].map((item, index) => {
                                        return(
                                            <Option key={index} value={item}>
                                                {
                                                    item === '全部意向' ? <Tooltip>item</Tooltip>
                                                                        : item
                                                }
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    }
                    
                    <Input 
                        placeholder="搜索关键词"
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width: 260
                        }}
                        prefix={
                            <a 
                                href="javascript:;"
                            >
                                <img src="static/images/manager/search.png" alt="搜索"/>
                            </a>
                        }
                    />  
                </div>
                <Table 
                    bordered
                    columns = { type === 1 ? columnsOngoing : columnsFinished }
                    dataSource = { data }
                />
            </div>
        )
    }
}