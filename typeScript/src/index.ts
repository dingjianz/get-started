import "babel-polyfill";
// import Food from "./snakeDemo/Food";
// import ScorePanel from "./snakeDemo/ScorePanel";
// import Snake from "./snakeDemo/Snake";

import GameControl from "./snakeDemo/GameControl";

import "./style/index.scss";

const gc = new GameControl();
// setInterval(() => {
//   console.log(gc.direction);
// }, 1000);

// 测试食物代码
// const food = new Food();
// console.log(food.X, food.Y);
// food.changePosition();
// console.log(food.X, food.Y);

// 测试计分板代码
// const scorePanel = new ScorePanel();
// for (let i = 0; i < 200; i++) {
//   scorePanel.addScore();
// }

// 测试蛇代码
// const snake = new Snake();
// snake.addBody();
