import { Component, CSSProperties, ReactElement } from 'react';
import ThemeContext from 'api/theme';

/**
 * @param name 姓名
 * @param age 年龄
 */
interface IState {
  name: string;
  age: number;
  [propName: string]: unknown;
}

// const dj: IState = {
//   name: '12',
//   age: 12,
// };

interface IProps {
  [propName: string]: unknown;
}

const divStyles: CSSProperties = {
  color: 'red',
  background: 'yellow',
};

class ContextDemo extends Component<IProps, IState> {
  componentDidMount(): void {
    console.log('class-contextType:::', this.context);
  }

  render(): ReactElement {
    return <div style={divStyles}>ContextDemo</div>;
  }
}

ContextDemo.contextType = ThemeContext;

export default ContextDemo;
