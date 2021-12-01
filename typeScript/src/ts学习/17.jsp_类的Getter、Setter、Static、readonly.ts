(() => {
  class XiaoJieJie {
    constructor(private _age: number) {}

    // Getter Setter
    get age() {
      return this._age - 10; // 可以在这里对数据进行处理
    }

    set age(val: number) {
      this._age = val + 3; // 可以在这里对数据进行处理
    }
  }

  const xiaoJieJie = new XiaoJieJie(18);

  // console.log(xiaoJieJie._age); // 属性“_age”为私有属性，只能在类“XiaoJieJie”中访问。

  console.log(xiaoJieJie.age); // 8 可以正常访问
  xiaoJieJie.age = 28; // 可以正常设置

  // =========================================
  // static
  class Girl {
    // 实例方法
    sayLove() {
      return "I love U";
    }

    // 静态方法
    static sayHello() {
      return "hello world";
    }
    // 实例属性
    sex = "male";
    // 静态属性
    static userName = "徐晓雯";
  }

  const girl = new Girl();
  console.log(girl.sayLove()); // I love U
  console.log(Girl.sayHello()); // hello world
  console.log(girl.sex); // male
  console.log(Girl.userName); // 徐晓雯

  // =========================================
  // readonly 只读属性
  class Person {
    constructor(public readonly _name: string) {}

    // set name(val: string) {
    //   this._name = val; // // 无法分配到 "name" ，因为它是只读属性。
    // }
  }

  const person = new Person("梁朝伟");
  console.log(person._name); // 梁朝伟
  // person._name = "刘德华"; // 无法分配到 "name" ，因为它是只读属性。
})();
