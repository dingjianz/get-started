/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

class TreeDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gData: [
        {
          blockTmplId: 25,
          name: '顶部轮播_产品详情',
          level: 2,
          child: [
            {
              blockTmplId: 23,
              name: '素材库_顶部轮播_产品详情',
              child: null,
            },
          ],
        },
        {
          blockTmplId: 29,
          name: '产品功能_产品详情',
          level: 2,
          child: [
            {
              blockTmplId: 27,
              name: '功能单元_产品功能_产品详情',
              child: null,
            },
          ],
        },
        {
          blockTmplId: 33,
          name: '产品优势_产品详情',
          level: 2,
          child: [
            {
              blockTmplId: 31,
              name: '优势单元_产品优势_产品详情',
              child: null,
            },
          ],
        },
        {
          blockTmplId: 37,
          name: '行业应用_产品详情',
          level: 2,
          child: [
            {
              blockTmplId: 35,
              name: '应用单元_行业应用_产品详情',
              child: null,
            },
          ],
        },
        {
          blockTmplId: 21,
          name: '联系方式',
          level: 2,
          child: null,
        },
      ],
    };
  }

  // 遍历子节点树，生成树节点
  traverseTree = (node) => {
    if (node && node.length) {
      return node.map((n) => (
        <TreeNode title={n.name} key={n.blockTmplId}>
          {n.child && this.traverseTree(n.child)}
        </TreeNode>
      ));
    }
  };

  onDrop = (info) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        // eslint-disable-next-line eqeqeq
        if (item.blockTmplId == key) {
          return callback(item, index, arr);
        }
        if (item.child) {
          return loop(item.child, key, callback);
        }
      });
    };

    const compareLevel = (data, key1, key2) => {
      let dragItem;
      loop(data, key1, (item) => {
        dragItem = item;
      });
      let dropItem;
      loop(data, key2, (item) => {
        dropItem = item;
      });
      return (
        dragItem &&
        dropItem &&
        dragItem.level &&
        dropItem.level &&
        dragItem.level === dropItem.level
      );
    };

    const data = [...this.state.gData];

    if (compareLevel(data, dragKey, dropKey)) {
      let dragItem;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragItem = item;
      });
      console.log('data', data);
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragItem);
      } else {
        ar.splice(i + 1, 0, dragItem);
      }
    }
    this.setState({
      gData: data,
    });
  };

  render() {
    const { gData } = this.state;

    return (
      <Tree
        className="draggable-tree"
        defaultExpandAll
        draggable
        blockNode
        showLine
        onDrop={this.onDrop}
      >
        <TreeNode title="全部" key="-1">
          {this.traverseTree(gData)}
        </TreeNode>
      </Tree>
    );
  }
}

export default TreeDemo;
