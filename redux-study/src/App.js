import React, { Component } from 'react'

import { CartLtist } from './components'
export default class App extends Component {
  render() {
    return (
      <div>
        <CartLtist store={this.props.store}/>
      </div>
    )
  }
}
