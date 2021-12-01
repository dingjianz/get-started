(() => {
  interface Waiter {
    anjiao: true; // 限制输入true
    say(): void;
  }

  interface Teacher {
    anjiao: false;
    teach(): void;
  }

  // 联合类型  const sex: "male" | "female" = "male";
  function judgeWho(person: Waiter | Teacher) {
    // person.say(); // 报错：类型“Teacher”上不存在属性“say”

    // 类型保护 --->方式1：类型断言
    /* 
    类型断言
      语法：
        变量 as 类型
        <类型>变量
    */
    if (person.anjiao) {
      (person as Waiter).say();
    } else {
      (<Teacher>person).teach();
    }

    // 类型保护 --->方式2：自：判断属性是否存在
    if ("say" in person) {
      person.say();
    } else {
      person.teach();
    }
  }

  judgeWho({
    anjiao: false,
    teach() {
      console.log("我是teach方法");
    },
  });

  // 类型保护 ---》 方式3： typeof 判断
  function add(one: string | number, two: string | number) {
    // return one + two; // 运算符“+”不能应用于类型“string | number”和“string | number”。
    if (typeof one === "string" || typeof two === "string") {
      return `${one}${two}`;
    }
    return one + two;
  }

  // 类型保护 ---》 方式4： instanceof 判断
  class NumberObj {
    count: number;
  }

  function addObj(one: object | NumberObj, two: object | NumberObj) {
    // return one.count + two.count; //   类型“object”上不存在属性“count”。
    if (one instanceof NumberObj && two instanceof NumberObj) {
      return one.count + two.count;
    }
    return 0;
  }
})();
