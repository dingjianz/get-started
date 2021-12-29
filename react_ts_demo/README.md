### React + TS 项目学习

### CSS 模块化

> 直接把 css 后缀名改为 .module.scss 即可

### 移动端适配

```js
cnpm i postcss-pxtorem@5.1.1 -D

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      var ua = navigator.userAgent;
      if (!/(iPhone|iPad|iPod|iOS)/i.test(ua) && !/(Android)/i.test(ua)) {
        docEl.style.fontSize = 16 + "px";
      } else {
        docEl.style.fontSize = 16 * (clientWidth / 375) + "px"; // 针对于设计稿375
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

addPostcssPlugins([
  require("postcss-pxtorem")({
    rootValue: 16, // 换算的基数
    unitPrecision: 5,
    propWhiteList: [], // 哪些需要进行px转rem
    minPixelValue: 2, // 最小转换，如低于 4px的不会进行转成rem
    selectorBlackList: ["am-"], // 排除哪些开头的如 .weui-button 等等
  }),
]);
```

### 本地起服务 pm2 后台运行

```js
cnpm i pm2 -g
创建server.js文件
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(9000);

pm2 start server.js

停止的时候 pm2 list 看对应id
pm2 stop id // pm2 stop 0

```

### types 设置

> tsconfig.json 里面设置 typeRoots 属性，@types 下面的文件定义的接口不需要引用，可以直接使用
> tsconfig.path.json 定义 alias，不能在 tsconfig.json 直接写，会被直接覆盖删除掉
