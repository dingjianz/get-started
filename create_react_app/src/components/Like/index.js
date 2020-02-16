import React, { Component } from 'react'

export default class Lick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false
    }
  }

  handleLick = () => {
    {/* 
    
      this.state.isLiked = !this.state.isLiked 这种方式修改数据在react 里是不允许的，能修改数据，但是界面不会重新渲染

        state(状态) 更新可能是异步的

      【注意】要修改数据，就使用 setState方法， setState方法可以有两个参数
        1.1: 第一个参数又有两种情况，第一种情况是一个对象
          this.setState({
            isLiked: !this.state.isLiked
          })
        1.2: 第二种情况是一个方法
      
      
    
    */}
    this.setState((prevState, props) => {
      return  {
        isLiked: !prevState.isLiked
      }
    }, () => {
      console.log(
      '最新的state：'+ this.state.isLiked
      )
    })
  }

  render() {
    return (
      <div>
        <span onClick={this.handleLick} style={{cursor:'pointer',userSelect:'none'}}>
        { 
          this.state.isLiked ? '取消 💖' : '喜欢 🖤' 
        }
        </span>
      </div>
    )
  }
}
