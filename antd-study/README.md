# 项目介绍

## node版本 ---> 14.17.3

## 如何添加新页面 只需两步（1， 2）
  * 在views文件夹里对应字目录添加jsx scss
  * 在routes/index.js 添加对应路由；isNav代表是否在sider里显示，roles表示可访问的对应角色；
  * 布局在components/Frame/index.js，sider也在这里遍历；
  * 路由在App.js里遍历