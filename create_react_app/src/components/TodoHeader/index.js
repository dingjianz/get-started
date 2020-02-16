import React, { Fragment } from 'react'
import ReactTypes from 'prop-types'

export default function TodoHeader (props) {
  {/*
    const { testFn } = props
    testFn()
  */}
  return (
    <Fragment>
      {props.children}
      {/*
        <h3>{props.subTitle}</h3>
        <p>{props.x + props.y}</p>
      */}
    </Fragment>
  )
}

// 无状态组件or函数组件 propTypes 、 defaultProps用法
TodoHeader.propTypes = {
  x: ReactTypes.number.isRequired
}
TodoHeader.defaultProps = {
  subTitle: '我是默认subTitle'
}