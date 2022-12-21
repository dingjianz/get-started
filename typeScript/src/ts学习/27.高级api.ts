(() => {
  type IType1 = {
    name: string;
    age: number;
    married: boolean;
  };

  type IType2 = Record<keyof IType1, boolean>;

  /* 
    Exclude 和 Extract 核心观念就是筛选第一个参数
    Exclude 筛选掉 出现在第二个参数里的值
    Extract 筛选掉 没出现在第二个参数里的值
  */
  // Exclude是TS中的一个高级类型，其作用是从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。
  type J = Exclude<"1", "1" | "2">; // never
  type A = Exclude<"key1" | "key2", "key2">; // 'key1'

  // 高级类型Extract和上面的Exclude刚好相反，它是将第二个参数的联合项从第一个参数的联合项中提取出来，当然，第二个参数可以含有第一个参数没有的项。
  type A1 = Extract<"key1" | "key2", "key2" | "key3">; // 'key2'

  type P<T> = T extends "x" ? string : number;
  type A3 = P<"x" | "y">;

  // Pick 和 Omit 针对于对象的类型

})();
