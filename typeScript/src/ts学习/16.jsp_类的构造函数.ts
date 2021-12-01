(() => {
  class Person {
    // public name: string;
    // constructor(name: string) {
    //   this.name = name;
    // }
    constructor(public name: string) {} // 等同于上文
  }

  const person = new Person("刘英");
  console.log(person.name);

  class Teacher extends Person {
    constructor(public age: number) {
      super("徐晓雯"); // 派生类的构造函数必须包含 "super" 调用。
    }
  }

  const teacher = new Teacher(18);
  console.log(teacher.age);
  console.log(teacher.name);
})();
