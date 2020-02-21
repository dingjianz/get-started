module.exports = {
  "button": [{
      "name": "发送位置",
      "type": "location_select",
      "key": "rselfmenu_2_0"
    },
    {
      "name": "菜单",
      "sub_button": [{
          "type": "view",
          "name": "搜索",
          "url": "http://jft5cj.natappfree.cc/search"
        },
        {
          "type": "click",
          "name": "赞一下我们",
          "key": "V1001_GOOD"
        }
      ]
    },
    {
      "name": "发图",
      "sub_button": [{
          "type": "pic_sysphoto",
          "name": "系统拍照发图",
          "key": "rselfmenu_1_0"
        },
        {
          "type": "pic_photo_or_album",
          "name": "拍照或者相册发图",
          "key": "rselfmenu_1_1",
          "sub_button": []
        },
        {
          "type": "pic_weixin",
          "name": "微信相册发图",
          "key": "rselfmenu_1_2",
          "sub_button": []
        }
      ]
    },
    // {
    //   "name": "发送位置",
    //   "type": "location_select",
    //   "key": "rselfmenu_2_0"
    // },
  ]
}
