import React, { Component } from 'react'
import { Button, Modal }  from 'antd'
import classnames from 'classnames'

import './index.scss'

const times = []

class TestIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeWheel: -1,
      btnDisable: false
    }
    this.timer = null
  }

    // 开始转盘
    startWheel = () => {
      this.setState({ btnDisable: true})
      if (this.timer) clearTimeout(this.timer)
      let prizeIndex = 6 // 模拟中奖序号
      for(let i = 0; i <= prizeIndex + 24; i++){
        times.push(Math.floor(Math.pow(2, 0.1 * i) * 80))
      }
      this.setState({
        activeWheel: -1
      }, this.run)
    }
  
    run = () => {
      if (times.length > 0) {
        this.setState({
          activeWheel: (this.state.activeWheel + 1) % 8
        })
        this.timer = setTimeout(this.run, times.shift()) // times.shift()返回的是一个数字
      } else if (times.length === 0) {
        this.setState({ btnDisable: false })
        Modal.info({
          width: 500,
          content:'恭喜你抽中奖品',
          okText: '确定'
        })
      }
    }

    /* 
      const times = [0, 5000, 10000]
      const run = () => {
      if (times.length > 0) {
        console.log('++++++')
        console.log(times)
        setTimeout(run, times.shift()) 
        // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
      } else {
        console.log('-----')
      }
    }
    run()
    */

    componentWillUnmount () {
      clearTimeout(this.timer)
    }
  

  render() {
    const { activeWheel, btnDisable } = this.state
    return (
      <div className="text-index">
        <ul className="prize-wrap">
          <li className={classnames('prize-item', {'active': activeWheel === 0})}>0</li>
          <li className={classnames('prize-item', {'active': activeWheel === 1})}>1</li>
          <li className={classnames('prize-item', {'active': activeWheel === 2})}>2</li>
          <li className={classnames('prize-item', {'active': activeWheel === 7})}>7</li>
          <li className="prize-item prize-desc">
          10积分/次
          <Button type="primary" onClick={this.startWheel} disabled={btnDisable}>立即抽奖</Button>
          </li>
          <li className={classnames('prize-item', {'active': activeWheel === 3})}>3</li>
          <li className={classnames('prize-item', {'active': activeWheel === 6})}>6</li>
          <li className={classnames('prize-item', {'active': activeWheel === 5})}>5</li>
          <li className={classnames('prize-item', {'active': activeWheel === 4})}>4</li>
          
        </ul>
      </div>
    )
  }
}

export default TestIndex
