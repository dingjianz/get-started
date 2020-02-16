import React, { Component, Fragment } from 'react'
import { Counter, CountBtn } from './components'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <CountBtn type="decrement">-</CountBtn>
        <Counter />
        <CountBtn type="increment">+</CountBtn>
      </Fragment>
    )
  }
}
