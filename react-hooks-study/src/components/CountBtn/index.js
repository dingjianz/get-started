import React, { Component } from 'react'
import { CounterConsumer } from '../../countStore'

export default class CountBtn extends Component {
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
    )
  }
}
