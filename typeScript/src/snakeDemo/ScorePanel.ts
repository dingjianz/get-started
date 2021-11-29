class ScorePanel {
  // score和level用来记录分数和等级
  score = 0;
  level = 1;

  // 分数和等级所在的元素，在构造函数中进行初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 设置一个变量限制等级
  maxLevel: number;
  // 设置一个变量表示多少分升级
  upScore: number;

  constructor(maxLevel = 10, upScore = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }

  // 设置加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";
    // 判断分数多少升级
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 设置提升等级的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}

export default ScorePanel;
