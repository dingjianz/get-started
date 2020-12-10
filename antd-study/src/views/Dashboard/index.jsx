import React, { Component, createRef } from 'react';
import { Card, Row, Col } from 'antd';
import echarts from 'echarts';
import ajax from '../../service';
import './dashborad.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.echartRef = createRef();
  }

  componentDidMount() {
    this.myChart = echarts.init(this.echartRef.current);
    this.initEchartFn();
  }

  getArticleAmountFn = () => {
    return new Promise((resolve) => {
      ajax.post('/api/v1/articleAmount').then((res) => {
        resolve(res);
      });
    });
  };

  initEchartFn = async () => {
    const result = await this.getArticleAmountFn();
    const option = {
      title: {
        text: 'xxx',
      },
      tooltip: {
        show: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: result.amount.map((item) => item.mouth),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: result.amount.map((item) => item.value),
          type: 'line',
          areaStyle: {},
        },
      ],
    };
    this.myChart.setOption(option);
  };

  render() {
    // const {  } = this.state
    return (
      <>
        <Card title="概览" bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <div className="dj-col" style={{ backgroundColor: '#66BB6A' }}>
                col-6
              </div>
            </Col>
            <Col span={6}>
              <div className="dj-col" style={{ backgroundColor: '#42A5F5' }}>
                col-6
              </div>
            </Col>
            <Col span={6}>
              <div className="dj-col" style={{ backgroundColor: '#FFEB3B' }}>
                col-6
              </div>
            </Col>
            <Col span={6}>
              <div className="dj-col" style={{ backgroundColor: '#C6FF00' }}>
                col-6
              </div>
            </Col>
          </Row>
        </Card>

        <Card title="浏览量" bordered={false}>
          <div ref={this.echartRef} style={{ height: '400px' }} />
        </Card>
      </>
    );
  }
}
