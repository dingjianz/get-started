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

/* 
  1. 在子组件不需要父组件的值和函数的情况下，只需要使用 memo 函数包裹子组件即可；

  2. 如果有函数传递给子组件，使用 useCallback；

  3. 如果有值传递给子组件，使用 useMemo；

  4. useEffect、useMemo、useCallback 都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种hooks的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 ref 来访问。
*/

import React, { useState, useCallback } from 'react';

const UseCallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  // 相当于新设定了一个变量callBack，执行后返回
  const callBack = useCallback(() => {
    console.log('count', count); // setCount和setNum每次执行都触发，每次都打印，只是只有setNum时，才会返回值。
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
