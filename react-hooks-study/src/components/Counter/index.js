import React, { Component } from 'react'
import { CounterConsumer } from '../../countStore'

export default class Counter extends Component {
  render() {
    return (
      <CounterConsumer>
      {
        (ctx) => {
          return <span>{ctx.count}</span>
        }
      }
    </CounterConsumer>
    )
  }
}
