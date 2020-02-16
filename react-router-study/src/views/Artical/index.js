import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import ArticalDetail from  './ArticalDetail'

export default class Artical extends Component {
  render() {
    return (
      <div>
        <Link to="/artical/1?from=artical&type=read">文章一</Link>
        <Link to={{
          pathname: "/artical/2",
          state: { // state可以自定义名称
            type:'write'
          }
        }}>文章二</Link>
      </div>
    )
  }
}
