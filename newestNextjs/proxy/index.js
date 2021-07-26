module.exports = {
  /** ************ proxy ****************** */
  '/developer/**': {
    type: 'proxy',
    target: 'http://test.1024.iflytek.com/',
    headers: {
      'X-Real-IP': '127.0.0.1',
    },
    changeOrigin: true,
  },
};
