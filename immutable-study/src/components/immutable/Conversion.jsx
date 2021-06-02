import React, { useEffect, memo } from "react";
import { fromJS, Set, List, Map } from "immutable";

const ConversionDemo = () => {
  useEffect(() => {
    // 原生对象转immutable对象
    const map = fromJS({
      x: 1,
      y: 2,
      z: 3,
      xyz: {
        good: 123,
      },
    });
    console.log("map:::::", map); // Mpp {x:1, y:2, z:3, xyz: Map { good：123}}

    const list = fromJS([1, 2, 3, [11, 22, 33]]);
    console.log("list:::::", list); // List [1, 2, 3, List [11, 22, 33]]

    // 数组对象混合
    const listMap = fromJS([
      1,
      2,
      3,
      [
        { name: "张三", age: 20 },
        { name: "李四", age: 36 },
      ],
    ]);
    console.log("listMap:::::", listMap);

    // immutable对象转原生对象
    // toJS() 转换为原生对象
    // List -> 数组
    // Set -> 数组
    // Map -> 对象
    const list1 = List([1, 2, 3, 4, 5]);
    const map1 = Map({
      name: "jianding9",
      age: 18,
    });
    const set1 = Set([1, 2, 2, 3, 4, 5, 6]);
    const list2 = list1.toJS();
    const map2 = map1.toJS();
    const set2 = set1.toJS();
    console.log("list2:::::", list2);
    console.log("map2:::::", map2);
    console.log("set2:::::", set2);
  }, []);

  return <h2>immutable对象和原生对象的相互转</h2>;
};

export default memo(ConversionDemo);
