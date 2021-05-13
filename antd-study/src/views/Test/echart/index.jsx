/* eslint-disable no-console */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-irregular-whitespace */
import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-liquidfill';

import './index.scss';

const colorList = ['#1089e7', '#f57474', '#56D0E3', '#F8d448', '#8B78F7', '#4fc08d'];

class EchartDemo extends Component {
  componentDidMount() {
    this.backToBot();
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initChart4();
    this.initChart5();
  }

  backToBot = () => {
    this.$dom.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    //   window.scrollTo({
    //    top: 0,
    //     behavior: 'smooth'
    //   })
  };

  initChart1 = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main1'));
    // 指定图表的配置项和数据
    const option = {
      color: ['#f00', '#000'],
      title: {
        text: 'ECharts 入门示例',
        textStyle: {
          fontSize: '12px',
          color: 'green',
        },
      },
      tooltip: {},
      // series里面的name已经有，则legend不必配置
      legend: {
        data: ['销量1', '销量2'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量1',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: '销量2',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  };

  initChart2 = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main2'));
    // 指定图表的配置项和数据
    const option = {
      color: ['#3398DB'],
      title: {
        // text: '柱状图示例',
        textStyle: {
          fontSize: '12px',
          color: '#4fc08d',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '6%',
      },
      // series里面的name已经有，则legend不必配置
      legend: {
        data: ['销量1', '销量2'],
      },
      // x轴样式不显示
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: false,
            // 如果想要设置单独的线条样式
            lineStyle: {},
          },
          // 修改刻度标签相关样式
          axisLabel: {
            color: '#4fc08d',
            fontSize: '12',
            interval: 1, // 横坐标间隔
          },
          axisTick: {
            alignWithLabel: true,
          },
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          minInterval: 1,
        },
      ],
      yAxis: [
        {
          type: 'value',
          // 修改刻度标签相关样式
          axisLabel: {
            color: '#4fc08d',
            fontSize: 12,
          },
          axisLine: {
            show: true, // 是否显示坐标轴轴线。
            // 如果想要设置单独的线条样式
            lineStyle: {
              color: '#4fc08d',
              width: 6,
            },
          },
          // 坐标轴在 grid 区域中的分隔线。 y轴分割线
          splitLine: {
            lineStyle: {
              color: 'red',
            },
          },
        },
      ],
      series: [
        {
          name: '销量1',
          type: 'bar',
          barWidth: '20', // 可以是绝对值例如 40 或者百分数例如 '60%
          itemStyle: {
            barBorderRadius: 5, // 修改柱子圆角
          },
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  };

  initChart3 = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main3'));
    // 指定图表的配置项和数据
    const option = {
      grid: {
        left: '22%',
        bottom: '10%',
        containLabel: false,
      },
      // 不显示x轴相关信息
      xAxis: {
        show: false,
      },
      yAxis: [
        {
          type: 'category',
          data: ['HTML5', 'CSS3', 'JavaScript', 'VUE', 'NODE', 'React'],
          inverse: true, // 是否是反向坐标轴，默认false
          axisLine: {
            show: false, // 不显示y轴线条
          },
          axisTick: {
            show: false, // 不显示刻度
          },
          axisLabel: {
            color: '#4fc08d', // y轴 刻度标签文字 改为白色
          },
        },
        {
          type: 'category',
          data: [100, 100, 100, 100, 100, 100],
          inverse: true,
          axisLine: {
            show: false, // 不显示y轴线条
          },
          axisTick: {
            show: false, // 不显示刻度
          },
          axisLabel: {
            color: '#4fc08d', // y轴 刻度标签文字 改为白色
          },
        },
      ],
      series: [
        {
          name: '条',
          type: 'bar',
          data: [30, 20, 80, 79, 90, 100],
          yAxisIndex: 0,
          // 柱子之间的距离
          barCategoryGap: 50,
          // 柱子的高度
          barWidth: 10,
          itemStyle: {
            // 修改第一个柱子的圆角
            barBorderRadius: 20,
            // 给第一个柱子设置颜色 可以string 也可以function
            color(params) {
              // console.log(params);
              return colorList[params.dataIndex];
            },
          },
          // 显示柱子内的文字
          label: {
            show: true,
            position: 'inside',
            // 文字的显示格式 c会自动解析为data数据 https://echarts.apache.org/zh/option.html#series-bar.label.formatter
            formatter: '{c}%',
          },
        },
        {
          name: '框',
          type: 'bar',
          data: [100, 100, 100, 100, 100, 100],
          yAxisIndex: 1,
          barCategoryGap: 50,
          barWidth: 15,
          itemStyle: {
            color: 'none',
            borderWidth: 3,
            barBorderRadius: 15,
            borderColor: '#00c1de',
          },
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  };

  initChart4 = () => {
    const myChart = echarts.init(document.getElementById('main4'));
    const value = 0.2;
    const data = [value, value, value];
    const option = {
      backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
          offset: 0,
          color: '#431ab8',
        },
        {
          offset: 1,
          color: '#471bba',
        },
      ]),
      title: {
        text: 'CPU使用率',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 25,
          color: 'rgb(97, 142, 205)',
        },
      },
      graphic: [
        {
          type: 'group',
          rotation: Math.PI / 4,
          bounding: 'raw',
          right: 110,
          bottom: 110,
          z: 100,
          children: [
            {
              type: 'rect',
              left: 'center',
              top: 'center',
              z: 100,
              shape: {
                width: 400,
                height: 50,
              },
              style: {
                fill: 'rgba(0,0,0,0.3)',
              },
            },
            {
              type: 'text',
              left: 'center',
              top: 'center',
              z: 100,
              style: {
                fill: '#fff',
                text: 'ECHARTS LINE CHART',
                font: 'bold 26px sans-serif',
              },
            },
          ],
        },
        {
          type: 'group',
          left: '10%',
          top: 'center',
          children: [
            {
              type: 'rect',
              z: 100,
              left: 'center',
              top: 'middle',
              shape: {
                width: 190,
                height: 100,
              },
              style: {
                fill: '#fff',
                stroke: '#555',
                lineWidth: 1,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: 'rgba(0,0,0,0.2)',
              },
            },
            {
              type: 'text',
              z: 100,
              left: 'center',
              top: 'middle',
              style: {
                fill: '#333',
                text: [
                  '横轴表示温度，单位是 °C',
                  '纵轴表示高度，单位是 km',
                  '右上角有一个图片做的水印',
                  '这个文本块可以放在图中各',
                  '种位置',
                ].join('\n'),
                font: '14px Microsoft YaHei',
              },
            },
          ],
        },
      ],
      series: [
        {
          type: 'liquidFill',
          radius: '80%',
          data,
          backgroundStyle: {
            borderWidth: 5,
            borderColor: 'rgb(255,0,255,0.9)',
            color: 'rgb(255,0,255,0.01)',
          },
          label: {
            normal: {
              formatter: `${(value * 100).toFixed(2)}%`,
              textStyle: {
                fontSize: 50,
              },
            },
          },
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  };

  initChart5 = () => {
    const myChart = echarts.init(document.getElementById('main5'));
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      // 图例组件
      legend: {
        textStyle: {
          color: '#4c9bfd', // 图例文字颜色
        },
        // 这个10%必须加引号
        right: '10%',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        show: true, // 显示grid边框
        borderColor: '#012f4a', // 边框颜色
        containLabel: true, // 包含刻度文字在内
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  };

  render() {
    return (
      // eslint-disable-next-line no-return-assign
      <div className="echart-page" ref={(el) => (this.$dom = el)}>
        <div className="chart" id="main1" />
        <div className="chart" id="main2" />
        <div className="chart" id="main3" />
        <div className="chart" id="main4" />
        <div className="chart" id="main5" />
      </div>
    );
  }
}

export default EchartDemo;
