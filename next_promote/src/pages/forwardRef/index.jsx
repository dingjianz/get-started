/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import FancyButton from '@/components/forwardRef/fancyButton';

class ForwardRefDemo extends Component {
  constructor() {
    super();
    this.$ref = null;
  }

  componentDidMount() {
    console.log(this.$ref);
  }

  render() {
    return (
      <div>
        <FancyButton
          {...{
            name: 'jianding9',
            age: 18,
          }}
          ref={(el) => (this.$ref = el)}
        />
      </div>
    );
  }
}

export default ForwardRefDemo;
