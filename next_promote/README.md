# Nextjs

# node版本是 14.16.0

### `Next.js`项目配置及[`Eslint`配置](https://eslint.bootcss.com/docs/user-guide/getting-started)

```js
  npx eslint --init

"off" or 0 - 关闭规则
"warn" or 1 - 将规则视为一个警告（不会影响退出码）
"error" or 2 - 将规则视为一个错误 (退出码为1)
```



### React相关hook
```js
  useMemo、 useReducer、 useRef
```

### 1.什么是服务端渲染？
 简单来说通过服务器响应把`HTML`节点给到前台，由浏览器来解析`HTML`节点生成页面。

### 2.流行框架有什么问题？
  `Vuejs`、`Reactjs`现代流行框架，SPA(单页应用)，首屏加载慢，SEO。

### 3.为什么需要服务端渲染？
- 国内搜索引擎只能解析HTML，包括百度不能解析`js`。
- 国外谷歌搜索可以解析`js`。
- 多页应用。

### 4.什么项目适合服务端渲染?
上线需要搜索到的，比如博客，官网等等。

---
简单介绍
- 直观的基于页面的路由系统；（支持动态路由）；
- 在可能的情况下自动静态优化页面；（第二次访问比第一次快，本地缓存了）
- 自动代码拆分可加快页面加载速度；
- 内置css支持，并且支持任何css-in-js库；
- 基于webpack的开发环境，支持热模块替换（HMR）;
- 可通过社区插件椅及您自己的Babel和webpack配置进行定制；
   [官网网址](https://nextjs.org/docs/getting-started)

--- 
### [安装](https://www.nextjs.cn/docs/getting-started)
>第一种手动： `npm install next react react-dom`
  第二种自动： `npx reate-next-app`

#### 系统环境需求
  - `Node.js 10.13`或更高版本
- MacOS、Windows (包括 WSL) 和 Linux 都被支持

#### 添加scripts
```js
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```
*   `dev` - 运行 [`next dev`](https://www.nextjs.cn/docs/api-reference/cli#development)，以开发模式启动 Next.js
*   `build` - 运行 [`next build`](https://www.nextjs.cn/docs/api-reference/cli#build)，以构建用于生产环境的应用程序
*   `start` - 运行 [`next start`](https://www.nextjs.cn/docs/api-reference/cli#production)，将启动 Next.js 生产环境服务器

Next.js 是围绕着 [页面（pages）](https://www.nextjs.cn/docs/basic-features/pages) 的概念构造的。一个页面（page）就是一个从 `pages` 目录下的 `.js`、`.jsx`、`.ts` 或 `.tsx` 文件导出的 [React 组件](https://reactjs.org/docs/components-and-props.html)。
页面（page） 根据其文件名与路由关联。例如，pages/about.js 被映射到 /about。甚至可以在文件名中添加动态路由参数。

### 摘要
 #### Next.js 的两种预渲染形式。

**静态生成（推荐）：** HTML 在 构建时 生成，并在每次页面请求（request）时重用。
HTML 是在 **构建时（build time）** 生成的，并重用于每个页面请求。要使页面使用“静态生成”，只需导出（export）页面组件或导出（export） `getStaticProps` 函数（如果需要还可以导出 `getStaticPaths` 函数）。对于可以在用户请求之前预先渲染的页面来说，这非常有用。你也可以将其与客户端渲染一起使用以便引入其他数据。

**服务器端渲染：**
在**每次页面请求（request）时**重新生成 HTML。
 HTML 是在 **每个页面请求** 时生成的。要设置某个页面使用服务器端渲染，请导出（export） `getServerSideProps`函数。由于服务器端渲染会导致性能比“静态生成”慢，因此仅在绝对必要时才使用此功能。
 如果 page（页面）使用的是**服务器端渲染**，则会在**每次页面请求时**重新生成页面的 HTML 。
要对 page（页面）使用服务器端渲染，你需要 export 一个名为`getServerSideProps`的`async`函数。服务器将在每次页面请求时调用此函数。
例如，假设你的某个页面需要预渲染频繁更新的数据（从外部 API 获取）。你就可以编写`getServerSideProps` 获取该数据并将其传递给`Page`。

--- 
## 获取数据
#### Nextjs两种形式的预渲染：
### 服务端渲染
> 访问xxx路由之前，向服务器要数据，把要回来的数据和HTML加工，直接返回前台展示。
### 静态化
> 访问xxx路由之前，向服务器请求数据，将请求来的数据和HTML加工成真正的xxx.html文件。  
> 作用：下次访问同一个路由地址的时候，直接返回静态页面，减小服务器的压力，以达到性能优化的目的。

#### 获取数据的几种方式
**getInitialProps**淘汰的东西我们不讲
 
获取数据方法|  静态化  | 异步 | 只能在pages文件夹下 | 作用  | 服务端请求
:----: | :-----: | :------:  | :-----: | :------: | :-----:
getStaticProps  | 是 | 是 | 是 | 请求数据  | 是 http (非 XMLHttpRequest)
getStaticPaths  |  是 | 是 | 是 | 生成动态路由 | 是
getServerSideProps  | 否 | 是 | 是 | 请求数据  | 是


getServerSideProps() - 不静态化 - 异步 async
1. `getServerSideProps(coontext)`:
    - params: 接收`getStaticPaths()`返回的动态路径，方便请求动态数据； 
      比如 `http://localhost:10087/api/list/xxxx`
    - req: HTTP IncomingMessage 对象；
    - res: HTTP 响应对象；
    - query: 查询字符串；
2. `getServerSideProps`的返回值是一个对象，其中对象必有一个`key`值为`props`，并且这个`props`作为该组件的`props`；

getStaticProps - 会静态化 - 异步方法async

1. `getStaticProps({params, preview, previewData})`;
2. 在动态路由文件`[xxx].js`里面用;
3. `params`: 接收`getStaticPaths()` 返回的动态路径，方便请求动态数据；

    比如：`http://localhost:10087/api/list/xxxx`

4. `getStaticProps`的返回值是一个对象，其中对象必有一个`key`值为`props`，并且这个`props`作为该组件的`props`;
