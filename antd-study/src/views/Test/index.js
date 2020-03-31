import React, { Component } from 'react'
import { Tree } from 'antd'
const { TreeNode } = Tree
import './index.scss'

class Test extends Component {

  constructor (props) {
    super(props)
    this.state = {
      ulTop: [],
      n: 0,
      fatherDom: null,
      dragIndex: 0,

      list: [
        {id: '1', name: 'AI大学', children: []},
        {
          id: '2',
          name: '精选课程', 
          children: [
            {id: '2-1', name: '机器翻译'},
            {id: '2-2', name: '语音测评'},
            {id: '2-3', name: 'AIUI'},
            {id: '2-4', name: 'Python'},
            {id: '2-5', name: '最新课程'}
          ]
        },
        {
          id: '3',
          name: '个人中心',
          children: [
            {id: '3-1', name: '每日签到'},
            {id: '3-2', name: '我的直播'}
          ]
        }
      ]
    }
  }

  componentDidMount () {
    this.getUlTop()
  }

  getUlTop = () => {
    let ulsDom = [...document.getElementsByClassName('drag-ul')]
    let ulTop = []
    let newList = []
    ulsDom.forEach((item, index) => {
      newList = [...newList, this.state.list[Number(item.dataset.index)]]
      ulTop.push(this.getElementToPageTop(item))
    })
    console.log({
      newList
    })
    this.setState({ 
      list: newList,
      ulTop,
      fatherDom: document.getElementsByClassName('ul-wrap')[0]
    }, () => {
      // console.log(this.children(this.state.fatherDom))
      // console.log(this.state.ulTop)
      console.log(this.state.list)
    })
  }
  
  getElementToPageTop = (el) => {
    return el.offsetTop
  }

  selectActiveIndex = (arr, num) => { // 确定选中的tabs
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > num) {
        return i - 1
      }
    }
  }

  dragstartHandler = (e, index) => {
    this.setState({ dragIndex: index })
    console.log("dragStart")
    e.target.setAttribute('id', 'test1')
    e.dataTransfer.setData("text/plain", e.target.id)
  }
  dragoverHandler = (ev) => {
    ev.preventDefault()
    let clientY = ev.clientY
    const n = this.selectActiveIndex(this.state.ulTop, clientY)
    console.log({
      clientY,
      ulTop: this.state.ulTop,
      n
    })
    this.setState({ n })
  }

  dropHandler = (ev) => {
    const { fatherDom, n, ulTop, dragIndex } = this.state
    // console.log(this.children(fatherDom))
    console.log("Drop")
    ev.preventDefault()
    let data = ev.dataTransfer.getData("text")
    let nodes = document.getElementById(data)
    if(!n && n !== 0) {
      fatherDom.appendChild(nodes)
    } else {
      console.log({
        dragIndex
      })
      let flagIndex = n
      if (dragIndex===0)  {
        ++flagIndex
      }
      console.log({
        flagIndex
      })
      fatherDom.insertBefore(nodes, this.children(fatherDom)[flagIndex])
    }
    nodes.removeAttribute('id')
    ev.dataTransfer.clearData()
    this.getUlTop()
  }

children = (node) => {
    let tmp = node.childNodes
    let arr = []
    tmp.forEach(function (item) {
      if (item.nodeType == 1) {
        arr.push(item)
      }
    })
    return arr
  }

  render() {
    return (
      <div>
        <ul className="ul-wrap" onDrop={this.dropHandler} onDragOver={this.dragoverHandler}>
          {
            this.state.list.map((item, index) => {
              return (<ul className="drag-ul" draggable="true" onDragStart={(e) => this.dragstartHandler(e, index)} key={index} data-index={index}>
                <li id="li-1-1" onDragStart={this.drag} >{item.name}</li>
                <ul>
                  {
                    item.children.map((it, m) => {
                      return (
                        <li key={`${index}-${m}`} data-index={`${index}-${m}`}>{it.name}</li>
                      )
                    })
                  }
                </ul>
              </ul>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default Test


{/* 
  <ul className="drag-ul" draggable="true" onDragStart={(e) => this.dragstartHandler(e, 0)}>
            <li id="li-1-1" onDragStart={this.drag}>AI大学</li>
            <ul id="ul-1-1" onDragStart={this.drag}></ul>
          </ul>
          <ul className="drag-ul"  draggable="true" onDragStart={(e) => this.dragstartHandler(e, 1)}>
            <li id="li-2-1" onDragStart={this.drag}>精选课程</li>
            <ul id="ul-2-1">
              <li id="li-2-2" onDragStart={this.drag}>机器翻译</li>
              <li id="li-2-3">语音测评</li>
              <li id="li-2-4">AIUI</li>
              <li id="li-2-5">Python</li>
              <li id="li-2-6">最新课程</li>
            </ul>
          </ul>
          <ul className="drag-ul" draggable="true" onDragStart={(e) => this.dragstartHandler(e, 2)}>
            <li id="li-3-1">个人中心</li>
            <ul id="ul-3-1">
              <li id="li-3-1">每日签到</li>
              <li id="li-3-2">我的直播</li>
            </ul>
          </ul>
*/}