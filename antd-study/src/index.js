import React from 'react';
import { render } from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { mainRouter } from './routes';
import store from './store';

import './index.less';

render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={(rootProps) => {
              // 权限：需要登录才能访问 /admin 本次在App组件里面做权限判断
              // return store.getState().userReducer.isLogin ?  <App {...rootProps} /> : <Redirect to='/login' />
              return <App {...rootProps} />;
            }}
          />
          {mainRouter.map((route) => {
            return (
              <Route
                key={route.pathname}
                exact={route.exact}
                path={route.pathname}
                component={route.component}
              />
            );
          })}
          <Redirect to="/admin" from="/" exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
