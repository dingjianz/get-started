/* eslint-disable */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import RightContent from './RightContent';
import styled from 'styled-components';

import './index.scss';

/* 
  allowAnyClick: boolean // 默认false，设为true非左键可实现点击拖拽
  axis: string // 'x'：x轴方向拖拽、'y'：y轴方向拖拽、'none'：禁止拖拽
  bounds: { left: number, top: number, right: number, bottom: number } | string 
    // 限定移动的边界，接受值：
    //（1）'parent':在移动元素的offsetParent范围内
    //（2）一个选择器，在指定的Dom节点内
    //（3）{ left: number, top: number, right: number, bottom: number }对象，限定每个方向可以移动的距离
  cancel：制定给一个选择器组织drag初始化，例如'.body'
  defaultClassName：string // 拖拽ui类名，默认'react-draggable'
  drfaultClassNameDragging：string // 正在拖拽ui类名，默认'eact-draggable-dragging'
  defaultClassNameDragged：string //拖拽后的类名，默认'react-draggable-dragged'
  defaultPosition：{ x: number, y: number } // 起始x和y的位置
  disabled：boolean // true禁止拖拽任何元素
  grid：[number, number] // 正在拖拽的网格范围
  handle：string // 初始拖拽的的选择器'.handle'
  offsetParent：HTMLElement // 拖拽的offsetParent
  onMouseDown: (e: MouseEvent) => void // 鼠标按下的回调
  onStart: DraggableEventHandler // 开始拖拽的回调
  onDrag：DraggableEventHandler // 拖拽时的回调
  onStop：DraggableEventHandler // 拖拽结束的回调
  position: {x: number, y: number} // 控制元素的位置
  positionOffset: {x: number | string, y: number | string} // 相对于起始位置的偏移
  scale：number // 定义拖拽元素的缩放
*/

// 容器
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`;

// 左边内容部分
const LeftContent = styled.div`
  position: relative;
  width: ${(props) => props.width}px;
  height: 100vh;
  padding: 20px;
  background-color: #e6e6fa;
  overflow: hidden;
  flex-grow: 1;
`;

// 拖拽部分
const DraggableBox = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: 0;
  width: 5px;
  height: 100vh;
  background-color: ${(props) => props.background};
  cursor: col-resize;
  z-index: 1000;
`;

const li = styled.li`
  white-space: nowrap;
`;

class DraggableExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLeftBoxWidth: 150, // 左边区块初始宽度
      leftBoxWidth: 150, // 左边区块初始宽度
      leftBoxMinWidth: 100, // 左边区块最小宽度
      leftBoxMaxWidth: 300, // 左边区块最大宽度
      dragBoxBackground: 'transparent', // 拖拽盒子的背景色
      list: [1, 2, 3, 4, 5],
    };
  }

  // 拖动时设置拖动box背景色，同时更新左右box的宽度
  onDrag = (ev, ui) => {
    const { initialLeftBoxWidth } = this.state;
    const newLeftBoxWidth = ui.x + initialLeftBoxWidth;
    this.setState({
      leftBoxWidth: newLeftBoxWidth,
      dragBoxBackground: '#FFB6C1',
    });
  };

  // 拖拽结束，重置drag-box的背景色
  onDragStop = () => {
    this.setState({
      dragBoxBackground: 'transparent',
    });
  };

  render() {
    const {
      initialLeftBoxWidth,
      leftBoxWidth,
      leftBoxMinWidth,
      leftBoxMaxWidth,
      dragBoxBackground,
      list,
    } = this.state;
    return (
      <Container>
        <LeftContent width={leftBoxWidth}>
          <h3 style={{ paddingLeft: 20 }}>目录</h3>
          <ul className='my-ul'>
            <li>目录1</li>
            <li>目录2</li>
            <li>目录3</li>
            <li>这是个非常长非常长非常长的目录</li>
          </ul>
          <Draggable
            axis="x"
            defaultPosition={{ x: 0, y: 0 }}
            bounds={{
              left: leftBoxMinWidth - initialLeftBoxWidth,
              right: leftBoxMaxWidth - initialLeftBoxWidth,
            }}
            onDrag={this.onDrag}
            onStop={this.onDragStop}
          >
            <DraggableBox left={initialLeftBoxWidth - 5} background={dragBoxBackground} />
          </Draggable>
        </LeftContent>
        <RightContent leftBoxWidth={leftBoxWidth} />
      </Container>
    );
  }
}

export default DraggableExp;
