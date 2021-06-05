import React, { useEffect, memo } from "react";
import { Map } from "immutable";

const MapDemo = () => {
  useEffect(() => {
    const a = Map({
      owner: "张三",
      homeTown: "安庆",
      carName: Map({
        name: "BMW",
      }),
    });
    const b = a.set("owner", "李四");
    console.log(a === b); // false
    console.log(a.get("homeTown") === b.get("homeTown")); // true
    console.log(a.get("car") === b.get("car")); // true

    /* 
      Map对应原生js的Object结构，它是无序的
    */
    const m1 = Map({
      x: 1,
      y: 2,
    });
    console.log("m1", m1);

    // set设定值 set(key, value) key不规定必须是字符串
    const m2 = Map({
      x: 1,
      y: 2,
    });
    console.log("m1 === m2", m1 === m2); // false
    const m3 = m1.set("x", "44");
    const m4 = m1.set("x", "44");
    console.log("m3", m3);
    console.log("m4", m4);
    console.log("m3 === m4", m3 === m4); // false

    // get取值
    console.log(m4.get("x")); // 44

    // delete删除值 delete(key)
    // deleteAll([key1, key2, key3])
    // clear清除所有属性并返回新的Map
    // update更新 update(key, callback)
    // merge合成N个Map为一个Map
    // concat是merge的别名
    // mergeWith类似于merge，但是指定了merge的具体规则
    const mer1 = Map({
      x: 1,
      y: 2,
    });
    const mer2 = Map({
      y: 3,
      z: 4,
    });
    const mer3 = mer1.merge(mer2);
    console.log("mer3", mer3);

    const mer4 = mer1.mergeWith((oldVal, newVal) => newVal + "!!!", mer2);
    console.log("mer4", mer4);

    // setIn对于嵌套解构来进行设置值 setIn([层次1key，层次2key，...层次N key], value)
    const deepMap = Map({
      lev1: Map({
        lev2: Map({
          lev3: Map({
            lev4: "hello",
          }),
        }),
      }),
    });
    const deepMap2 = deepMap.setIn(["lev1", "lev2", "lev3", "lev4"], "world");
    console.log("deppMap2", deepMap2);
    console.log(deepMap2.getIn(["lev1", "lev2", "lev3", "lev4"]));

    // 同样的嵌套层次的操作还有deleteIn updateIn mergeIn
    // toJS 把Map转换成原生Object，深转换
    // toJSON 把Map转换成原生Object，浅转换
    const deep = deepMap.toJS();
    const shadow = deepMap.toJSON();
    console.log("deep", deep);
    console.log("shadow", shadow);

    // toArray 转换成数组，浅转换
    const arrTest = Map({
      x: 1,
      y: 2,
      z: 3,
    });
    const arrTest2 = arrTest.toArray();
    console.log("arrTest2", arrTest2);
    // toObject转换成Object，浅转换 和toJSON作用一样
    const shadow2 = arrTest.toObject();
    console.log("shadow2", shadow2);

    // equals两个Map值是否相等
    const equal1 = Map({
      x: 1,
      y: 2,
      z: 3,
    });
    const equal2 = Map({
      x: 1,
      y: 2,
      z: 3,
    });
    console.log("equal1 === equal2", equal1 === equal2); // false
    console.log("equals", equal1.equals(equal2)); // true

    // find查找，匹配到第一个 findKey findEntry findLast
    const findTest = Map({
      name: "jianding9",
      age: 18,
      sex: "male",
    });
    const findTest2 = findTest.findLast((val, key) => val === 18);
    console.log("findTest2", findTest2); // age ["age", 18]

    // flatten 拉平Map true只拉平一层 false深拉平
    // has判断是否有指定的key
    // includes 判断是否有指定的value
    const testMap = Map({
      name: "jianding9",
      age: 18,
    });
    console.log("has::", testMap.has("name")); // true
    console.log("includes::", testMap.includes(18)); // true

    // forEach方法
    testMap.forEach((val, key) => {
      console.log(`key: ${key}, val: ${val}`); // key: name, val: jianding9 key: age, val: 18
    });
  }, []);

  return <h2>immutable Map</h2>;
};

export default memo(MapDemo);
