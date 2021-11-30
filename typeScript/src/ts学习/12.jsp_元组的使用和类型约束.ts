(() => {
  /**
   * TS中提供了元组的概念，这个概念是JS中没有的，但是不要慌张，其实元组在开发中并不常用，一般只在数据源是csv这种文件的时候，会使用元组。
   * 可以把元组看成数组的一个加强，它可以更好的控制或者说规范里边的类型。
   */

  const xiaoJieJie: (string | number)[] = ["刘英", 18, "teacher"];
  // 上面的数组中的元素顺序更改，有可能会引起业务逻辑的报错，但是代码编译时并不会报错。

  // const xiaoJieJie2: [string, number, string] = ["刘英", "teacher", 18]; // 不能将类型“string”分配给类型“number”。ts(2322)
  const xiaoJieJie2: [string, number, string] = ["刘英", 18, "teacher"];

  // CSV数据源
  const xiaoJieJies: [string, number, string][] = [
    ["dajiao", 27, "teacher"],
    ["liuying", 18, "teacher"],
    ["xuxiaowen", 32, "teacher"],
  ];
})();
