import React, { Fragment } from 'react'
import './App.css'

import { TodoHeader, TodoInput, TodoList, Like } from './components'

/* 
如果想要全局的扩展React.Component，比如，想把ajax的方法全局挂载到组件的this上，就可以使用下面的方式
  import * as services from './services'
  React.Component.prototype.http = services
在prototype上挂在一个叫http的东西，然后就可以在组件内部，通过this.http.xxx 执行一些操作
*/

import { getTodos } from './services'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      props : {
        name: 'dj',
        age:18
      },
      obj: {
        work: 'engineer'
      },
      htmlText: `<span style={{color:'red'}}>字符串强制转成html</span> `,
      list: [],
      isLoading: false
    }
  }

  testFn = () => {
    console.log('我是测试函数')
  }

  onCompetedHandle = (checkIndex) => {
    this.setState((preState, props) => {
    return {
      list: preState.list.map((todo, index) => {
        if (checkIndex===index) {
          todo.completed = !todo.completed
        }
        return todo
      })
    }
  })
  }

  addTodo = (todoTitle) => {
    this.setState((preState, props) => {
        {/* 
          push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。 使用 扩展运算符 或者 concat

          let newList = preState.list.push({
            id:Math.random(),
            title:todoTitle,
            completed: false
          })
        */}
      return {
        list: [...preState.list, {
          id:Math.random(),
          title:todoTitle,
          completed: false
        }]
      }
    })
  }

  getData () { // 获取数据
    this.setState({
      isLoading: true
    })
    getTodos().then(res => {
      if (res.status===200) {
        this.setState({
          list: res.data
        })
      } else {
        console.log('处理错误')
      }
    }).catch(err => {
      throw err
    }).finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) { // 和 UNSAFE_componentWillReceiveProps 互斥，若两者皆有，默认只执行 getDerivedStateFromProps
    return null
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    const { list, obj, htmlText, isLoading } = this.state
    return (
      <Fragment>
        <TodoHeader subTitle="今日事今日毕" x={1} y={2} c="3" d="4" testFn={this.testFn} {...this.state.props}>
          <h1>待办事项列表：</h1>
        </TodoHeader>
        <TodoInput btnText="ADD" obj={obj} addTodo={this.addTodo}></TodoInput>
        {
          isLoading ? <div style={{color:'red', fontSize:'20px'}}>正在加载中...</div> : <TodoList todos={list} onCompetedHandle={this.onCompetedHandle} />
        }
        <Like/>
        {/* <div dangerouslySetInnerHTML={{__html:htmlText}} /> */}
      </Fragment>
    )
  }
}

