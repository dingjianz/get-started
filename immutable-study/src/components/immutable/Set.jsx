import React, { useEffect, memo } from "react";
import { Set } from "immutable";

const SetMemo = () => {
  useEffect(() => {
    // Set可以了为value唯一的数组 即数组中不允许出现重复的值
    // Set是工厂方法，不允许new来实例化，会自动去重
    const set = Set([1, 1, 2, 2, 3, 4]);
    const set1 = set.toArray();
    console.log("set:::::", set); // Set [1, 2, 3, 4] 自动去重了
    console.log("set1:::::", set1); // [1, 2, 3, 4]

    // add添加值
    const add1 = set.add(5);
    console.log("add1:::::", add1); // Set [1, 2, 3, 4, 5]

    // delete删除值 这里删除的是value 不是key 因为没有下标的概念
    const delete1 = add1.delete(1);
    console.log("delete:::::", delete1); // Set [5, 2, 3, 4]

    // subtract 从Set里删除一些值
    const subtract1 = add1.subtract([1, 2, 3]);
    console.log("subtract1:::::", subtract1.toJS()); // [5, 4]

    // clear清空并且返回新Set
    const clear1 = delete1.clear();
    console.log("clear1:::::", clear1); // Set []

    // union N个Set合并成一个Set 相当于取并集
    const s1 = Set([1, 2, 3]);
    const s2 = Set(["x", "y", "z"]);
    const s3 = s1.union(s2);
    console.log("s3:::", s3.toJS()); // [1, 2, 3, "x", "y", "z"]

    // interset 取N个Set的交集
    const in1 = Set([1, 2, 3]);
    const in2 = Set([3, 4, 5]);
    const in3 = in1.intersect(in2);
    console.log("in3:::", in3.toJS()); // [ 3 ]

    // forEach循环
    const each1 = Set(["x", "y", "z"]);
    each1.forEach((val, key) => {
      console.log(`key:${key}，val:${val}`); // key:x，val:x 因为没有key的概念 key和value值一样
    });
    // get取值
    // has判断是否包含指定的key
    // includes判断是否包含指定的value

    // reset去除第一个的其余元素
    const r1 = Set([1, 2, 3, 4, 5]);
    const r2 = r1.rest();
    console.log("r2:::::", r2.toJS()); // [2, 3, 4, 5]

    // butLast去除最后一个的其余元素
    const r3 = r1.butLast();
    console.log("r3:::::", r3.toJS()); // [1, 2, 3, 4]

    // skip(number) 略过前N个元素，取得其余元素
    const sk = Set([1, 22, 33, 4, 5, 6]);
    const sk1 = sk.skip(2);
    console.log("sk1:::::", sk1.toJSON()); // [33, 4, 5, 6]

    // skipLst(number) 略过前N个元素，取得其余元素
    const skL = Set([1, 22, 33, 4, 5, 6]);
    const skL1 = skL.skipLast(2);
    console.log("skL1:::::", skL1.toJSON()); // [1, 22, 33, 4]

    // skipWhile((value: T, key: T, iter: this) => boolean) 当判断条件为false时，取得当前及后面的元素
    const skW = Set(["hello", "world", "good", "bad", "just", "little", "o"]);
    const skW1 = skW.skipWhile((item) => item.indexOf("o") !== -1);
    console.log("skW1:::::", skW1.toJSON()); // ["bad", "just", "little", 'o']

    // skipUntil((value: T, key: T, iter: this) => boolean) 当判断条件为true时，取得当前及后面的元素
    // const skW2 = skW.skipUntil(item => item.indexOf('o') === -1);
    const sku2 = skW.skipUntil((item) => !/O/gi.test(item)); // 正则写法
    console.log("sku2:::::", sku2.toJSON()); // ["bad", "just", "little", 'o']

    // take(number) 取得前N个元素 takeLast(number) 取得最后N个元素
    const take = Set([1, 2, 3, 4, 5]);
    const take1 = take.take(2);
    const take2 = take.takeLast(2);
    console.log("take1:::::", take1.toJSON()); // [1, 2]
    console.log("take2:::::", take2.toJSON()); // [4, 5]

    // takeWhile((value: T, key: T, iter: this) => boolean) 从前往后取元素，当判断条件为false时为止
    // takeUntil((value: T, key: T, iter: this) => boolean) 从前往后取元素，当判断条件为true时为止
    const tkW = Set(["hello", "world", "good", "bad", "just", "little", "o"]);
    const tkw1 = tkW.takeWhile((item) => /O/gi.test(item))
    const tkw2 = tkW.takeUntil((item) => !/O/gi.test(item))
    console.log('thw1', tkw1.toArray()); //  ["hello", "world", "good"]
    console.log('thw2', tkw2.toArray()); //  ["hello", "world", "good"]
  }, []);

  return <h2>immutable Set</h2>;
};

export default memo(SetMemo);
