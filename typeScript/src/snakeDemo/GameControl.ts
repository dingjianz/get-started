import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

// 游戏控制器 控制其他所有类
class GameControl {
  // 定义三个属性
  snake: Snake; // 蛇
  food: Food; // 食物
  scorePanel: ScorePanel; // 记分牌
  // 创建一个属性来存储蛇的移动方向，也就是键盘按键的方向
  direction: string = "";

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  // 游戏的初始化方法，调用后游戏即开始。
  init = () => {
    // 监听键盘按下的事件
    document.addEventListener("keydown", this.keydownHandler);
    this.run();
  };

  // 创建一个键盘按下的响应函数
  keydownHandler = (event: KeyboardEvent) => {
    const key = event.key;
    if (
      [
        "ArrowUp",
        "Up",
        "ArrowDown",
        "Down",
        "ArrowLeft",
        "Left",
        "ArrowRight",
        "Right",
      ].includes(key)
    ) {
      this.direction = key; // 修改direction属性
    }
  };

  // 创建蛇移动的方法
  run = () => {
    /**
     * 根据（this.direction）来使蛇的位置改变
     *     向上 top 减少
     *     向下 top 增加
     *     向左 left 减少
     *     向右 left 增加
     */
    let X = this.snake.X;
    let Y = this.snake.Y;
    // 根据按键方向，修改X、Y值
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
      default:
        break;
    }

    
    try {
      this.snake.X = X;
      this.snake.Y = Y;
      this.checkEat(X, Y);
    } catch (e) {
      this.snake.isLive = false;
      alert(e);
    }
    // 蛇的速度随着等级提高越来越快
    this.snake.isLive &&
      setTimeout(this.run, 300 - (this.scorePanel.level - 1) * 30);
  };

  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat = (X: number, Y: number) => {
    if (X === this.food.X && Y === this.food.Y) {
      console.log("蛇吃到食物了");
      this.snake.addBody();
      this.food.changePosition();
      this.scorePanel.addScore();
    }
  };
}

export default GameControl;
