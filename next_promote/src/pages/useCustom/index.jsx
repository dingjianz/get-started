/* 
  # 自定义 hook
  
  自定义 hook，和普通的函数本质上没有曲别，都是做一些函数的封装，方便使用。
  注意点：
    -1：自定义hook，必须以 use 使用；
    -2: 自定义hook，可以使用官方hook，（useState, useEffect...）来封装；
*/

import React, { useState } from 'react';

// 自定义 hook
const useCustom = (val, num) => {
  const [count, setCount] = useState(val);

  const add = () => {
    setCount(count + num);
  };
  return {
    count,
    add,
  };
};

const UseCustomHookDemo = () => {
  const { count, add } = useCustom(10, 2);
  return (
    <div>
      <h2>custom hook</h2>
      <h3>count: {count}</h3>
      <button type="button" onClick={add}>
        add count
      </button>
    </div>
  );
};

export default UseCustomHookDemo;
