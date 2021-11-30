(() => {
  class Lady {
    content = "hello world";
    sayHello() {
      return this.content;
    }
  }

  // const lady = new Lady();
  // console.log(lady.sayHello());

  class XiaoJieJie extends Lady {
    // 重写
    sayHello(): string {
      // 也可以用supe关键字
      return super.sayHello() + "再见世界";
    }
    sayLove(): string {
      return "I love U";
    }
  }

  const jiejie = new XiaoJieJie();
  console.log(jiejie.sayHello());
  console.log(jiejie.sayLove());
})();
