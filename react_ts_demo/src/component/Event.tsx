import React, { Component } from "react";
import { Space, Button } from "antd";

export default class Event extends Component {
  render() {
    return (
      <div>
        <Space>
          <Button type="primary">点击</Button>
        </Space>
      </div>
    );
  }
}
