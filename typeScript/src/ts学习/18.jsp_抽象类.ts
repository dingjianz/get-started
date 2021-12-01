(() => {
  // 抽象类
  /**
   * 以 abstract 开头的是抽象类
   * 抽象类和其他类区别不大，只是不能用来创建对象
   * 抽象类就是专门用来被继承的类，说人话就是只能extends，不能new
   * 抽象类中可以添加抽象方法
   */
  abstract class Girl {
    abstract skill(); // 方法“skill”不能具有实现，因为它标记为抽象。
  }

  class Waiter extends Girl {
    // 继承抽象类，若有抽象方法则必须手动具体实现
    skill() {
      console.log("大爷，我是服务员，请喝水！");
    }
  }

  class BasicTechnician extends Girl {
    skill() {
      console.log("大爷，我是基础技师，需要泰式按摩吗？");
    }
  }

  class SenniorTechnician extends Girl {
    skill() {
      console.log("大爷，我是高级技师，需要SAP全身按摩吗？");
    }
  }

  // const person = new Girl(); // 无法创建抽象类的实例。
})();
