/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Button, Card } from 'antd';
import './index.scss';

// import ajax from '@/service/index';
import { testApi } from '@/api/common';
import funParabola from './parabola';

export default () => {
  useEffect(() => {
    testApi()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log(err);
      });
    // ajax.get('http://127.0.0.1:8010/').then(res => {
    //   console.log('res', res)
    // }).catch(e => {
    //   console.log(e)
    // })
  });

  let parabola = null;

  const handleMove = () => {
    const ball = document.createElement('div');
    ball.setAttribute('class', 'ball');
    const container = document.getElementsByClassName('container')[0];
    container.appendChild(ball);
    const cart = document.getElementsByClassName('shop')[0];
    parabola = funParabola(ball, cart, {
      speed: 400,
      curvature: 0.0003,
      complete() {
        ball.remove();
      },
    });
    parabola.position().move();
  };

  return (
    <Card title="抛物线动画">
      <div className="container">
        <Button type="primary" onClick={handleMove}>
          点击购买
        </Button>
        <div className="card-footer">
          <div className="iconfont icon-SHOPPINGCART" />
          <div className="shop">购物车</div>
        </div>
      </div>
    </Card>
  );
};
