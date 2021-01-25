/* eslint-disable */
import React, { Component } from 'react';
import Head from 'next/head';
import styles from './index.module.scss';

class BaiduMapDemo extends Component {
  componentDidMount() {
    var opts = {
      type: BMAP_ANCHOR_TOP_RIGHT
    }
    // 创建地图实例
    const map = new BMapGL.Map('map_container');
    // 创建点坐标
    const point = new BMapGL.Point(117.282699092, 31.8669422067);
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 10); // 第二个参数，越大就是放大
    var scaleCtrl = new BMapGL.ScaleControl(opts);  // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl(opts);  // 添加缩放控件
    map.addControl(zoomCtrl);
    var cityCtrl = new BMapGL.CityListControl(opts);  // 添加城市列表控件
    map.addControl(cityCtrl);
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
  }

  render() {
    return (
      <div>
        <Head>
          <script
            async
            src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=0NqtKxs9sa1Sy8RDFhKlkGkGGAT5zDv1&callback=initialize"
          />
        </Head>
        <div id="map_container" className={styles.map_container}></div>
      </div>
    );
  }
}

export default BaiduMapDemo;
