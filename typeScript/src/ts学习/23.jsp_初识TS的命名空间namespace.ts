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
}
