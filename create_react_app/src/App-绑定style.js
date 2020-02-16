import React, { Fragment } from 'react'
import classNames from 'classnames'
import './App.css'

import { TodoHeader, TodoInput } from './components'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  UNSAFE_componentWillMount() {
    console.log(this.props)
  }

  render () {
    return (
      <Fragment>
        <TodoHeader />
        <TodoInput />
        <ol>
          <li style={{color:'red'}}>使用内联样式style</li>
          <li className="active">使用className样式</li>
          <li className={classNames('a', {'b':true, 'c':false})}>使用classnames插件动态设置类名</li>
          <li className={3>2?'active': 'unactive'}>原生动态设置类名</li>
        </ol>
      </Fragment>
    )
  }
}

