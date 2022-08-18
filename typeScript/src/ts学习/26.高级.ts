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

  type P1 = Person[keyof Person]; // number | string;  https://blog.csdn.net/lcl130/article/details/125214788

  type p2 = Partial<Person>; // https://www.jianshu.com/p/0543bd031166FG
  /* {
    id?: number | undefined;
    name?: string | undefined;
    age?: number | undefined;
} */

type p3 = Pick<Person, 'id' | 'name'>
/**
  {
    name: string;
    id: number;
  }
*/

interface p4 extends Person {
  sex: string
}

const obj: p4  = {
  id: 1,
  name: 'jianding9',
  age: 28,
  sex: 'male'
}

type ifTrue<T> = T extends Person ? p3 : p2; // 自定义ifTrue
type t = ifTrue<p4>



})();
