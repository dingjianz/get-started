/* eslint-disable */
const SSO = (window.SSO = {
  config: {
    url: 'https://www.baidu.com',
  },
  init() {
    SSO.utils.fn();
  },
  utils: {
    fn() {
      console.log('我是FN');
    },
  },
});

SSO.init();

export default SSO;
