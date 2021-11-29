class Snake {
  // 表示蛇头
  snakeHead: HTMLElement;
  // 表示蛇的身体（包括蛇头）
  snakeBody: HTMLCollection;
  // 获取蛇的容器
  snakeWrap: HTMLElement;
  // 创建一个属性用来记录游戏是否结束
  isLive: boolean = true;

  constructor() {
    this.snakeHead = document.querySelector(".snake-item:nth-child(1)")!;
    this.snakeBody = document.getElementsByClassName("snake-item")!;
    this.snakeWrap = document.querySelector("#snake")!;
  }

  // 获取蛇头坐标
  get X() {
    return this.snakeHead.offsetLeft;
  }

  get Y() {
    return this.snakeHead.offsetTop;
  }

  // 设置蛇头坐标
  set X(value: number) {
    if (this.X === value) return;
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了！");
    }
    this.snakeHead.style.left = `${value}px`;
    // 移动身体
    this.moveSnakeBody();
  }

  set Y(value: number) {
    if (this.Y === value) return;
    if (value < 0 || value > 290) {
      // 蛇撞墙了
      throw new Error("蛇撞墙了！");
    }
    this.snakeHead.style.top = `${value}px`;
    // 移动身体
    this.moveSnakeBody();
  }

  // 增加蛇身体的方法
  addBody() {
    const snakeItem = document.createElement("li");
    snakeItem.classList.add("snake-item");
    this.snakeWrap.insertAdjacentElement("beforeend", snakeItem);
  }

  // 蛇身体移动的方法
  moveSnakeBody() {
    /**
     * 将后边蛇身体的位置设置前一块身体的位置
     *     例如：
     *        第四节 = 第三节的位置
     *        第三节 = 第二节的位置
     *        第二节 = 第一节的位置
     */
    for (let i = this.snakeBody.length - 1; i > 0; i--) {
      const X = (this.snakeBody[i - 1] as HTMLElement).offsetLeft;
      const Y = (this.snakeBody[i - 1] as HTMLElement).offsetTop;
      console.log(this.snakeBody[i]);
      (this.snakeBody[i] as HTMLElement).style.left = `${X}px`;
      (this.snakeBody[i] as HTMLElement).style.top = `${Y}px`;
    }
  }
}

export default Snake;
