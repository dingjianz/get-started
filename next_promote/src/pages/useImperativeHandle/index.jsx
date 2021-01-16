/* 
  # useImperativeHandle

  useImperativeHandle 可以让你在使用 ref 时，自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。 useImperativeHandle 应当与 forwardRef 一起。

  useImperativeHandle(ref(传递过来的), () => {}, [])
*/

import React, { PureComponent, createRef } from 'react';
import Imperative from '@/components/useImperativeHandle/imperative';

class ImperativeHandleDemo extends PureComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      count: 0,
    };

    this.iptRef = createRef();
  }

  consoleLogRef = () => {
    const { count, focus } = this.iptRef.current;
    this.setState({
      count,
    });
    focus();
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <h3>父组件count: {count}</h3>
        <p>只有子组件num属性刷新，点击获取子组件之后，count才能刷新</p>
        <hr />
        <Imperative ref={this.iptRef} />
        <button type="button" onClick={this.consoleLogRef}>
          获取子组件的自定义方法或者属性
        </button>
      </div>
    );
  }
}

export default ImperativeHandleDemo;
