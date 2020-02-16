import React, { Component } from 'react'
import _  from 'lodash'

const noop = () => {}
export default class TodoItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      completedText: ''
    }
  }
  
  handCheckbox = () => {
    const { onCompetedHandle = noop, index } = this.props
    onCompetedHandle(index)
  }

  static getDerivedStateFromProps(nextProps, preState) {
    /* 
      在render之前就有了， 获取不到this
      this.setState({
        completedText: nextProps.completed ? '完成' : '未完成'
      })
    */
    return {
      completedText: nextProps.completed ? '完成' : '未完成'
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // console.log(nextProps)
    // console.log(this.props) 

    // 只有修改后再重新渲染，执行render()
    // return nextProps.completed !== this.props.completed

    return !_.isEqual(nextProps, this.props)
  }
  componentDidUpdate (prevProps,prevState) {
    // console.log(prevProps)
    // console.log(this.props)
    console.log(`只有${this.props.title}render()`)
  }


  render() {
    console.log('todoitem')
    const { index, title, completed } = this.props
    return (
      <li>
        <input
        checked={completed}
        onChange={this.handCheckbox}
        type="checkbox"
        />
        {/* 
          <span>{ index + 1} ---- { title } ---- { completed ? '完成' : '未完成'}</span> 
        */}
        <span>{ index + 1} ---- { title } ---- { this.state.completedText }</span>
      </li>
    )
  }
}
