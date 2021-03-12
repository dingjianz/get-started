/**
 * @name hooks memo
 * @author jianding9
 * @dateTime 20210312
 * @description 在 Function Component 的使用中， React 贴心的提供了 React.memo 这个 HOC（高阶组件），与 PureComponent 很相似，但是是专门给 Function Component 提供的，对 Class Component 并不适用。但是相比于 PureComponent ，React.memo() 可以支持指定一个参数，可以相当于 shouldComponentUpdate 的作用，因此 React.memo() 相对于 PureComponent 来说，用法更加方便。
 * http://www.ptbird.cn/react-hook-useMemo-purerender.html
 * https://zh-hans.reactjs.org/docs/react-api.html#reactmemo
 */
/* eslint-disable */
import React, {  useState } from 'react';

import Child1 from '@/components/memo/child1';
import Child2 from '@/components/memo/child2';
import styles from './index.module.scss';

const memoDemo =() => {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  return (
    <>
      <div className={styles.btnWrap}>
        <button className={styles.btn} onClick={() => setStep(step + 1)}>
          setStep
        </button>
        <button className={styles.btn} onClick={() => setCount(count + 1)}>
          setCount
        </button>
        <button className={styles.btn} onClick={() => setNumber(step + count)}>
          setNumber
        </button>
      </div>
      <Child1
        {...{
          step,
          count,
          number,
        }}
      />
      <hr />
      <Child2
        {...{
          step,
          count,
          number,
        }}
      />
    </>
  );
};

export default memoDemo;
