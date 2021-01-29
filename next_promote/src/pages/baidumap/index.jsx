/* eslint-disable */
import React, { Component } from 'react';
import Head from 'next/head';
import styles from './index.module.scss';

class BaiduMapDemo extends Component {
  componentDidMount() {
    if (BMapGL) {
      // 创建地图实例
      const map = new BMapGL.Map('map_container');
      // 创建点坐标
      const point = new BMapGL.Point(117.282699092, 31.8669422067);
      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(point, 12); // 第二个参数，越大就是放大
      var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
      var zoomCtrl = new BMapGL.ZoomControl({
        offset: new BMapGL.Size(150, 5),
      }); // 添加缩放控件
      var cityCtrl = new BMapGL.CityListControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
      }); // 添加城市列表控件
      map.addControl(scaleCtrl);
      map.addControl(zoomCtrl);
      map.addControl(cityCtrl);
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      // map.setHeading(64.5); //设置地图旋转角度
      // map.setTilt(73); //设置地图的倾斜角度
      // map.setMapStyleV2({
      //   styleId: '675d0a5bb50b778249f7bcf67718ceba' // 个性化地图样式 http://lbsyun.baidu.com/index.php?title=jspopularGL/guide/custom
      // });
      // map.setMapType(BMAP_EARTH_MAP); // 切换地图类型

      const pt = new BMapGL.Point(117.282699092, 31.8669422067);
      const marker = new BMapGL.Marker(pt); // 创建标注
      map.addOverlay(marker);

      /* 
      TODO: 这块有点问题，明天再看
      var myIcon = new BMapGL.Icon('./baozhu.png', new BMapGL.Size(23, 25), {
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
        // 图标中央下端的尖角位置。
        anchor: new BMapGL.Size(10, 25),
        // 设置图片偏移。
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。
        imageOffset: new BMapGL.Size(0, 0 - 25), // 设置图片偏移
      });
      // 创建标注对象并添加到地图
      var dd = new BMapGL.Marker(pt, { icon: myIcon });
      map.addOverlay(dd);
      */
    }
  }

  render() {
    return (
      <div>
        <Head>
          <script
            async
            type="text/javascript"
            src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=0NqtKxs9sa1Sy8RDFhKlkGkGGAT5zDv1&callback=initialize"
          />
        </Head>
        <div id="map_container" className={styles.map_container}></div>
      </div>
    );
  }
}

export default BaiduMapDemo;
