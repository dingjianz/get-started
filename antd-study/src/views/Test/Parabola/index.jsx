import React, { useRef, useEffect } from 'react'
import funParabola from './parabola'
import { Button, Card } from 'antd'

import './index.scss'

export default () => {
  const ball = useRef();
  const cart = useRef();
  let parabola = null;

  useEffect(() => {
    parabola = funParabola(ball.current, cart.current).mark()
    console.log(ball.current)
    ball.current.style.marginLeft = '0px'
    ball.current.style.marginTop = '0px'
    parabola.init();
  })

  const handleMove = () => {
    parabola.position().move();
  }

  return (
    <Card title="抛物线动画">
      <div className="container">
        <Button type="primary" onClick={handleMove}>
          点击购买
        </Button>
        <div className="ball" ref={ball}></div>
        <div className="card-footer">
          <div className="iconfont icon-SHOPPINGCART"></div>
          <div className="shop" ref={cart}>
            购物车
          </div>
        </div>
      </div>
    </Card>
  )
}
