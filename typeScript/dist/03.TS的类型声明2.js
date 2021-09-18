"use strict";
// 使用字面量进行类型申明 --- 使用不多
let d;
// d = 11; // 不能将类型“11”分配给类型“10”。
let sex; // 可以使用 | 来连接多个类型(联合类型)
sex = "male";
sex = "female";
// sex = 'nan'; // 不能将类型“"nan"”分配给类型“"male" | "female"”。
let e;
e = true;
e = "123";
e = 123;
// any表示的是任意类型，一个变量设置类型为any后，相当于对该变量关闭了TS的类型检测。
// 使用TS时，不建议使用any类型。
let f;
// let f; // 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any（隐式的any)
f = "123";
f = false;
// unknow 表示未知类型
let g;
g = 123;
g = "123";
g = false;
let h;
// f的类型是any，但h的类型是string，当any的类型的变量作为参数传递给其他变量时，也会把对应变量的类型检测关闭掉。这也是不建议使用any的原因。
h = f;
// unkown类型的变量实际就是一个类型安全的any，不能直接赋值给其他变量
// h = g; //不能将类型“unknown”直接分配给类型“string”。
/*
  语法：
    变量 as 类型
    <类型>变量
*/
if (typeof g === "string")
    h = g; // 作个类型判断就可以将类型unknow的值赋值给变量了。
// h = g as number; // 不能将类型“number”分配给类型“string”。
h = g;
h = g;
// void 用来表示空（undefined、null），以函数为例，就表示没有返回值的函数
function fn() { }
// never 表示永远不会返回结果
function fn2() {
    throw new Error('报错啦！');
}
