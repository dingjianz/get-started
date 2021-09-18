"use strict";
// 声明一个变量a，同时指定它的类型为number；
let a;
// a的类型为number，在以后的使用过程中a的值只能是数字。
a = 10;
a = 100;
// a = '1000';  // 这里就会报错 a下面出现红色波浪线：不能将类型“string”分配给类型“number”。
let b = "123";
// let c: boolean = false;
// let c = false; // 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测，效果等同于上行代码。
// c = 1223;
const sum = (a = 666, b = 111) => {
    return a + b;
};
console.log(sum(123, 456));
