import React, { useEffect, memo } from "react";
import { OrderedSet, Set } from "immutable";

const OrderedSetDemo = () => {
  useEffect(() => {
    // OrderedSet是Set的超集，是有序的Set，它的顺序是调用add添加元素的顺序，拥有Set的所有方法和属性
    const set = Set([2, 1, 4, 3, 5, 6, 9, 7, 8]);
    const oSet = OrderedSet([2, 1, 4, 3, 5, 6, 9, 7, 8]);
    console.log("set:::::", set.toJS()); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log("oSet:::::", oSet.toJS()); // [2, 1, 4, 3, 5, 6, 9, 7, 8]

    const set1 = set.takeWhile((item) => item % 2 === 0);
    const oSet1 = oSet.takeWhile((item) => item % 2 === 0);
    console.log("set1:::::", set1.toArray()); // []
    console.log("oSet1:::::", oSet1.toArray()); // [2]

    // sort 排序方法 sort((valueA: T, valueB: T) => number)
    // valueA- valueB: 升序
    // valueB- valueA: 降序
    const sort1 = oSet.sort((valueA, valueB) => valueA - valueB);
    const sort2 = oSet.sort((valueA, valueB) => valueB - valueA);
    console.log('sort1:::::', sort1.toJS()); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log('sort2:::::', sort2.toJS()); //  [9, 8, 7, 6, 5, 4, 3, 2, 1]
  }, []);

  return <h2>immutable OrderedSet</h2>;
};

export default memo(OrderedSetDemo);
