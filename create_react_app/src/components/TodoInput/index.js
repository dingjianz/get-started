import React, { Component,  createRef } from 'react'
import ReactTypes from 'prop-types'

export default class TodoInput extends Component {
  constructor() {
    super()
    this.state = {
      iptValue:''
    }
    this.myRef = createRef() // 创建ref https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#___gatsby
  }
  static propTypes = { // class组件propTypes用法
    btnText: ReactTypes.string.isRequired,
    obj: ReactTypes.exact({
      work: ReactTypes.string.isRequired
    })
  }

  static defaultProps = {
    btnText: '添加Todo'
  }

  handelChange = (e) => { // 监听输入框变化
    let value = e.currentTarget.value
    this.setState({
      iptValue: value
    })
  }

  handelBtnClick = (id) => { // 监听添加按钮
    console.log(id)
    this.props.addTodo(this.state.iptValue)
    this.setState({
      iptValue:''
    }, () => {
      this.myRef.current.focus()
    })
  }

  handleKeyUp = (e) => { // 监听输入框enter键
    if (e.keyCode===13) {
      this.props.addTodo(this.state.iptValue)
      this.setState({
        iptValue:''
      }, () => {
        this.myRef.current.focus()
      })
    }
  }
  render() {
    const { btnText } = this.props
    return (
      <>
        <input type="text" value={this.state.iptValue} onChange={this.handelChange} onKeyUp={this.handleKeyUp} ref={this.myRef} placeholder="请输入todoList内容"/>
        {/* 
          【不推荐在jsx里使用箭头函数,进行传参】
          <button onClick={() => this.handelBtnClick(111)}>{this.props.btnText}</button>
        */}
        {/* bind 进行传参 */}
        <button onClick={this.handelBtnClick.bind(this, 111)}>{btnText}</button>
      </>
    )
  }
}
