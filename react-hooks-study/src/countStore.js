import React, { Component, createContext } from 'react'
const { Provider, Consumer: CounterConsumer } = createContext()

class CounterProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 100
    }
  }

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

export {
  CounterProvider,
  CounterConsumer
}