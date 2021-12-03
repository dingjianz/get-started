(() => {
  //简历处理函数
  // const screeResume = (name: string, age: number, bust: number) => {
  //   age < 24 && bust >= 90 && console.log(name + "进入面试");
  //   (age >= 24 || bust < 90) && console.log(name + "你被淘汰");
  // };

  // 获取简历信息
  // const getResume = (name: string, age: number, bust: number) => {
  //   console.log(name + "年龄是" + age);
  //   console.log(name + "胸围是" + bust);
  // };

  // screeResume("刘英", 18, 84);
  // getResume("刘英", 18, 84);

  // 以上代码很多重复，参数注解可以优化
  interface Girl {
    name: string;
    age: number;
    bust: number;
    waistline?: number; // 不作为必传项
    [propName: string]: any; // 任何属性：任何类型的值
    say(): string;
  }

  const girl = {
    name: "刘英",
    age: 18,
    bust: 84,
    waistline: 46,
    say() {
      return "欢迎光临，红浪漫洗浴中心！！";
    },
  };

  const screeResume = (girl: Girl) => {
    const { name, age, bust } = girl;
    age < 24 && bust >= 90 && console.log(name + "进入面试");
    (age >= 24 || bust < 90) && console.log(name + "你被淘汰");
  };

  const getResume = (girl: Girl) => {
    const { name, age, bust, waistline } = girl;
    console.log(name + "年龄是" + age);
    console.log(name + "胸围是" + bust);
    waistline && console.log(name + "腰围是" + waistline);
  };

  screeResume(girl);
  getResume(girl);

  // interface可以继承（extends）类（class）
  // 所以既可以将 XiaoJieJie 当做一个类来用，也可以将 XiaoJieJie 当做一个类型来用
  /**
   * https://www.cnblogs.com/kunmomo/p/15272705.html
   * 
    1. 接口不能实现(implements)接口或者类: 所以实现(implements )只能用于类身上,即类可以实现(implements )接口或类
    2. 接口可以继承(extends)接口或类
    3. 类不可以继承(extends)接口，类只能继承(extends)类
    可多继承(extends)或者多实现 (implements )
   */

  interface Teacher extends Girl {
    // 接口继承接口
    teach(): string;
  }

  class XiaoJieJie implements Girl {
    // 类实现接口
    name: string = "刘英";
    age = 18;
    bust = 84;
    waistline = 46;
    say() {
      return "欢迎光临，红浪漫洗浴中心！！";
    }
  }

  interface NewGirlType extends XiaoJieJie {
    // 接口继承类
    color: string;
  }

  const newGirl: NewGirlType = {
    color: "red",
    name: "徐晓雯",
    age: 18,
    bust: 90,
    waistline: 47,
    say() {
      return "hello world";
    },
  };

  class User implements NewGirlType {
    // 类实现接口
    color: string;
    name: string;
    age: number;
    bust: number;
    waistline: number;
    say(): string {
      return "hello world";
    }
  }

  // 用接口定义函数的形状
  interface mySearchFn {
    (one: number, two: number): boolean;
  }

  const fn: mySearchFn = (one, two) => {
    return one < two;
  };
  fn(1, 2);
})();
