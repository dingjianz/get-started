/* eslint-disable */
import React, { useRef, memo, useState } from 'react';

const UseRefDemo = () => {
  const num = useRef(0);
  const [r, setR] = useState(0);
  const [list, setList] = useState([
    { id: 'n1', name: '张三' },
    { id: 'n2', name: '李四' },
    { id: 'n3', name: '王五' },
  ]);

  const addNum = (val) => {
    setR(r + 1);

    num.current += val;
    console.log('num', num);
  };

  return (
    <div className="use-ref">
      <h1>{num.current}</h1>
      <button type="button" onClick={() => addNum(2)}>
        num + 1
      </button>

      <hr />
      <a href="https://juejin.cn/post/6994959998283907102#heading-10" target="_blank">掘金：Diff算法</a>
      <h5>为什么不推荐index作为key</h5>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setList([{ id: 'n0', name: 'jianding9' }, ...list])}>key为index---unshfit---所有li都会更新</button>
      <br />
      <button onClick={() => setList([{ id: 'n0', name: 'jianding9' }, ...list])}>key为index---push---最后一个li新增更新</button>
      <br />
      <ul>
        {list.map((item, index) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setList([{ id: 'n0', name: 'jianding9' }, ...list])}>key为唯一标识id---unshift---照样只更新第一个li</button>
    </div>
  );
};

export default memo(UseRefDemo);
