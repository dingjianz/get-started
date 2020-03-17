// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '我是扫码进来的，欢迎体验',
    isShow: false,
    list: [
      {id: 0, name: '张三'},
      {id: 1, name: '李四'},
      {id: 2, name: '王五'},
      {id: 3, name: '赵六'}
    ],
    person: {
      name: '格林',
      age: 30,
      sex: 'male',
      job: 'basketballer'
    },
    num: 0
  },

  handleInput(e) {
    this.setData({
      num: e.detail.value
    })
  },

  changeInputVal (e) {
    const operateNum = e.currentTarget.dataset.num
    this.setData({
      num: this.data.num + operateNum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    if (options.id === '123') {
      this.setData({
        isShow: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})