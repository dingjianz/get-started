import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';

class Child extends Component {

  static defaultProps = {
    age: 26
  }
  UNSAFE_componentWillReceiveProps (nextProps) {
    // 初始化的时候不会执行！
    // 只有父组件传递给自组件的属性发生变化的时候，此钩子函数才会执行！
    // console.log('UNSAFE_componentWillReceiveProps', nextProps.age)
  }
  render () {
    return (
      <View>
        <Text>我是child组件 ---- {this.props.age}</Text>
        <View>{this.props.children}</View>
        
      </View>
    )
  }
}

export default Child;