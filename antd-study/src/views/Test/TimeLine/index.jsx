import React, { Component } from 'react';

import './index.scss'

class TimeLine extends Component {
  
  render() {
    return (
      <div className="time-line">
      <button onClick={() => {
        this.setState({
          isActive: true
        })
      }}>点击</button>
        <ul>
          <li>
            <div className="name">
              <div className="inner">大赛报名</div>
            </div>
            <div className="foot"></div>
          </li>
          <li>
            <div className="name">
              <div className="inner">A.I.开发者大赛&A.I.辩世界</div>
            </div>
            <div className="foot"></div>
          </li>
          <li>
            <div className="name">
              <div className="inner">ENJOY 1024</div>
            </div>
            <div className="foot"></div>
          </li>
        </ul>
      </div>
    )
  }
}

export default TimeLine
