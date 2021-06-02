import React, { useEffect, memo } from "react";
import { Seq, List, Set } from "immutable";

const SeqDemo = () => {
  useEffect(() => {
    // 应用场景：if else的时候，假如几率50%，那我们就可以节省50%的性能开销。但是不利的点就是，等待执行的时候才加载，速度没那么快。
    // Seq描述了一个“懒”操作，允许使用collection的高阶方法高效地链式使用，但是不会生成中间的collections。
    // 特点1：Seq is immutable. Seq是不可改变了
    // 特点2： Seq is lazy. Seq是懒的。
    // 由于Seq是lazy的，因此下面的链式调用是不会立即执行的，只有当oddSquares被调用时，才会被执行
    const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
      .filter((x) => x % 2 !== 0)
      .map((x) => {
        console.log("只有被调用时我才执行");
        return Math.pow(x, 2);
      });
    console.log("oddSquares:::::", oddSquares.toArray()); // [1, 9, 25, 49]

    // 可以通过Seq方法把任意的collection转换成Seq
    const list = List([1, 2, 3, 4, 5, 6]);
    const seqList = Seq(list);
    console.log("seqList:::::", seqList);

    // Seq.Keyed 键值对类型的转换
    const obj = { x: 1, y: 2 };
    const seqK = Seq.Keyed(obj);
    const seqK2 = Seq(obj);
    console.log("seqK:::::", seqK);
    console.log("seqK2:::::", seqK2);

    // Seq.Indexed 有下标的类型，例如数组
    const arr = [1, 2, 3, 4, 5];
    const seqArr = Seq.Indexed(arr);
    const seArr2 = Seq(arr);
    console.log("seqArr:::::", seqArr);
    console.log("seArr2:::::", seArr2);

    // Seq.Set
    const set = Set([1, 1, 2, 3, 4, 5, 5]);
    const seqSet = Seq.Set(set);
    console.log("seqSet:::::", seqSet);
  }, []);

  return <h2>immutable Seq</h2>;
};

export default memo(SeqDemo);
