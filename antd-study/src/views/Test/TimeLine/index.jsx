import React from 'react';

import './index.scss';

const TimeLine = () => {
  return (
    <div className="time-line">
      <div className="text-wrap">
        <h2 className="text">背景</h2>
      </div>
      <blockquote>
        <span>本文为掘金社区首发签约文章，未获授权禁止转载</span>
      </blockquote>
      <ul>
        <li>
          <div className="name">
            <div className="inner">大赛报名</div>
          </div>
          <div className="foot" />
        </li>
        <li>
          <div className="name">
            <div className="inner">A.I.开发者大赛&A.I.辩世界</div>
          </div>
          <div className="foot" />
        </li>
        <li>
          <div className="name">
            <div className="inner">ENJOY 1024</div>
          </div>
          <div className="foot" />
        </li>
      </ul>
    </div>
  );
};

export default TimeLine;
