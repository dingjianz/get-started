(() => {
  /**
   * 数组的类型声明
   *   类型[]
   *   Array<类型>
   */

  // string[] 表示字符串数组
  // const m: string[];
  // m = ["1", "2", 3]; // 不能将类型“number”分配给类型“string”。
  // let n: number[];
  // let n: any[];
  // let n: Array<number>;
  // let n: Array<any>;
  // let n: Array<object>;
  // let n: number[];
  // let n: (number | string)[]; // 包含数字和字符的数组
  // let n: Array<number | string>; // 包含数字和字符的数组
  // n = [1, '2'];

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
