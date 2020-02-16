import React from 'react'
import { CounterBtn, CounterDisplay } from './components'
import { connect } from 'react-redux'
import { addCountAction, reduceCountAction } from './store/actions/todoAction'

import './App.scss'

function App(props) {
  return (
    <div className="App">
      <CounterBtn onClick={() => props.reduceCountAction(2)}>-</CounterBtn>
      <CounterDisplay></CounterDisplay>
      <CounterBtn onClick={() => props.addCountAction(2)}>+</CounterBtn>
    </div>
  )
}

export default connect(null, { addCountAction, reduceCountAction })(App)
