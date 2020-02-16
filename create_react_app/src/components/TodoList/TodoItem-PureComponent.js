import React, { PureComponent } from 'react'
/* 
  它们几乎完全相同，但是PureComponent通过prop和state的浅比较来实现shouldComponentUpdate，某些情况下可以用PureComponent提升性能
  https://react.docschina.org/docs/react-component.html
*/
const noop = () => {}
export default class TodoItem extends PureComponent {

  constructor() {
    super()
  }

  handCheckbox = () => {
    const { onCompetedHandle = noop, index } = this.props
    onCompetedHandle(index)
  }

  componentDidUpdate (prevProps,prevState) {
    console.log(`只有${this.props.title}render()`)
  }

  render() {
    console.log('todoitem')
    const { index, title, completed } = this.props
    return (
      <li>
        <input
        checked={completed}
        onChange={this.handCheckbox}
        type="checkbox"
        />
        <span>{ index + 1} ---- { title } ---- { completed ? '完成' : '未完成'}</span>
      </li>
    )
  }
}
