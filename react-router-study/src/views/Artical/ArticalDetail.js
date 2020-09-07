import React, { Component } from 'react'
import qs from 'qs'
import { BackHome } from '../../components'

export default class ArticalDetail extends Component {
  render() {
    console.log(this.props)

    /* 
    query传参：
    const search = this.props.location.search.substr(1)
    console.log(qs.parse(search))
    params传参：
    const params = this.props.match.params

    隐式传参:
    to={{
          pathname: "/artical/2",
          state: { // state可以自定义名称
            type:'write'
          }
      }}
    使用state隐式传参，比如说
      【埋点】 发送数据： 
      1.ajax;
      2. img: 
         const img = new Image()
         img.src="http://www.domainame.com/button-01.gif?x=1&y=2"
      3. navigator.sendBeacon(url,data)
    */
    return (
      <div>
        文章详情---{this.props.match.params.id} ---- {this.props.location.state?.type}
        <BackHome />
      </div>
    )
  }
}
