(() => {
  interface IProps {
    name: string;
    age: number;
    class: number;
  }

  // 自定义 tyoescript的Utility Types

  // 设置某些类型可选
  type CustomPartial<T, K extends keyof T> = {
    [P in K]?: T[P];
  } & Omit<T, K>;

  // 设置某些类型必选
  type CustomRequired<T, K extends keyof T> = {
    [P in K]-?: T[P];
  } & Omit<T, K>;

  type IProps2 = CustomPartial<IProps, "age">;

  const item: IProps2 = {
    name: "jianding9",
    class: 7,
  };
})();
