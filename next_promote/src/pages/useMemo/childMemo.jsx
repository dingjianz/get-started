import React, { useMemo } from 'react';

const ChildMemo = ({ count, num }) => {
  const res = useMemo(() => {
    return {
      count,
      num,
    };
  }, [num]); // 父组件数据更新，且num变化时才重新构建
  return (
    <div>
      <h3>子组件：</h3>
      count：{res.count}
      <br />
      num：{res.num}
    </div>
  );
};

export default ChildMemo;
