(() => {
  // ================装饰器==================
  /**
    装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的方法。

    通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。

    常见的装饰器有：类装饰器、属性装饰器、方法装饰器、方法参数装饰器

    装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）

    装饰器是过去几年中js最大的成就之一，已是ES7的标准特性之一。

    装饰器执行顺序：
      属性 > 方法 > 方法参数 > 类
      如果有多个同样的装饰器，会从后往前执行；
   */

  // 普通装饰器 不能传参
  function logClass(target: any) {
    console.log(target);
    target.prototype.age = 18;
    target.prototype.run = () => {
      console.log("我是run方法");
    };
  }

  @logClass
  class Animal {}

  // 装饰器工厂 可传参
  function logClass2(params: string) {
    return function (target: any) {
      console.log(params); // Hello world
      console.log(target);
      target.prototype.url = params;
      target.prototype.run = () => {
        console.log("我是run方法");
      };
    };
  }

  @logClass2("Hello world")
  class Animal2 {}

  const ani: any = new Animal2();
  console.log(ani.url);
  ani.run();

  /*   
    1. 类装饰器：在类声明之前被声明（紧靠着类声明）。类装饰器应用于类构造函数，可以同来监视、修改或替换类定义。
      下面就是一个重载构造函数的例子。
        1.1类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
        1.2如果装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
  */

  function decorateLogClass(target: any) {
    console.log(target);
    return class extends target {
      apiUrl = "我是修改后的值";
      getApiUrl() {
        console.log("-----", this.apiUrl);
      }
    };
  }

  @decorateLogClass
  class HttpClient {
    public apiUrl: string;
    constructor() {
      this.apiUrl = "我是构造函数里面的apiUrl";
    }

    getApiUrl() {
      console.log(this.apiUrl);
    }
  }

  const http = new HttpClient();
  http.getApiUrl();

  /* 
    2. 属性装饰器
        属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
        2.1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象；
        2.2、成员的名字。
  */
  function logProperty(params: any) {
    return function (target: any, attr: string) {
      console.log(target);
      console.log(attr); // url
      // console.log(params); // http://www.baidu.com
      target[attr] = params;
    };
  }

  class Property {
    @logProperty("http://www.baidu.com")
    public url: any;
    getUrl() {
      console.log(this.url);
    }
  }

  const property = new Property();
  property.getUrl(); // http://www.baidu.com

  /* 
  3.方法装饰器
    它会被应用到方法的属性描述上，可以用来监视、修改或替换方法定义。
    方法装饰器在运行时会传入下列3个参数：
      3.1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象；
      3.2. 成员的名字；
      3.3. 成员的属性描述符；
*/

  function logMethod(params: any) {
    return function (target: any, methodName: string, desc: any) {
      console.log(target); // Method { getUrl: [Function] }

      // console.log(params); // http://www.baidu.com
      /*
          和其他装饰器一样 只要有target都能修改方法、属性
          target.url = params;
          target.run = () => {
            console.log("我是run方法");
          };
        */
      console.log(methodName); // getUrl
      console.log(desc);
      /* 
        {
          value: [Function],
          writable: true,
          enumerable: true,
          configurable: true
        }
      */
      console.log(desc.value); // 这个就是对应方法的具体实现 [Function]
      /*
        eg: 修改装饰器的方法 把装饰器的方法里面传入的所有参数都改为string类型
      */
      const oldMethod = desc.value;

      desc.value = function (...args: any[]) {
        // 这里进行逻辑业务处理
        args = args.map((arg) => String(arg));
        // console.log(args); //  '1', 'true', 'false', '4', '5' ]
        console.log("我是新的getUrl方法");
        oldMethod.apply(this, args); // 这里还能继续应用原来的老方法
      };
    };
  }

  class Method {
    public url: any;
    @logMethod("http://www.baidu.com")
    getUrl(...args: any[]) {
      console.log(args);
      console.log("我是老的getUrl方法");
    }
  }

  const method: any = new Method();
  method.getUrl(1, true, false, 4, 5); // [ '1', 'true', 'false', '4', '5' ]

  /* *
    4. 方法参数装饰器
      参数装饰器表达式回在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下列3个参数：
          4.1 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象；
          4.2 方法的名字；
          4.3 参数在函数参数列表中的索引；
  */

  function logParams(params: any) {
    return function (target: any, methodName: string, paramIndex: number) {
      console.log(target);
      console.log(methodName); // 方法名称 getData
      console.log(paramIndex); // 1
    };
  }

  class Params {
    getData(date, @logParams("uuid") uuid: string | number) {
      console.log("date:::", date);
      console.log("uuid:::", uuid);
    }
  }

  const params: any = new Params();
  params.getData("2021-12-02", "jbhb-2344bh8-sdcsd");
})();

function dd() {
  this.name = "sdc";
  this.run = () => {
    console.log("123");
  };
}
