import React, {
  Component,
  createRef,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { Space, Button } from 'antd';

/**
 * @param title 标题
 */
interface IProps {
  // eslint-disable-next-line react/no-unused-prop-types
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

  componentDidMount(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      console.log(e.target);
    });
  }

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    console.log(event);
  };

  render(): ReactElement {
    return (
      <div ref={this.inputRef}>
        <Space>
          <Button type="primary">点击</Button>
          <input type="text" onKeyDown={(e) => this.handleKeyDown(e)} />
        </Space>
      </div>
    );
  }
}
