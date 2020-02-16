/**
  react-loadable 实现原理
 */

import React, { Component } from 'react'

const selfLoadable =  ({
  loader,
  loading: Loading // 组件要大写，所以解构赋值成Loading
}) => {
  return class LoadableComponent extends Component {
    state = {
      LoadedComponent: null
    }

    componentDidMount () {
      // import('./Dashboard) import()执行以后是一个Promise对象
      loader()
        .then(res => {
          this.setState({
            LoadedComponent: res.default
          })
        })
    }

    render () {
      const { LoadedComponent } = this.state
      return(
        LoadedComponent
        ?
        <LoadedComponent />
        :
        <Loading />
      )
    }
  }
}

export default selfLoadable