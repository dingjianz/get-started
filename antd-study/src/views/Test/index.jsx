import React, { Component } from 'react'
import { Button, Modal }  from 'antd'
import './index.scss'

class TestIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeWheel: -1
    }
  }

    // 开始转盘
    startWheel = () => {
      let prizeIndex = -1
      this.setState({
        activeWheel: 0,
        giftName: res.giftName
      }, this.run())
    }
  
    run = () => {
      if (times.length > 0) {
        this.setState({
          activeWheel: (this.state.activeWheel + 1) % 8
        })
        setTimeout(this.run, times.shift())
      } else if (times.length === 0) {
        Modal.info({
          width: 500,
          content:'恭喜你抽中奖品',
          okText: '确定'
        })
        this.getInfo()
      }
    }
  

  render() {
    
    return (
      <div className="text-index">
        <ul className="prize-wrap">
          <li className="prize-item active"></li>
          <li className="prize-item"></li>
          <li className="prize-item"></li>
          <li className="prize-item"></li>
          <li className="prize-item prize-desc">
            10积分/次
            <Button type="primary">立即抽奖</Button>
          </li>
          <li className="prize-item"></li>
          <li className="prize-item"></li>
          <li className="prize-item"></li>
          <li className="prize-item"></li>
        </ul>
      </div>
    )
  }
}

export default TestIndex
