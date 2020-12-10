# Nextjs

### `Next.js`项目配置及`Eslint`配置

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
- 多页应用

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

