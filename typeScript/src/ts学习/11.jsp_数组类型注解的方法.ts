(() => {
  const numberArr = [1, 2, 3, 4]; // const numberArr: number[]

  const numberArr2: Array<number> = [1, 2, 3, 4];

  const stringArr: string[] = ["1", "2", "3"];
  const undefinedArr: undefined[] = [undefined, undefined, undefined];

  const arr: (number | string)[] = [1, 2, 3, "4"]; // 包含数字和字符的数组
  const arr2: Array<number | string> = [1, 2, 3, "4"]; // 包含数字和字符的数组

  // type alias 类型别名
  // type Lady = { name: string; age: number； propName: string]: any; };
  // 用class interface都可以
  class Lady {
    name: string;
    age: number;
    [propName: string]: any;
  }
  const xiaoJieJies: Lady[] = [
    { name: "刘英", age: 18 },
    { name: "徐晓文", age: 38 },
    { name: "倪妮", age: 27, sex: "male" },
  ];
})();
