import type { App } from "vue";

export default {
  install: (app: App<Element>, options: I18n.IOptions) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key: string) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split(".").reduce((o: any, i: string) => {
        if (o) return o[i];
      }, options);
    };
    app.provide("i18n", options);
  },
};
