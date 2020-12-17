
### api路由
> nextjs 提供了api的一些能力，在pages/api/xxx.js
```js
  export default (req, res) => {
    req - http.IncomingMessage
    res - http.ServerResponse
  }
```
提供了`req`, `res`对象，分别是`http.IncomingMessage`，`http.ServerResponse`；
1. req    
    * `req.method` - 请求方式
    * `req.body` -（经过处理的解析成字符串）
    * `req.query` - 请求参数
    * `req.cookies` - cookie
1. res    
    * `res.statusCode` - 设置状态码
    * `res.setHeader` - 设置响应头
    * `res.end()` - 发送数据(nextjs包装的)
    * `res.status(code)` - 设置状态码的功能，code必须是有效的HTTP状态代码
    * `res.json(json)` - 发送JSON响应，json必须是有效的JSON对象
    * `res.send(body)` - 发送HTTP响应，body可以是string、object、buffer

#### 动态路由
命名以[xxx].jsx 单个参数 或 [...xxx].jsx多个参数
```js
  // [id].js
  export default (req, res) => {
    console.log(req.query); // 123
    ...
    ...
    res.send('ok');
  }
```
匹配顺序：/xxx.jsx > /[xx].js > [...xxx].jsx

#### 使用中间件
```js
  const connect = require('connect');
  const app = connect();

  app.use('中间件');
  app.use(...);
  export default app;

  // 例子
  app.use((req, res, next) => {
    console.log(req.body.value); // 123
    req.body.value = req.body.value + '456';
    next();
  })

  app.use((req, res, next) => {
    console.log(req.body.value); // 123456
    res.send('ok');
  })

```