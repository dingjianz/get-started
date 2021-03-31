/**
 * @name hooks memo
 * @author jianding9
 * @dateTime 20210312
 * @description 主要是用于子组件，在Function Component的使用中，React贴心的提供了React.memo 这个 HOC（高阶组件），与PureComponent很相似，但是是专门给Function Component提供的，对Class Component并不适用。但是相比于PureComponent ，React.memo()可以支持指定一个参数，可以相当于shouldComponentUpdate的作用，因此React.memo()相对于PureComponent来说，用法更加方便。
 * http://www.ptbird.cn/react-hook-useMemo-purerender.html
 * https://zh-hans.reactjs.org/docs/react-api.html#reactmemo
 */
/* eslint-disable */
import React, { useState } from 'react';

import Child1 from '@/components/memo/child1';
import Child2 from '@/components/memo/child2';
import styles from './index.module.scss';

const memoDemo = () => {
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
        <button
          className={styles.btn}
          onClick={() => setNumber(step + count)}
        >
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
          number,
        }}
      />
    </>
  );
};

export default memoDemo;
