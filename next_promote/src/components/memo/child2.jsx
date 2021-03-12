import React, { memo } from 'react';

const Child2 = ({ step, count, number }) => {
  console.log('child2 render');
  return (
    <div>
      <div>step: {step}</div>
      <div>count: {count}</div>
      <div>number: {number}</div>
    </div>
  );
};

export default memo(Child2);
