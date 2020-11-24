/* eslint-disable react/jsx-curly-newline */
import React, { useContext } from 'react';
import { MyContext } from '@/components/useReducer/HocComponent';

const Text2 = () => {
  const { state, dispatch } = useContext(MyContext);
  return (
    <>
      <h1>
        Text2: 姓名：{state?.name ?? '张三'} ----- 年龄：{state?.age ?? 0}
      </h1>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: 'setname',
            name: '赵六',
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
            age: 36,
          })
        }
      >
        setAge
      </button>
    </>
  );
};

export default Text2;
