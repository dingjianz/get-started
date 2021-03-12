import React from 'react';

const Child1 = ({ step, count, number }) => {
  console.log('child1 render');
  return (
    <div>
      <div>step: {step}</div>
      <div>count: {count}</div>
      <div>number: {number}</div>
    </div>
  );
};

export default Child1;
