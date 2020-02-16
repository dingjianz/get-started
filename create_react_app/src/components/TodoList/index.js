import React, { Component } from 'react'
import TodoItem from './TodoItem'
import ReactTypes from 'prop-types'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static propTypes = {
    todos: ReactTypes.arrayOf(ReactTypes.shape({
      id: ReactTypes.number.isRequired,
      title: ReactTypes.string.isRequired,
      completed: ReactTypes.bool.isRequired
    })).isRequired
  }
  render() {
    // console.log(this.props.todos)
    const { todos, onCompetedHandle }  = this.props
    return (
      <ul>
        {todos.map((item, index) => {
          return (
            <TodoItem 
              key={item.id}
              index={index}
              {...item}
              onCompetedHandle={onCompetedHandle}
            />
          )
        })} 
      </ul>
    )
  }
}
