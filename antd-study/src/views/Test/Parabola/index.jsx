import React from 'react'
import funParabola from './parabola'
import { Button, Card } from 'antd'

import './index.scss'

export default () => {
  let parabola = null;

  const handleMove = () => {
    let ball = document.createElement('div')
    ball.setAttribute('class', 'ball')
    const container = document.getElementsByClassName('container')[0]
    container.appendChild(ball)
    const cart = document.getElementsByClassName('shop')[0]
    parabola = funParabola(ball, cart, {
      speed: 400,
      curvature: 0.0003,
      complete() {
        console.log('complete')
        ball.remove()
      },
    })
    parabola.position().move();
  }

  return (
    <Card title="抛物线动画">
      <div className="container">
        <Button type="primary" onClick={handleMove}>
          点击购买
        </Button>
        <div className="card-footer">
          <div className="iconfont icon-SHOPPINGCART"></div>
          <div className="shop">
            购物车
          </div>
        </div>
      </div>
    </Card>
  )
}
