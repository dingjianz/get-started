import React, { Component } from 'react';
import ThemeContext from 'api/theme';

/**
 * @param name 姓名
 * @param age 年龄
 */
interface IState {
  name: string;
  age: number;
  [propName: string]: any;
}

// const dj: IState = {
//   name: '12',
//   age: 12,
// };

interface IProps {
  [propName: string]: any;
}

class ContextDemo extends Component<IProps, IState> {
  componentDidMount() {
    console.log('class-contextType:::', this.context);
  }

  render(): React.ReactNode {
    return <div>ContextDemo</div>;
  }
}

ContextDemo.contextType = ThemeContext;

export default ContextDemo;
