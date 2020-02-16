import React, { Component } from 'react'
import { render } from 'react-dom'

import { CounterProvider } from './countStore'

import App from './App'

render(
  <CounterProvider>
    <App />
  </CounterProvider>, document.querySelector('#root'))