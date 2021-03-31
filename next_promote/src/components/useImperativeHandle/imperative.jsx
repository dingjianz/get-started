import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styles from './imperative.module.scss';

const Imperative = forwardRef((props, ref) => {
  const $inputRef = useRef(null);

  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  useImperativeHandle(
    ref,
    () => {
      return {
        count,
        focus() {
          $inputRef.current.focus();
        },
      };
    },
    [num]
  );

  return (
    <div>
      <input type="text" ref={$inputRef} className={styles.ipt} />
      <h3>count: {count}</h3>
      <h3>num: {num}</h3>
      <button type="button" onClick={() => setCount(count + 1)}>
        setCount
      </button>
      <button type="button" onClick={() => setNum(num + 1)}>
        setNum
      </button>
    </div>
  );
});

export default Imperative;
