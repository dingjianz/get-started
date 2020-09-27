import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { Button } from '@tarojs/components';
import { View, Text } from '@tarojs/components';
import Test from './test' // https://taro-docs.jd.com/taro/docs/envs 多端组件

import './index.scss'

class Blog extends Component {
  state = { }
  
  render () {
    return (
      <View>
        <Text>我的商店</Text>
        <Test />
      </View>
    )
  }
}

export default Blog;