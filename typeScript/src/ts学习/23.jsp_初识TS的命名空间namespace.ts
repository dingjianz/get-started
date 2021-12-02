// 一个文件可以多个命名空间，也可以export外部引用
export namespace Home {
  // https://www.bilibili.com/video/BV1yt411e7xV?p=18
  class Header {
    constructor() {
      console.log("我是头部");
    }
  }

  class Content {
    constructor() {
      console.log("我是身体");
    }
  }

  class Footer {
    constructor() {
      console.log("我是脚部");
    }
  }

  export class Page {
    constructor() {
      new Header();
      new Content();
      new Footer();
    }
  }
  /**
   * 在外层调用的时候： new Home.Page() 
      Home.Header // undefined
      Home.Content // undefined
      Home.Footer // undefined
   */
}

export namespace Animal {
  interface myInterface {
    name: string;
    age: number;
  }

  export class Cat implements
}
