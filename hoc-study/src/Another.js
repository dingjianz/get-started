import React, { Component } from 'react'
import WithCopyHOC from './WithCopyHOC'

@WithCopyHOC
class Another extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        Another组件 ---- {this.props.title}
      </div>
    )
  }
}

export default Another // export default WithCopyHOC(Another)
