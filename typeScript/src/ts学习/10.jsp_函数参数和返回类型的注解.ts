(() => {
  // https://www.bilibili.com/video/BV1qV41167VD?p=5&spm_id_from=pageDriver

  const sum = (a: number, b: number): number => {
    // return a + b + ""; // 不能将类型“string”分配给类型“number”。ts(2322)
    return a + b;
  };

  function errFunction(): never {
    throw new Error();
    // console.log("永远执行不到这一行"); // ctrl + s以后会自动删掉这一行
  }
  function forNever(): never {
    while (true) {}
    // console.log("永远执行不到这一行"); // ctrl + s以后会自动删掉这一行
  }

  function add({ one, two }: { one: number; two: number }) {
    return one + two;
  }

  const total = add({ one: 1, two: 2 });

  // 运用接口
  interface paramsType {
    one: number;
    two: number;
  }
  // type paramsType = {
  //   one: number;
  //   two: number;
  // };

  function add2({ one, two }: paramsType) {
    return one + two;
  }

  const total2 = add2({ one: 1, two: 2 });
})();
