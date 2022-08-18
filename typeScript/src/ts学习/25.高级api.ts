// https://blog.csdn.net/wu_xianqiang/article/details/115425818

/* 
  内置类型：
    Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
    Extract<T, U> -- 提取T中可以赋值给U的类型。
    NonNullable<T> -- 从T中剔除null和undefined。
    ReturnType<T> -- 获取函数返回值类型。
    InstanceType<T> -- 获取构造函数类型的实例类型。
*/


// TS进阶之keyof
// https://blog.csdn.net/lcl130/article/details/125214788

interface Dj {
  [key: string]: string
}

// Omit https://blog.csdn.net/z591102/article/details/124944229