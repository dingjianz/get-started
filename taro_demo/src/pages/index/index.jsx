import React, { Component } from 'react';
import Taro, { Current } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import Child from './child';

import logoUrl from '../../assets/img/avatar.jpg';

// 路由跳转：navigateTo redirectTo switchTab navigateBack relaunch getCurrentPages 获取页面信息 getCurrentInstance

import './index.scss'


class Index extends Component {
  state = {
    name: '张三',
    age: 18,
    blogTitle: '博客title'
  }

  componentDidMount () {
    this.setState({
      name: "王五",
      age: 30,
      blogTitle: Current?.router?.params?.blogTitle ?? 'hahahah'
    })

    // console.log(Taro.getCurrentPages()?.[0]?.options?.blogTitle ?? 'hahahah')
    console.log(Taro.getCurrentInstance()?.router?.params?.blogTitle ?? 'hahahah')
    console.log(Current)
    console.log(Current?.router?.params?.blogTitle)

    // 自：Taro.getCurrentInstance() 和 current返回的一模一样
  }

  componentDidShow () {
    // 每次都执行
    // console.log('componentDidShow')
  }

  turnToUrl = (url) => {
    Taro.navigateTo({
      url: `/${url}`
    })
  }

  handleClick = () => {
    // 阻止事件冒泡
    // event.stopPropagation();

    console.log(process.env.NODE_ENV)
    console.log(process.env.TARO_ENV)
  }

  render () {
    const { name, age, blogTitle } = this.state;
    return (
      <View className='index'>
        <Text>Hello world! ---- { name }</Text>
        <Child age={age}>{name}</Child>
        <Text>{blogTitle}</Text>
        <Button onClick={() => this.turnToUrl('blog')}>我的博客</Button>
        <Button onClick={this.handleClick}>点击</Button>
        <Image className="img" src={logoUrl} onLoad={() => console.log('23333333333')} />
      </View>
    )
  }
}

export default Index;