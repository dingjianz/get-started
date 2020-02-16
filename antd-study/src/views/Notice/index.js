import React, { Component } from 'react'
import { Card, Button, List, Avatar, Badge, Spin } from 'antd'
import { connect } from 'react-redux'
import { noticeRead } from '../../store/actions/noticeAction'

import logoImg from '../../assets/images/avatar.png'

const mapStateToProps = state => {
  const { list, isLoading } = state.noticeReducer
  return {
    list,
    isLoading
  }
}

@connect(mapStateToProps, { noticeRead })
class Notice extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <Spin spinning={this.props.isLoading}>
        <Card
          title='消息中心'
          bordered={false}
          extra={
            <Button
              disabled={this.props.list.every(item => item.hasRead === true)}
              onClick={this.props.noticeRead.bind(this,-1, 'allRead')}
            >标记为全部已读</Button>}
        >
        <List
        itemLayout="horizontal"
        dataSource={this.props.list}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        renderItem={item => (
          <List.Item
            extra={item.hasRead ? null : <Button onClick={this.props.noticeRead.bind(this, item.id)}>标记为已读</Button>}
          >
            <List.Item.Meta
              avatar={<Avatar src={logoImg} />}
              title={
                <Badge dot={!item.hasRead}>
                  <span>{item.title}</span>
                </Badge>
              }
              description={item.desc}
            />
          </List.Item>
        )}
      />
        </Card>
      </Spin>
    )
  }
}

export default Notice
