(() => {
  // 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
  // http://ts.xcatliu.com/advanced/generics.html

  type argType = string | number;

  function join(one: argType, two: argType) {
    return `${one}${two}`;
  }

  join("jspang", ".com");

  // ================================================
  // 需求： 若我需要join函数中的两个形参的类型必须保持一致，若为string，则都为string
  // join("jspang", 123); 这种就不行

  function add<JSPang>(one: JSPang, two: JSPang) {
    return `${one}${two}`;
  }

  // add(1, '2'); // 类型“string”的参数不能赋给类型“number”的参数。
  add(1, 2);
  // add<string>(1, 2); // 类型“number”的参数不能赋给类型“string”的参数。
  add<number>(1, 2); // 建议指定泛型，降低出错概率

  // ===============泛型中数组的使用==================
  function joinArray<ANY>(param: ANY[]) {
    return param.join("-");
  }
  const r = joinArray<string>(["1", "2", "3", "4", "5"]);
  console.log(r); // 1-2-3-4-5

  // ================================================
  // 下例中，我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
  function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
      target[id] = (<T>source)[id];
    }
    return target;
  }
  let x = { a: 1, b: 2, c: 3, d: 4 };
  copyFields(x, { b: 10, d: 20 });
  console.log(x);

  // ================================================
  // 泛型接口
  // 之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;
  mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
  };

  // 当然也可以使用含有泛型的接口来定义函数的形状：
  interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
  }

  let createArray: CreateArrayFunc;
  createArray = function <T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      (result[i] as T) = value;
    }
    return result;
  };

  console.log(createArray<string>(3, "x")); // ['x', 'x', 'x']
})();
