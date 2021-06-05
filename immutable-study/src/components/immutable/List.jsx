import React, { useEffect, memo } from "react";
import { List } from "immutable";

const ListDemo = () => {
  useEffect(() => {
    // List对应原生js中得数组结构
    // const list = new List([1, 2, 3, 4]); // NG list是工厂函数，不能new
    const list = List([1, 2, 3, 4, 5]);
    console.log(list);

    /* 
        List有两个静态方法，List.isList()和List.of()
        List.isList()判断是否是List类型
        List.of() 创建List对象，与共产函数List区别是，不需要写中括号[]
    */
    console.log(List.isList(list)); // true
    console.log(List.isList([1, 2, 3, 4, 5])); // false
    const list2 = List.of(1, 2, 3, 4, 5);
    console.log("list2", list2);

    // size取得List得长度
    console.log(list.size); // 5

    // set方法用来设定指定下标的值，set(下标, 值)，其中下标可以超出size， 如果是负值，即从右往左
    const list3 = list.set(0, 999);
    const list4 = list.set(-1, 888);
    console.log("list3", list3);
    console.log("list4", list4);

    // delete删除指定下标的值 delete(下标) 下标可以是负数
    // insert插入值 insert(下标，值)
    // update用来更新指定下标的值 update(下标, callback)
    const u1 = List([1, 2, 3, 4, 5]);
    const u2 = u1.update(1, (x) => x + 100);
    console.log("u2", u2);

    // clear清空并返回一个长度为0的新数组
    // push pop unshift shift和原生数组方法相同
    // map 同原生数组的map，循环并返回新的list
    // filter 同原生的filter，循环过滤并返回新的list
    // setSize 重新设定数组长度，小于数组长度会截断，大于原数组长度会用undefined进行填充
    // setIn()用来设定嵌套结构的值([第一层下标，第二层下标，...第N层下标], 值)
    // 同理还有deleteIn、insertIn、updateIn
    const updateInList1 = List([
      [1, 2, 3],
      [11, 22, 33],
      [111, 222, 333],
    ]);
    const updateInList2 = updateInList1.setIn([1, 1], 88);
    // const updateInList2 = updateInList1.updateIn([1, 1], x => x = 88);
    console.log("updateInList1", updateInList1);
    console.log("updateInList2", updateInList2);

    // concat连接List concat(List1, List2, List3)
    const cList1 = List([1, 2, 3]);
    const cList2 = List([4, 5, 6]);
    const cList3 = List([7, 8, 9]);
    const titoalList1 = cList1.concat(cList2, cList3);
    console.log("titoalList1", titoalList1);

    // merge是concat的别名
    const titoalList2 = cList1.merge(cList2, cList3);
    console.log("titoalList2", titoalList2);

    // flatten扁平化这个list
    const fla1 = List([
      List([1, 2, 3]),
      List([11, 22, 33]),
      List([111, 222, 333, [4444, 5555, 6666]]),
    ]);
    const fla2 = fla1.flatten(false); // false 或者numer 指定拉平的层级
    const fla3 = fla1.flatten(true); // 只拉平第一层
    console.log("fla2", fla2);
    console.log("fla3", fla3);

    // find查找，返回第一个符合的结果
    // findLast查找，返回最后一个符合的结果 findIndex findKey
    // keys返回所有下标 values返回所有的值 entries返回所有entry, [key, value]形式
    const names = List(["张三", "李四", "王五", "赵六", "李七", "李八"]);
    const names2 = names.find((value, key) => value.indexOf("李") !== -1); // 查找李姓
    const names3 = names.findLast((value, key) => value.indexOf("李") !== -1); // 查找李姓
    const names4 = names.findEntry((value, key) => value.indexOf("李") !== -1); // 查找李姓
    console.log("names2", names2); // 李四
    console.log("names3", names3); // 李八
    console.log("names4", names4); //  [1, "李四"]

    // groupBy分组
    const people = List([
      { sex: "male", name: "张三" },
      { sex: "male", name: "李四" },
      { sex: "male", name: "王五" },
      { sex: "female", name: "貂蝉" },
    ]);
    const gp = people.groupBy((x) => x.sex);
    console.log("gp", gp);
  }, []);

  return <h2>immutable List</h2>;
};

export default memo(ListDemo);
