// components/Tabs.js
Component({

  options: {
    multipleSlots: true,
    styleIsolation: 'isolated'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: [
        {id: 1, name: '首页', isActive: true}
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      const { activeNum } = e.currentTarget.dataset
      const { tabList } = this.data
      tabList.forEach((tabIt, index) => activeNum === index ? tabIt.isActive=true : tabIt.isActive=false)
      this.setData({ tabList }) // props 相当于data里的数据，获取和设置完全一样
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log('attached')
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },

  observers: {
    'tabList': function (newVal) {
      console.log('tabList被修改了，新值是:' + newVal)
    }
  }
})
