/* 
  useLayoutEffect 与 useEffect 作用相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

尽可能使用标准的 useEffect 以避免阻塞视觉更新。

useEffect是在componnetDidMount 以后执行的， useLayoutEffect 是在浏览器执行绘制之前执行的（会阻塞组件挂载，慎用）

*/
import React, { useLayoutEffect, useEffect, useState } from 'react';

const UseLayoutEffectDemo = () => {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    return () => {
      console.log('useLayoutEffect-return');
    };
  });

  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('useEffect-return');
    };
  });
  return (
    <div>
      <h1>useLayoutEffect</h1>
      <h3>count：{count}</h3>
      <button type="button" onClick={() => setCount(count + 1)}>
        setCount
      </button>
    </div>
  );
};

export default UseLayoutEffectDemo;
