namespace Home {
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

  interface Circle {
    area: number;
    radius?: number;
  }

  interface Rectandle {
    area: string;
    width: number;
    height: number;
  }

  type Shape = Circle | Rectandle;
  declare const s: Shape;
  s.area;
  // s.width; // 类型“Shape”上不存在属性“width”。   类型“Circle”上不存在属性“width”。
// 得到的是交集，然后同一属性会叠加

}
