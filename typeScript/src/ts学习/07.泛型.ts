(() => {
  /**
   * http://ts.xcatliu.com/advanced/generics.html
  function fn(a: any): any {
      return a;
    }

  在定义函数或类的时候，如果遇到类型不明确就可以使用泛型
 */

  function fn<T>(a: T): T {
    return a;
  }

  // 可以直接调用具有泛型的函数，使用any，ts会关闭类型检查，也能体现出输入/输出的类型相同
  fn(10); // 不指定泛型，TS可以自动对类型进行推断
  fn<string>("hello world"); // 指定泛型

  // 泛型可以指定多个
  function fn2<T, K>(a: T, b: K): T {
    console.log(b);
    return a;
  }

  fn2(10, "hello world");
  fn2<number, string>(10, "hello world"); // 建议手动加上泛型，降低出错的机率

  // T extends Inter 表示泛型T必须时Inter的实现类（或者说子类）
  interface Inter {
    length: number;
  }

  function fn3<T extends Inter>(a: T): number {
    return a.length;
  }

  console.log(fn3("hello world")); // 11

  class Myclass<T> {
    name: T;
    constructor(name: T) {
      this.name = name;
    }
  }

  const mc = new Myclass<string>("jianding9");
})();
