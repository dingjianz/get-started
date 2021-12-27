/**
 * 接口用来定义一个类结构，用来定义一个类中应该包含哪些属性和方法
 *    同时接口也可以当成类型声明去使用(type)
 * 接口可以在定义类的时候去限制类的结构
 *     接口中的所有的属性都不能有实际的值
 *     接口只定义对象的结构，而不考虑实际值
 */

// 自： type和interface几乎一样，有个区别就是interface只能跟对象，定义对象的数据结构，而type可以定义任何类型数据结构

// https://www.jianshu.com/p/a0fa95b68ddf

type mytype = {
  name: string;
};

type mytype2 = mytype & {
  age: number;
}; // 取得是合集

const p1: mytype2 = {
  name: "路人甲",
  age: 18,
};

// 1. 属性接口 对json进行约束
interface myInterface {
  name: string;
}

// 可以多次叠加同一个接口，但属性不能叠加
interface myInterface {
  sex: string;
  // sayHello: () => void;
  sayHello(): void;
}

interface myInterface2 extends myInterface {
  age: number;
}

const p3: myInterface2 = {
  age: 18,
  name: "张三",
  sex: "male",
  sayHello() {
    console.log("hello world");
  },
};

/**
 * 定义类时，可以使类去实现一个接口
 *      实现接口就是使类满足接口的要求
 */

class MyClass implements myInterface {
  name: string;
  sex: string;
  constructor(name: string, sex: string) {
    this.name = name;
    this.sex = sex;
  }
  sayHello() {
    console.log("大家好");
  }
}
