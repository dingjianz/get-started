## 准备
1.在demo中填写APPID、APISecret、APIKey，可到控制台-我的应用-语音听写（流式版）页面获取
2.安装nodejs

## 本地运行
1.打开cmd，进入demo目录，执行如下命令
 ```
 npm install -g cnpm --registry=https://registry.npm.taobao.org
 cnpm install
 npm run dev 
 ```
2.在chrome浏览器中打开本机IP地址，可打开cmd输入ipconfig获取，例如
http://127.0.0.1:8080/index.html
ip和端口以返回的信息为准

## 部署到服务器
1. 决定部署到服务器的文件夹。
如果是根目录直接运行第二步，
如果非根目录，如：test，请将build/config中的build.assetsPublicPath改为/test/，然后运行第二步
2. 打开cmd，进入demo目录，执行如下命令
 ```
 npm install
 npm i cross-env@3.0.0
 npm run build
 ```
 3. 将第二步编译后的dist文件夹中的内容（非dist）复制到指定的文件夹
 
 
## 注意事项
1.Demo中使用了动态修正功能（dwa=wpgs），请到控制台为您测试的appid开通该权限才能生效。
2.请使用chrome浏览器测试。
3.如程序报错5位错误码，请到文档或错误码链接查询
  https://www.xfyun.cn/doc/asr/voicedictation/API.html#%E9%94%99%E8%AF%AF%E7%A0%81
  https://www.xfyun.cn/document/error-code


