// 使用class关键字定义一个类
/*
  对象中主要包含了两个部分：属性、方法

  readonly开头的属性表示一个只读的属性，无法修改。

  静态方法：普通函数挂载在类的原型上，箭头函数挂载在类本身
*/
class Person {
  // 定义实例属性
  readonly name: string = "孙悟空";
  age: number = 18;

  // 定义实例方法
  sayHello() {
    console.log("hello" + this.name);
  }

  // ----------------------------------------------
  // 定义类属性/静态属性
  static sex = "male";
  static readonly job: string = "coder";

  // 定义静态方法/类方法
  static sayNice() {
    console.log("nice");
  }
}

const per = new Person();

console.log(per.name);
// per.name = "唐三藏"; // 无法分配到 "name" ，因为它是只读属性。
// console.log(per.name);

per.sayHello();
Person.sayNice();

/**
 * Dog extends Animal
 *  - 此时，Animal被称为父类，Dog被称为子类；
 *  - 使用继承后，子类将会拥有父类所有的方法和属性；
 *  - 通过继承可以将多个类中共有的代码写在一个父类中；
 *     这样只需要写一次即可让所有的子类都同事拥有父类的属性
 *     如果希望在子类中添加一些父类中没有的属性或方法，直接加就行
 *  - 如果在子类中添加了和父类中相同的方法，则子类方法会覆盖掉父类的方法。
 *    这种子类覆盖掉父类方法的形式，我们称之为方法重写
 *
 */

/**
 * 以 abstract 开头的是抽象类
 * 抽象类和其他类区别不大，只是不能用来创建对象
 * 抽象类就是专门用来被继承的类，说人话就是只能extends，不能new
 * 抽象类中可以添加抽象方法
 */
abstract class Animal {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log("动物在叫啊！！！");
  }

  abstract eat(): void;
}

class Dog extends Animal {
  sex: string;
  constructor(name: string, age: number, sex: string) {
    // 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
    super(name, age);
    this.sex = sex;
  }

  run() {
    console.log(`${this.name}在跑！！！`);
  }

  sayHello() {
    // super.sayHello(); // 直接继承，super就表示当前类的父类
    console.log("汪汪汪！！");
  }

  eat() {
    console.log("实现抽象类中的抽象方法");
  }
}

const dog1 = new Dog("旺财", 3, "female");

dog1.run();
dog1.sayHello();

