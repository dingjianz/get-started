import React, { useEffect, memo } from "react";
import { OrderedMap } from "immutable";

const OrderedMapDemo = () => {
  useEffect(() => {
    // OrderedMapDemo 有序对象 开销比较大 和set的顺序有关
    const map = OrderedMap({});
    const map1 = map.set("z", 1);
    const map2 = map1.set("y", 2);
    const map3 = map2.set("x", 3);
    const map4 = map3.toJS();
    console.log("map", map);
    console.log("map4", map4);

    map3.forEach((val, key) => {
      console.log(`key:${key}，val:${val}`)
    })
  }, []);

  return <h2>immutable OrderedMap</h2>;
};

export default memo(OrderedMapDemo);
