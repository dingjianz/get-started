module.exports = {
  // reactStrictMode: true,
  env: {
    Title: process.env.title,
  },
  async rewrites() {
    return [
      // 默认使用定义在pages下的路由，否则将代理到 https://www.nextjs.cn/，需要注意的是pages下定义的路由有最高优先级。
      // {
      //   source: "/dashboard/:bid",
      //   destination: "http://www.baidu.com",
      // },
      {
        source: "/:path*",
        destination: "/:path*" + "?name=jianding9",
      },
    ];
  },
};
