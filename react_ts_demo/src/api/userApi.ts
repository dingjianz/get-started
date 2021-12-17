import { promises } from "dns";

// https://blog.csdn.net/wu_xianqiang/article/details/103483616
interface HttpType<T> {
  (url: string, value: T): Promise<T>;
}

let http: HttpType<any>;
http = <T>(url: string, value: T): Promise<T> => {
  console.log("url----", url);
  return new Promise((resolve) => resolve(value));
};

const getUserInfo = (name: string = "张三", age: number = 18) => {
  return http("/hera/user/info", {
    name,
    age,
  });
};

export { getUserInfo };
