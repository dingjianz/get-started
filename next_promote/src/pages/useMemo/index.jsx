/*
  useMemo和shouldComponentUpdate类似作用，在渲染过程中避免重复渲染的问题；
  当状态或者父组件传来的属性更新时，更新组件。

  1. useMemo 就是用的 Memoization 来提高性能的；
  2. Memoization 是 JavaScript 中的一种缓存技术；
  如果我们有CPU密集型操作，我们可以通过将初始操作的结果储存在缓存中来优化使用，如果操作必然会再次执行，我们将不会麻烦再次使用CPU，因为相同的结果储存在某个地方，我们只是简单地返回结果。

  记住这个是以空间换速度，所以最好确定你是否值得这么做，有些场景很有必要使用。
  useMemo是一个函数，有两个参数，第一个参数是函数，第二个参数是个数组。
  useMemo(() =>, [默认可以不写， 作用类似于 useEffect])


  useMemo 和 useEffect 的执行时间不同， useEffect是在componentDidMount以后执行的，而useMemo是在组件渲染过程中执行的，先于useEffect。
 */

/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react';
import ChildMemo from '@/components/useMemo/childMemo';

const UseMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  // useEffect(() => {
  //   console.log('useEffect');
  // });

  const res = useMemo(() => {
    console.log('useMemo');
    return {
      count,
      num,
    };
  }, [count]); // 空数组就一个都不更新, 传count，点击add num就不更新，点击add count一并更新；

  return (
    <>
      {/* <div>计数器: count：--- {count}</div> */}
      <div>
        <h2>计数器:</h2> count：--- {res.count}
        <br />
        num: --- {res.num}
      </div>
      <button type="button" onClick={() => setCount(count + 1)}>
        add count
      </button>
      <button type="button" onClick={() => setNum(num + 1)}>
        add num
      </button>

      <hr />
      <ChildMemo
        {...{
          count,
          num,
        }}
      />
    </>
  );
};

export default UseMemoDemo;
