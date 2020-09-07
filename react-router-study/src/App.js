import React, { Component } from 'react'
import {Home, Artical, ArticalDetail , Users, NotFound} from './views'
import { Route, NavLink, Redirect, Switch } from 'react-router-dom'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li><NavLink to="/home">首页</NavLink></li>
          <li><NavLink to="/artical">文章</NavLink></li>
          <li><NavLink to="users">用户</NavLink></li>
        </ul>
        <Switch>
          <Route path="/home" component={Home} />
          <Route  path="/artical" component={Artical} exact />
          <Route path="/artical/:id" component={ArticalDetail} />

          {/*  <Route component={Users} path="/users" /> */}
          
          <Route path="/users" render={(routeProps) => {
            return this.state.isLogin ? <Users {...routeProps} x="1"/> : <h1>请登录</h1>
          }} />

          <Route path="/404" component={NotFound} />
          <Redirect to="/home" from="/" exact />
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}
