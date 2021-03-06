/* eslint-disable */
import React, { Component } from 'react';
import { Table } from 'antd';

const Panel = ({ name, age }) => (
  <div>
    <h1>{name}</h1>
    <h1>{age}</h1>
  </div>
);


const columns = [
  {
    key: "title",
    title: '飞天会员专属权益',
    dataIndex: 'title',
    colSpan: 3,
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 0 || index === 3) {
        obj.props.rowSpan = 3;
      }
      if (index === 1 || index === 2 || index === 4 || index === 5) {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    key: "time",
    title: 'time',
    dataIndex: 'time',
    colSpan: 0,
    render: (value, row, index) => {
      console.log('value', !value)
      const obj = {
        children: value,
        props: {},
      };
      if (!value) {
        obj.props.rowSpan = 0;
      } else if (index === 3) {
        obj.props.rowSpan = 3;
      } else {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    key: "money",
    title: 'money',
    dataIndex: 'money',
    colSpan: 0,
    render: (value, row, index) => {
      console.log('value', !value)
      const obj = {
        children: value,
        props: {},
      };
      if (!value) {
        obj.props.colSpan = 0;
      } else if (index < 3) {
        obj.props.colSpan = 2;
      } else {
        obj.props.colSpan = 1;
      }
      return obj;
    },
  },
  {
    key: "qyrz",
    title: '企业认证用户',
    dataIndex: 'qyrz',
  },
  {
    key: "xfhj",
    title: '企业认证用户\n近十二个月消费合计',
    dataIndex: 'xfhj',
  },
  {
    key: "xfhj2",
    title: '企业认证用户\n近十二个月消费合计',
    dataIndex: 'xfhj2',
  },
];

const dataSource = [
  {
    title: '产品专享权益',
    time: '',
    money: '100款+产品专享飞天会员价',
    qyrz: '√',
    xfhj: '×',
    xfhj2: '√'
  },
  {
    title: '产品专享权益',
    time: '',
    money: '专享优惠券',
    qyrz: '√',
    xfhj: '×',
    xfhj2: '√'
  },
  {
    title: '产品专享权益',
    time: '',
    money: '专享代金券',
    qyrz: '√',
    xfhj: '×',
    xfhj2: '×'
  },
  {
    title: '售前支持',
    time: '95187转1 工作日9:00-18:00',
    money: '售前商务经理 架构师',
    qyrz: '√',
    xfhj: '×',
    xfhj2: '×'
  },
  {
    title: '售前支持',
    time: '95187转1 工作日9:00-18:00',
    money: '行业顾问 技术顾问',
    qyrz: '√',
    xfhj: '×',
    xfhj2: '×'
  },
  {
    title: '售前支持',
    time: '95187转1 工作日9:00-18:00',
    money: '售前团队 1对1服务',
    qyrz: '√',
    xfhj: '×',
    xfhj2: '×'
  },
];

class HocDemo extends Component {
  constructor() {
    super();
    this.state = {
      name: 'jianding9',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <h1>hoc--- {name}</h1>
        {React.createElement(Panel, {
          name: '张三',
          age: 28,
        })}
        <br />
        <Table dataSource={dataSource} columns={columns} bordered />
      </div>
    );
  }
}

export default HocDemo;
