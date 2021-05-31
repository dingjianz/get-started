import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Map, List } from "immutable";

const ImmutableDemo = () => {
  const history = useHistory();

  // 跳转redux页面
  const turnToReduxPage = () => {
    history.push("/");
  };

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

    /**************************************************** */
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
    // set方法用来设定指定下标的值，set(下标, 值)，其中下表可以超出size
    const list3 = list.set(0, 999)
    console.log('list3', list3)
    /**************************************************** */

    /**************************************************** */
  }, []);

  return (
    <div>
      <hr />
      <button onClick={turnToReduxPage}>跳转redux</button>
    </div>
  );
};

export default memo(ImmutableDemo);
