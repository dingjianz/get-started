import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { Button } from '@tarojs/components';
import { View, Text } from '@tarojs/components';

import './index.scss'

class Blog extends Component {
  state = {
    name: '张三'
  }
  
  componentDidMount () {
    this.setState({
      name: '王五'
    })
    // console.log('componentDidMount')
  }

  componentDidShow () {
    // console.log('componentDidShow')
  }

  componentDidHide () { // 从前台变为后台时
    // console.log('componentDidHide')
  }

  componentDidCatchError () {
    // console.log('componentDidCatchError')
  }

  shouldComponentUpdate (nextProps, nextStates) {
    // console.log('shouldComponentUpdate', nextStates.name)
    if (nextStates.name === '李四') return true;
    else return false;
  }

  trunToInDex = () => {
    Taro.navigateTo({
      url: `/index?blogTitle=blogTitle`
    })
  }

  render () {
    return (
      <View>
        <Text>我的博客{this.state.name}</Text>
        <Button type="primary" onClick={this.trunToInDex}>首页</Button>
      </View>
    )
  }
}

export default Blog;