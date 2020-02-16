import React, { Component } from 'react'
import WithCopyHOC from './WithCopyHOC'
import Another from './Another'
// import './App.scss'

class App extends Component {
  render() {
    return (
      <div>
          app
        <Another title="我是一个titile"/>
      </div>
    )
  }
}

// export default WithCopyHOC(App)
export default App