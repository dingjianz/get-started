/* eslint-disable */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { adminRouter } from './routes';
import { Frame } from './components';
import { connect } from 'react-redux';
import './assets/css/reset.scss';

const menus = adminRouter.filter((route) => route.isNav);

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    role: state.userReducer.role,
  };
};

@connect(mapStateToProps)
class App extends Component {
  renderRoute = (menuList, role) => {
    return menuList.map((route) => {
      if (route.children) {
        return this.renderRoute(route.children, role);
      } else {
        return (
          <Route
            key={route.pathname}
            path={route.pathname}
            exact={route.exact}
            render={(routerProps) => {
              // roles权限判断
              const hasPermission = route.roles.includes(role);
              return hasPermission ? (
                <route.component {...routerProps} />
              ) : (
                <Redirect to="/admin/noauth" />
              );
            }}
          />
        );
      }
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { isLogin, role } = this.props;
    return isLogin ? (
      <Frame menus={menus}>
        <Switch>
          {this.renderRoute(adminRouter, role)}
          <Redirect to="/admin/dashboard" from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default App;
