"use strict";
// 使用class关键字定义一个类
/*
  对象中主要包含了两个部分：属性、方法

  readonly开头的属性表示一个只读的属性，无法修改。
*/
class Person {
    constructor() {
        // 定义实例属性
        this.name = "孙悟空";
        this.age = 18;
    }
    // 定义实例方法
    sayHello() {
        console.log("hello" + this.name);
    }
    // 定义静态方法
    static sayNice() {
        console.log("nice");
    }
}
// 定义类属性/静态属性
Person.sex = "male";
Person.job = "coder";
const per = new Person();
console.log(per.name);
// per.name = "唐三藏"; // 无法分配到 "name" ，因为它是只读属性。
// console.log(per.name);
per.sayHello();
Person.sayNice();
