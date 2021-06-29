/* eslint-disable no-console */
import React, { useRef, memo, useState } from 'react';

const UseRefDemo = () => {
  const num = useRef(0);
  const [r, setR] = useState(0);

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
    </div>
  );
};

export default memo(UseRefDemo);
