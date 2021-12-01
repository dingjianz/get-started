(() => {
  class Person {
    // TS可以在属性前面添加属性的修饰符
    /**
     * public修饰的属性可以在任意位置访问（修改）, 默认值；
     * protected受保护的属性，只能在当前类和继承当前类的子类中访问 、修改；
     * private 私有属性，只能在类内部进行访问（修改）；
     *        - 通过在类中添加方法使得私有属性可以被外部访问、修改
     */

    // public _name: string;
    // private _age: number;
    // protected _sex: string;
    // constructor(name: string, age: number, sex: string) {
    //   this._name = name;
    //   this._age = age;
    //   this._sex = sex;
    // }

    // 下面的写法等同于上面的
    constructor(
      public _name: string,
      private _age: number,
      protected _sex: string
    ) {}

    /**
     * getter方法用来读取属性
     * setter方法用来设置属性
     *    -- 它们被称为属性的存取器
     */

    // 定义方法，用来获取age属性
    // getAge() {
    //   return this._age;
    // }

    // 定义方法，用来设置age属性
    // setAge(val: number) {
    //   if (val >= 0) this._age = val;
    // }

    // TS中设置getter方法的方式
    get age() {
      return this._age;
    }

    // TS中设置setter方法的方式
    set age(val: number) {
      if (val >= 0) this._age = val;
    }
  }

  const per = new Person("孙悟空", 500, "male");
  /**
   * 现在属性是在对象中设置的，属性可以任意的被修改
   * 属性可以任意被修改会导致对象中的数据变得非常不安全
   */
  per._name = "猪八戒";
  // per._age = 20; // 属性“_age”为私有属性，只能在类“Person”中修改。
  // console.log(per._age); // 属性“_age”为私有属性，只能在类“Person”中访问。

  // per.setAge(-27);
  // console.log(per.getAge());

  per.age = 33;
  console.log(per.age);

  class Person_2 extends Person { // 子类
    printSex() {
      console.log(this._sex);
    }
  }

  const per_2 = new Person_2("刘德华", 58, "male");
  per_2.printSex();
})();
