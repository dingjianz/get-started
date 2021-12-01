// object表示一个js对象
let i: object;
i = {};
i = function () {};

// {}用来指定对象中可以包含哪些哪些属性
// 语法： { 属性名： 属性值  }
// 在属性名后加? 表示属性是可选的
let j: { name: string; age?: number };
// j = {}; // 类型 "{}" 中缺少属性 "name"，但类型 "{ name: string; }" 中需要该属性。
// j = { name: 123 }; // 不能将类型“number”分配给类型“string”。
j = { name: "jianding9" };

/**
 * 不能将类型“{ name: string; age: number; }”分配给类型“{ name: string; }”。
 * 对象文字可以只指定已知属性，并且“age”不在类型“{ name: string; }”中。
 */
j = { name: "jianding9", age: 18 };

// [propName: string]: any 表示任意类型的属性  propName可以自定义
let k: { name: string; [propName: string]: any };
k = { name: "jianding9", a: 1, b: true }; // name必须写入，其他值自动添加

// let l: Function; // 很少这么写
// l = 123; // 不能将类型“number”分配给类型“Function”。
// let l: (a: number, b: number) => {};
let l: (a: number, b: number) => number;
l = (a: number = 1, b: number = 2): number => {
  console.log(a + b);
  return a + b;
};
// l(); // 应有 2 个参数，但获得 0 个。

/**
 * 数组的类型声明
 *   类型[]
 *   Array<类型>
 */

// string[] 表示字符串数组
let m: string[];
// m = ["1", "2", 3]; // 不能将类型“number”分配给类型“string”。
// let n: number[];
// let n: any[];
// let n: Array<number>;
// let n: Array<any>;
// let n: Array<object>;
// let n: number[];
// let n: (number | string)[]; // 包含数字和字符的数组
// let n: Array<number | string>; // 包含数字和字符的数组
// n = [1, '2'];

/**
 * 元组 tuple： 固定长度的数组
 *  语法：
 */

let o: [string, string];
// o = ["1"]; // 不能将类型“[string]”分配给类型“[string, string]”。 源具有 1 个元素，但目标需要 2 个。
// o = ["1", "2", "3"]; // 不能将类型“[string, string, string]”分配给类型“[string, string]”。源具有 3 个元素，但目标仅允许 2 个。

/**
 * enum 枚举
 */
enum Gender {
  Male = 0,
  Female = 1,
}

let p: { name: string; gender: Gender };
p = {
  name: "jianding9",
  gender: Gender.Male,
};

// console.log(p.gender === Gender.Male ? "男" : "女");

// & 表示同时 | 表示或
let q: { name: string } | { age: number };
// q = { name: "123" };
// q = { age: 13 };
let r: { name: string } & { age: number };
r = { name: "jianding9", age: 19 };

// 类型的别名
// type myType = string; // 取string没意义，但是可以取咱们自定义的
type myType = 1 | 2 | 3 | 4;
let s: myType;
let t: myType;
// s = 5; // 不能将类型“5”分配给类型“myType”。

// 描述一个对象的类型
type objType = {
  name: string;
  age: number;
  [propname: string]: any;
};

const djObj: objType = {
  name: "jianding9",
  age: 18,
};