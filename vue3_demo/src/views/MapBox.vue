<template>
  <div ref="mapEl" class="map"></div>
</template>
<script setup>
// https://mp.weixin.qq.com/s/IDLqdzV_u6YTIQyZrKZERg
import mapboxgl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { onMounted, ref } from 'vue';
const mapEl = ref(null);

const initOption = {
  style: {
    version: 8,
    id: '43f36e14-e3f5-43c1-84c0-50a9c80dc5c7',
    sources: {
      // ... 上一节内容省略
      'tdt-cva': {
        type: 'raster',
        tiles: [
          'https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=11501223f68b8fa6fd32123da42b01f2'
        ],
        tileSize: 256,
      },
    },
    layers: [
      //... 上一节内容省略
      {
        id: 'tdt-cva-layer',
        type: 'raster',
        source: 'tdt-cva',
      }
    ],
  },
};

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapEl.value,
    ...initOption,
  });
});
</script>

<style lang="scss" scoped>
.map {
  width: 600px;
  height: 300px;
}
</style>
