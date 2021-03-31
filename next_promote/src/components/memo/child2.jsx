/* eslint-disable */
import React, { memo } from 'react';

const isEqual = (prevProps, nextProps) => {
  if (prevProps.number !== nextProps.number) {
    return false;
  }
  return true;
};

const Child2 = ({ number }) => {
  console.log('child2 render');
  return (
    <div>
      <div>number: {number}</div>
    </div>
  );
};

/**
 * 需要注意的是，子组件中并没有使用到 props.step 和 props.count，但是一旦 props.step 发生了变化就会触发重新渲染。
 * 加了memo，只要number发生改变时，才会渲染。
 */
// export default Child2;
// export default memo(Child2); // 优化
export default memo(Child2, isEqual); // 更优化
