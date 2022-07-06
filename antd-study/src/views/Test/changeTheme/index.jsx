import React, { PureComponent } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import './index.scss';

class LazyDemo extends PureComponent {
  state = {
    theme: false,
  };

  change = () => {
    this.setState(({ theme }) => ({
      theme: !theme,
    }));
  };

  render() {
    const { theme } = this.state;
    return (
      <div className={classNames('base-theme', { 'dark-theme': theme }, { 'light-theme': !theme })}>
        <Button onClick={this.change.bind(this)}>切换主题</Button>
        <h1>{theme ? 'true' : 'false'}</h1>
      </div>
    );
  }
}

export default LazyDemo;
