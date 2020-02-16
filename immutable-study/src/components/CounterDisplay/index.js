import React, { Component } from 'react'
import { connect } from 'react-redux'


class CounterDisplay extends Component {
  render() {
    return (
      <div>
        {this.props.count}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.getIn(['todoReducer', 'count'])
  }
}

export default connect(mapStateToProps)(CounterDisplay)