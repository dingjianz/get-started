/* eslint-disable */
import React, { Component } from 'react';

class HocDemo extends Component {
  constructor() {
    super();
    this.state = {
      name: 'jianding9',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <h1>hoc--- {name}</h1>
      </div>
    );
  }
}

export default HocDemo;
