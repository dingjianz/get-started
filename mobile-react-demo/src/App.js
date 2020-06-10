import React from 'react'
import { Button } from 'antd'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Button type="primary">按钮</Button>
      <span className="box">我是文字</span>
      <div className="father"></div>
    </div>
  )
}

export default App
