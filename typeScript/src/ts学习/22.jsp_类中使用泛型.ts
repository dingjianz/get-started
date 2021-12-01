(() => {
  class SelectGirl<T> {
    constructor(private girls: T[]) {}
    getGirl(index: number): T {
      return this.girls[index];
    }
  }

  const grils = new SelectGirl<string | number>([
    "倪妮",
    "杨幂",
    "斯嘉丽",
    748,
  ]);
  console.log(grils.getGirl(2)); // 斯嘉丽
  console.log(grils.getGirl(3)); // 748

  // ============泛型的约束=============

  interface Gril {
    name: string | number;
  }

  class SelectGirl2<T extends Gril> {
    constructor(private girls: T[]) {}
    getGirl(index: number): string | number {
      return this.girls[index].name;
    }
  }

  const grils2 = new SelectGirl2<Gril>([
    {
      name: "倪妮",
    },
    {
      name: "杨幂",
    },
    {
      name: "斯嘉丽",
    },
    {
      name: 748,
    },
  ]);
  console.log(grils2.getGirl(2)); // 斯嘉丽
  console.log(grils2.getGirl(3)); // 748
})();
