/**
 *  useCallback
 *
 * 作用：避免组件重复渲染，提高性能（类似于useMemo，但原理不同）
 * 可以控制组件什么时候需要更新
 *
 * 同样需要用到缓存技术，和useMemo 不同的是，
 * useCallback缓存的是整个函数，是个函数就可以执行
 *
 * useCallback() 有两个参数，第一个是函数，第二个是数组
 * useCallback(() => {}, [可以不写])
 */

import React, { useState, useCallback } from 'react';

const UseCallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const callBack = useCallback(() => {
    console.log(count);
    return count;
  }, [num]);

  return (
    <div>
      <h3>count: {count}</h3>
      <h3>num: {num}</h3>
      <h3>callBack: {callBack()}</h3>

      <button type="button" onClick={() => setCount(count + 1)}>
        setCount
      </button>
      <button type="button" onClick={() => setNum(num + 1)}>
        setNum
      </button>
    </div>
  );
};

export default UseCallbackDemo;
