// static typing 静态类型
let count: number = 1;

interface Xiaojiejie {
  username: string;
  age: number;
}

const xiaohong: Xiaojiejie = {
  username: "小红",
  age: 18,
};

console.log(xiaohong);

// 基础静态类型 number string null undefined boolean void symbol
const count2: number = 123;
const myName: string = "jspang";

// =============================================================
// 对象静态类型: 对象类型 数组类型 类类型 函数类型
const xiaozi: {
  name: string;
  age: number;
} = {
  name: "小紫",
  age: 18,
};

const xiaoJieJies: string[] = ["小红", "小紫", "小文"]; // 字符串数组
const xiaoJieJies2: Array<string> = ["小红", "小紫", "小文"]; // 字符串数组

class Person2 {}
const dajiao: Person2 = new Person2();

const jiandajiao: () => string = () => "大脚我爱你"; // 定义一个函数并且返回string
