import React, { Component } from 'react'
import { Button } from 'antd'
import './CounterBtn.scss'

export default class CounterBtn extends Component {
  render() {
    return (
      <Button type='primary' onClick={this.props.onClick}>
        {this.props.children}
      </Button>
    )
  }
}
