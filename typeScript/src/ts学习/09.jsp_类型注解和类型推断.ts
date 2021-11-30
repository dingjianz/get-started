(() => {
  // type annotation 类型注解
  // type interface 类型推断

  /**
   * 简单来说，
   *     如果TS能够自动分析变量类型，那我们就什么也不需要做；
   *     如果TS无法分析变量类型，那我们就需要使用类型注解。
   */

  let count: number; // 此处 :number 就是类型注解
  count = 123;

  /**
   * 此处虽然没有显示类型注解，但鼠标悬浮上去，会自动标记countInference类型
   * 所以此处为类型推断，根据你顶
   */
  let countInference; // 类型推断 let countInference: any
  countInference = "123";

  let countInference2 = 123; //类型推断 let countInference: number

  const sum = (a: number, b: string) => {
    return a + b;
  };

  const total = sum(1, "2"); // 类型推断 const total: string

  /**
    类型推断
    const XiaoJieJie: {
      name: string;
      age: number;
    }
   */
  const XiaoJieJie = {
    name: "刘英",
    age: 18,
  };
})();
