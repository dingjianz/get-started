import React from 'react';
import { View, Text } from '@tarojs/components';

export default ({ children }) => {
  return (
    <View>
      <Text>我是{children}</Text>
    </View>
  )
}