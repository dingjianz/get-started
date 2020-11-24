/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import dynamic from 'next/dynamic';

const DynamicComponnet = dynamic(() => import('@/components/dynamic/dynamicComponnet'), {
  loading: () => <h1>我是loading...</h1>,
});

const FnsComponent = dynamic(() =>
  import('@/components/dynamic/hello.jsx').then((module) => {
    console.log(module);
    return module.fn1;
  })
);

class DynamicDemo extends Component {
  render() {
    return (
      <div>
        <DynamicComponnet />
        <FnsComponent />
      </div>
    );
  }
}

export default DynamicDemo;
