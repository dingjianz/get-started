import React, { useEffect, memo } from "react";
import { Range, Repeat } from "immutable";

const OtherDemo = () => {
  useEffect(() => {
    // Range(start?: number, end: number, step?: number) 根据给定条件生成一个Seq
    const r1 = Range(2);
    console.log("r1:::::", r1); // Range [5...Infinity]
    const r2 = Range(2, 15, 2);
    console.log("r2:::::", r2); // Range [2...14 by 2]
    r2.forEach((item) => console.log(item)); // 2 4 6 8 10 12 14

    // Repeat(value, times) 重复生成N个值的Seq，当没有传入times的时候，会生成长度为infinite的Seq。
    const repeat1 = Repeat(1);
    console.log('repeat1:::::', repeat1); // [1 Infinite times]

    const repeat2 = Repeat(1, 4);
    console.log('repeat2:::::', repeat2.toJS()); // [1, 1, 1, 1]
  }, []);

  return <h2>immutable Range</h2>;
};

export default memo(OtherDemo);
