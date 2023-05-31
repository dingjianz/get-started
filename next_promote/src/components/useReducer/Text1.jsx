/* eslint-disable react/jsx-curly-newline */
import React, { useContext } from 'react';
import { MyContext } from './HocComponent';

const Text1 = () => {
  const { state, dispatch } = useContext(MyContext);
  return (
    <>
      <h1>
        Text1: 姓名：{state?.name ?? '张三'} ----- 年龄：{state?.age ?? 0}
      </h1>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: 'setname',
            name: '王五',
          })
        }
      >
        setName
      </button>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: 'setage',
            age: 100,
          })
        }
      >
        setAge
      </button>
    </>
  );
};

export default Text1;
