// createContext是react 提供的用于跨组件传值的方法

import React, { Component, Fragment, createContext } from 'react'
import { render } from 'react-dom'
const { 
  Provider,
  Consumer: CounterConsumer // 解构出来 Consumer 赋值给 CounterConsumer的组件， 相当于 Consumer重命名为CounterConsumer
  }  = createContext()

// createContext 这个方法的结果是一个对象，里面有 Provider、Consumer、contextType、displayName 四个组件
// Provider：用于提供状态
// Consumer：用于接收状态


// 手动封装一个基本的 Provider，因为直接使用 Provider，不方便管理状态
class CounterProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { // 这里的状态是共享的 任何被CounterProvider包裹的后代组件都可以通过CounterConsumer来接收这个值
      count: 100
    }
  }

  // 这些实例方法也是被共享的，和state一样
  decrementCount = () => {
    this.setState((preState, props) => {
      return  {
        count: --preState.count
      }
    })
  }
  incrementCount = () => {
    this.setState((preState, props) => {
      return  {
        count: ++preState.count
      }
    })
  }
  render() {
    return (
      // 使用 Provider这个组件，它必须要有一个value 值，这个value可以传递任何的数据，一般还是传递一个对象比较合理
      <Provider value={{
        count:this.state.count,
        onDecrementCount: this.decrementCount,
        onIncrementCount: this.incrementCount
      }}>
        {this.props.children}
      </Provider>
    )
  }
}
// 定义一个Counter组件
class Counter extends Component {
  render() {
    return (
      // 使用 CounterConsumer来接收count
      <CounterConsumer>
        { // 注意！ 注意！ 注意！ CounterConsumer 的 children必须是一个方法 ，这个方法有一个参数，这个参数就是 Provider 提供的 value
          (ctx) => {
            return <span>{ctx.count}</span>
          }
        }
      </CounterConsumer>
    );
  }
}

class CountBtn extends Component {
  render() {
    return (
      <CounterConsumer>
        {
          ({ onDecrementCount, onIncrementCount }) => {

            const handlerClick = this.props.type === 'decrement' ? onDecrementCount : onIncrementCount

            return <button onClick={handlerClick}>{this.props.children}</button>
          }
        }
      </CounterConsumer>
    );
  }
}


class App extends Component {
  render() {
    return (
      <Fragment>
        <CountBtn type="decrement">-</CountBtn>
        <Counter />
        <CountBtn type="increment">+</CountBtn>
      </Fragment>
    );
  }
}



// import App from './App'

render(
  <CounterProvider>
    <App />
  </CounterProvider>
  ,document.getElementById('root'))