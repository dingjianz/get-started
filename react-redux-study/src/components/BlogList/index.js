import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchBlogList } from  '../../store/actions/blogAction'

import BlogItem from './BlogItem'


// 容器组件（Smart/Container Components）
class BlogList extends Component {
  // 这里正常还需要对传入的数据做检测 prop-types
  componentDidMount () {
    this.props.fetchBlogList()
  }

  render() {
    const { blogList, isLoading, errMsg }  = this.props
    return (
      isLoading
      ?
      <h3>loading...</h3>
      :
      (
        errMsg
        ?
        <h1>{errMsg}</h1>
        :
        <ul>
        {
          blogList.map(item => {
            return (
              <BlogItem key={item.id} {...item}/>
            )
          })
        }
      </ul>
      )
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    blogList: state.blogReducer.list,
    isLoading: state.blogReducer.isLoading,
    errMsg: state.blogReducer.errMsg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogList: () => dispatch(fetchBlogList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)