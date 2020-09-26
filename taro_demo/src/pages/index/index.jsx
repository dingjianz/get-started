import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import Child from './child';

// 路由跳转：navigateTo redirectTo switchTab navigateBack relaunch getCurrentPages 获取页面信息

import './index.scss'

export default () => {
  const [ name, setName ] = useState('jianding9')

  const turnToUrl = (url) => {
    Taro.navigateTo({
      url: `/pages/${url}/index`
    })
  }

  return (
    <View className='index'>
      <Text>Hello world! ---- { name }</Text>
      <Button onClick={() => setName('huihan3')}>点击</Button>
      <Child>{name}</Child>
      <Button onClick={() => turnToUrl('blog')}>点击</Button>
    </View>
  )
}
