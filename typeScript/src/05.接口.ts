/**
 * 接口用来定义一个类结构，用来定义一个类中应该包含哪些属性和方法
 *    同时接口也可以当成类型声明去使用(type)
 * 接口可以在定义类的时候去限制类的结构
 *     接口中的所有的属性都不能有实际的值
 *     接口只定义对象的结构，而不考虑实际值
 */

type mytype = {
  name: string;
};

interface myInterface {
  name: string;
}

// 可以多次叠加
interface myInterface {
  sex: string;
  sayHello(): void;
}

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
