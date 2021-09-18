"use strict";
// object表示一个js对象
let i;
i = {};
i = function () { };
// {}用来指定对象中可以包含哪些哪些属性
// 语法： { 属性名： 属性值  }
// 在属性名后加? 表示属性是可选的
let j;
// j = {}; // 类型 "{}" 中缺少属性 "name"，但类型 "{ name: string; }" 中需要该属性。
// j = { name: 123 }; // 不能将类型“number”分配给类型“string”。
j = { name: "jianding9" };
/**
 * 不能将类型“{ name: string; age: number; }”分配给类型“{ name: string; }”。
 * 对象文字可以只指定已知属性，并且“age”不在类型“{ name: string; }”中。
 */
j = { name: "jianding9", age: 18 };
// [propName: string]: any 表示任意类型的属性  propName可以自定义
let k;
k = { name: "jianding9", a: 1, b: true }; // name必须写入，其他值自动添加
// let l: Function; // 很少这么写
// l = 123; // 不能将类型“number”分配给类型“Function”。
// let l: (a: number, b: number) => {};
let l;
l = (a = 1, b = 2) => {
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
let m;
// m = ["1", "2", 3]; // 不能将类型“number”分配给类型“string”。
// let n: number[];
// let n: any[];
// let n: Array<number>;
// let n: Array<any>;
// let n: Array<object>;
// let n: number[];
// n = [1, '2'];
/**
 * 元组 tuple： 固定长度的数组
 *  语法：
 */
let o;
// o = ["1"]; // 不能将类型“[string]”分配给类型“[string, string]”。 源具有 1 个元素，但目标需要 2 个。
// o = ["1", "2", "3"]; // 不能将类型“[string, string, string]”分配给类型“[string, string]”。源具有 3 个元素，但目标仅允许 2 个。
/**
 * enum 枚举
 */
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
let p;
p = {
    name: "jianding9",
    gender: Gender.Male,
};
// console.log(p.gender === Gender.Male ? "男" : "女");
// & 表示同时 | 表示或
let q;
// q = { name: "123" };
// q = { age: 13 };
let r;
r = { name: "jianding9", age: 19 };
let s;
let t;
// s = 5; // 不能将类型“5”分配给类型“myType”。
