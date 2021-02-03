/* eslint-disable */
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

  const showStar = (e) => {
    e.persist();
    const { clientX, clientY } = e;
    const mydiv = document.createElement('div');
    mydiv.setAttribute('style', `left:${clientX}px;top:${clientY}px;`);
    mydiv.setAttribute('class', `divs`);
    const t = document.createTextNode('♥');
    mydiv.appendChild(t);
    const wraps = document.getElementsByClassName('wraps')[0];
    wraps.append(mydiv);
    const childs = wraps.childNodes;
    if (childs.length > 3) wraps.removeChild(childs[0]);
  };

  return (
    <>
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
        <div className="wraps" onClick={showStar}>
          <h1>css</h1>
        </div>
      </Card>
    </>
  );
};
