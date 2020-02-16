import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class BackHome extends Component {
  goHome = () => {
    // this.props.history.push('/home')
    this.props.history.push({
      pathname: '/home',
      state: {
        x: 1
      }
    })
  }
  render() {
    return (
      <button onClick={this.goHome}>返回首页</button>
    )
  }
}

export default withRouter(BackHome)
