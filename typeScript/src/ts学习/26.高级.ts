(() => {
  interface Foo {
    name: string;
    age?: number;
  }
  type Bar = Record<keyof Foo, string>;

  type Person = {
    id: number;
    name: string;
    age: number;
  };

  type P0 = keyof Person; // 相当于联合类型：'id' | 'name' | 'age'
  const j2: P0 = "id";

  type P1 = Person[keyof Person]; // number | string;  https://blog.csdn.net/lcl130/article/details/125214788

  type p2 = Partial<Person>; // https://www.jianshu.com/p/0543bd031166FG
  /* {
    id?: number | undefined;
    name?: string | undefined;
    age?: number | undefined;
} */

  type p3 = Pick<Person, "id" | "name">;
  /**
  {
    name: string;
    id: number;
  }
*/

  interface p4 extends Person {
    sex: string;
  }

  const obj: p4 = {
    id: 1,
    name: "jianding9",
    age: 28,
    sex: "male",
  };

  type ifTrue<T> = T extends Person ? p3 : p2; // 自定义ifTrue
  type t = ifTrue<p4>;

  // -------------------鸭子类型-----------------------------------

  interface P {
    name: string;
  }

  interface J extends P {
    age: 18;
  }

  const j: J = {
    name: "sd",
    age: 18,
  };

  function test(value: P) {
    console.log(value);
  }

  test(j); // 鸭子类型（duck typing），不在乎你传入的类型是否是Base 类型  但是只要符合接口的要求 有一个number类型的id,  直接传入{ name: "sd", age: 18, } 会报错，但是传入j 就不会报错

  // -------------
  // ReadonlyArray  只读数组类型 https://www.cnblogs.com/chuchublog/p/16425954.html

  // ---------
  // JS中的typeof是在runtime时运行的，TS中的typeof是在静态环境中运行的
  // 这里的typeof就是读取http的类型, Parameters读取函数中参数的类型

  interface IConfig extends RequestInit {
    token?: string;
    data?: object;
  }
  const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: IConfig
  ) => {};

  const fn: typeof http = () => {};
  /* 
    const fn: (endpoint: string, { data, token, headers, ...customConfig }: IConfig) => Promise<void>
  */

  const argus: Parameters<typeof http> = [123, {}];
  /* 
      const fn2: [string, IConfig]
    */


  // https://blog.csdn.net/weixin_45389051/article/details/118250554 ts中箭头函数使用泛型
  function fn3<T>(value: T): T {
    return value
  }

  fn3<number>('123')

  const fn4 = <T>(value: T): T => {
    return value
  }
  fn4<number>('123')
})();
