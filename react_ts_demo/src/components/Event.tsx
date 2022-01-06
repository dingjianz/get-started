import React, { Component, createRef, ReactElement } from 'react';
import { Space, Button } from 'antd';

/**
 * @param title 标题
 */
interface IProps {
  title: string;
}

interface IState {
  [propName: string]: unknown;
}

export default class Event extends Component<IProps, IState> {
  private inputRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.inputRef = createRef();
  }

  render(): ReactElement {
    return (
      <div ref={this.inputRef}>
        <Space>
          <Button type="primary">点击</Button>
        </Space>
      </div>
    );
  }
}
