(() => {
  class Person {
    // public name: string;
    // constructor(name: string) {
    //   this.name = name;
    // }
    constructor(public name: string) {}
  }

  class Teacher extends Person {
    constructor(public age: number) {
      super("徐晓雯");
    }
  }

  const person = new Person("刘英");
  console.log(person.name);
})();
