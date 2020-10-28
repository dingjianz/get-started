import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

import { CartList, BlogList } from './components'
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ul>
            <li><Link to="/blog">我的博客</Link></li>
            <li><Link to="/cart">countNum</Link></li>
          </ul>
          <Switch>
            <Route path="/blog" component={BlogList} />
            <Route path="/cart" component={CartList} />
            <Redirect from="/" to="/blog" />
          </Switch>
        </Router>
      </div>
    )
  }
}
