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
  type P = keyof Person; // type P = 'id' | 'name' | 'age'
  const s: P = "id";

  type Mapish = { [k: string]: boolean };
  type M = keyof Mapish; // type M = 'number' | 'string'
  const s2: M = 12;

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

  const item = {
    name: "xxx",
    age: 123,
  };

  type IType = typeof item; // 实践：typeof 的用法返回某类数据的类型

  type Predicate = (x: number) => boolean;
  type K = ReturnType<Predicate>; // type K = boolean
  // 实践： ReturnType 接收的是一个类型， typeof 接收的是一个值

  const fnk = (x): K => {
    return x > 0.5 ? true : false;
  };

  function fnk2(x: number): boolean {
    return x > 0.5 ? true : false;
  }

  function f() {
    return { x: 10, y: 3 };
  }
  // type P = ReturnType<f>;
  // 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
  // 可以结合 typeof 和 ReturnType使用

  type Q = ReturnType<typeof f>;
  const item3: Q = {
    x: 22,
    y: 322,
  };

  class Person2 {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    getName() {
      console.log(this.name);
    }
  }
  // 获取函数的参数类型
  type Params = ConstructorParameters<typeof Person2>; // type Params = [name: string]

  function getUser(name: string, age: number) {
    return { name, age };
  }

  type GetUserType = typeof getUser;
  type ReturnUser = Parameters<GetUserType>; // type ReturnUser = [name: string, age: number]

  type Person3 = { age: number; name: string; alive: boolean };
  type Age = Person3["age"]; // number

  // ==================================
  // https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
  const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];

  type Person4 = typeof MyArray[number]; // type Person = {name: string;age: number;}
  const r4: Person4 = { name: "jianding9", age: 12 };

  type Age2 = typeof MyArray[number]["age"]; // type Age2 = string

  // ===========================================

  type OnlyBoolsAndHorses = {
    [key: string]: boolean | { name: string };
  };

  const conforms: OnlyBoolsAndHorses = {
    del: true,
    rodney: false,
    obj: {
      name: "jianding9",
    },
  };

  type OptionsFlags<Type> = {
    readonly [Property in keyof Type]: boolean;
  };

  const r5: OptionsFlags<OnlyBoolsAndHorses> = {
    del: true,
    rodney: false,
    obj: false,
  };
  // r5.del = false // 类型“OptionsFlags<OnlyBoolsAndHorses>”中的索引签名仅允许读取。ts(2542)

  // Removes 'readonly' attributes from a type's properties
  // -readonly 去除 readonly
  type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
  };

  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };
  type UnlockedAccount = CreateMutable<LockedAccount>;
  /* 
  type UnlockedAccount = {
    id: string;
    name: string;
  }
  */

  // https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
  // Removes 'optional' attributes from a type's properties
  // -? 去除可选 每项都是必须项
  type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
  };

  type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
  };

  type User2 = Concrete<MaybeUser>;
  /* 
    type User2 = {
      id: string;
      name: string;
      age: number;
    };
  */
  interface Circle {
    kind: "circle";
    radius: number;
  }

  type T1 = Exclude<keyof Circle, 'kind'> // 'radius'

  type Circle2 = Omit<Circle, 'kind'>
  type T2 = Partial<Circle2>
  /* 
    type T2 = {
      radius?: number | undefined;
    }
  */
})();
