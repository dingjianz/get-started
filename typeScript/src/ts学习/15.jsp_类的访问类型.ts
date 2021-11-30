(() => {
  // 类的访问类型：private public protected
  /**
   * public修饰的属性可以在任意位置访问（修改）, 默认值；
   * private 私有属性，只能在类内部进行访问（修改）；
   *        - 通过在类中添加方法使得私有属性可以被外部访问、修改
   * protected受保护的属性，只能在当前类和继承当前类的子类中访问 、修改；
   */

  // 类的内部和类的外部
  class Person {
    // 类的内部
    name: string;
    // public name: string; // 等同于上行代码

    private age: number = 18; // 只能在类的内部调用和修改
    protected sex: "male" | "femal" = "male";

    public sayHello() {
      console.log(this.name + " 你好鸭");
      // this.age = 27; // 修改类的私有属性
      console.log(this.name + "今年" + this.age + "岁");
    }
  }

  class Teacher extends Person {
    sayByeBye() {
      // this.age = 88; // 属性“age”为私有属性，只能在类“Person”中访问。
    }
  }

  const person = new Person();
  person.name = "jspang";
  // person.age = 18; // 属性“age”为私有属性，只能在类“Person”中访问。
  person.sayHello();
})();
