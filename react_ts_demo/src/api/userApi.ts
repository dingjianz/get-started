// https://blog.csdn.net/wu_xianqiang/article/details/103483616
interface HttpType<T> {
  (url: string, value: T): Promise<T>;
}

const http: HttpType<any> = <T>(url: string, value: T): Promise<T> => {
  console.log('url----', url);
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => resolve(value));
};

const getUserInfo = (name = '张三', age = 18) => http('/hera/user/info', {
  name,
  age,
});

// eslint-disable-next-line import/prefer-default-export
export { getUserInfo };
