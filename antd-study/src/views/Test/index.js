import React, { Component } from 'react'
import './index.scss'

import { Tree, Icon } from 'antd'
const { TreeNode } = Tree


class Test extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gData: [
        {key: '1', title: 'AI大学', children: []},
        {
          key: '2',
          title: '精选课程', 
          children: [
            {key: '2-1', title: '机器翻译'},
            {key: '2-2', title: '语音测评'},
            {key: '2-3', title: 'AIUI'},
            {key: '2-4', title: 'Python'},
            {key: '2-5', title: '最新课程'}
          ]
        },
        {
          key: '3',
          title: '个人中心',
          children: [
            {key: '3-1', title: '每日签到'},
            {key: '3-2', title: '我的直播'}
          ]
        }
      ],
      rightClickNodeTreeItem: {
        pageX: "",
        pageY: "",
        id: "",
        categoryName: ""
      }
    }
  }

  componentDidMount () {
  }

  onDrop = info => {
    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey
    let fromNode = dragKey.split('-')
    let toNode = dropKey.split('-')
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
    console.log({
      fromNode,
      toNode,
      dropPos,
      dropPosition
    })
    let fLen = fromNode.length
    let tLen = toNode.length
    if (fLen===2&&tLen===2&&fromNode[0]!==toNode[0]) return false
    if (fLen===1&&tLen===1&&dropPosition===1) return false
    if (fLen!==tLen) return false
    if (dropPosition === 0) return false
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr)
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      })
    }
    const data = [...this.state.gData]
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    });

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        item.children.push(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 && info.node.props.expanded && dropPosition === 1
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        item.children.unshift(dragObj)
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    this.setState({
      gData: data
    })
  }

  render() {
    const loop = data =>
      data.map(item => {
        if (item.children) {
          return (
            <TreeNode 
              key={item.key}
              title={
                <div>
                  <span>{item.title}</span>
                  <span>
                    <Icon type="plus" />
                    <Icon type="edit" />
                    <Icon type="delete" />
                  </span>
                </div>
              }
            >
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode
          title={<div>
            <span>{item.title}</span>
            <span>
              <Icon type="edit" />
              <Icon type="delete" />
            </span>
          </div>}
          key={item.key}  
        />
      })
    return (
      <Tree
        className="draggable-tree"
        draggable
        defaultExpandAll
        blockNode
        onDrop={this.onDrop}
      >
        {loop(this.state.gData)}
      </Tree>
    );
  }
}

export default Test