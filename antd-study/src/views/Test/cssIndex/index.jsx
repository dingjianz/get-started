/* eslint-disable no-irregular-whitespace */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import { throttle, debounce } from '@/utils';
// eslint-disable-next-line import/no-unresolved
import pic from '@/assets/images/Sol_8.png';
import './index.scss';

class CssIndex extends Component {
  constructor() {
    super();
    this.state = {
      // list: new Array(6)
      list: [1, 1, 1, 1, 1],
      tabData: [
        { title: 'tab1标题', desc: 'tab1内容' },
        { title: 'tab2标题', desc: 'tab2内容' },
        { title: 'tab3标题', desc: 'tab3内容' },
      ],
    };
  }

  componentDidMount() {
    this.backToBot();
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  // 防抖
  handleClick = debounce(() => {
    console.log('我被点击了');
  }, 500);

  // 节流
  handleScroll = throttle(() => {
    const section = document.querySelector('.main-content.ant-layout');
    const scrollVal = section.scrollTop || 0;
    console.log(scrollVal);
  }, 1000);

  backToBot = () => {
    console.log(this.$dom);
    this.$dom.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth'
    //     })
  };

  render() {
    const { list, tabData } = this.state;
    return (
      <div className="css-container" ref={(el) => (this.$dom = el)}>
        {/* css 第一部分  翻转 */}
        <div className="card-container">
          <div className="card">
            <div className="front">
              <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
            </div>
            <div className="back">
              <div>
                <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
                <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
                <button type="button" className="button">
                  Click Here
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* css 第二部分 伸缩 */}
        <ul className="accordion-container">
          <li className="accordion-item active">
            <div className="title">1</div>
          </li>
          <li className="accordion-item">
            <div className="title">2</div>
          </li>
          <li className="accordion-item">
            <div className="title">3</div>
          </li>
        </ul>

        {/* css 第三部分 动画 */}
        <ul className="item-ul">
          {list.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li className="item" key={index}>
                {index}
              </li>
            );
          })}
        </ul>

        {/* css 第三部分 border 跑马灯 */}
        <div className="box">
          <div className="icon icon1" />
          <div className="icon icon2" />
        </div>

        {/* css 第四部分 hover 颜色变化 */}
        <div className="hover-wrap">
          <div className="hr-circle">
            <div className="circle">
              <div className="cl" />
              <div className="cr" />
            </div>
          </div>
        </div>

        <div className="btn-wrap">
          <span onClick={this.handleClick}>
            <em>点我</em>
          </span>
        </div>

        {/* css 第五部分 hover 图片变大变化 hover图片旋转360 */}
        <div className="avatar-wrap">
          <img src={pic} alt="" />
        </div>

        {/* css 第六部分 风扇 */}
        <div className="fan" />

        {/* css 第七部分 水波纹 banner */}
        <div className="banner-wrap">
          <div className="double-circle circle-size-1 left-0">
            <div className="inner-delay-1 circle size-1" />
            <div className="outer-delay-1 circle size-1" />
          </div>
          <div className="double-circle circle-size-1 left-1">
            <div className="inner-delay-0 circle size-1" />
            <div className="outer-delay-0 circle size-1" />
          </div>
          <div className="double-circle circle-size-0 left-2">
            <div className="inner-delay-2 circle size-0" />
            <div className="outer-delay-2 circle size-0" />
          </div>
          <div className="double-circle circle-size-2 right-0">
            <div className="inner-delay-0 circle size-2" />
            <div className="outer-delay-0 circle size-2" />
          </div>
          <div className="double-circle circle-size-0 right-1">
            <div className="inner-delay-1 circle size-0" />
            <div className="outer-delay-1 circle size-0" />
          </div>
          <div className="double-circle circle-size-2 right-2">
            <div className="inner-delay-2 circle size-2" />
            <div className="outer-delay-2 circle size-2" />
          </div>
          <div className="aurora-wrap">
            <div className="blue-aurora" />
            <div className="green-aurora" />
          </div>
          <div className="banner-line">
            <svg id="line" viewBox="0 0 2164.54 195.17">
              <title>line</title>
              <g>
                <g>
                  <path className="cls-1" d="M1082.27,1S808.81,5,601.81,192.48" />
                  <path className="cls-1 cls-2" d="M1083.81,1s273.46,4,480.46,191.48" />
                  <path className="cls-1" d="M1082.86.51S937.4-3.53,769.4,193" />
                  <path className="cls-1" d="M1084.4.51s145.46-4,313.46,192.48" />
                  <path className="cls-1" d="M1082.27,1.49S994.81,8.45,911.81,195" />
                  <path className="cls-1" d="M1084.4,1.49s87.46,7,170.46,193.48" />
                  <path className="cls-1" d="M1080.27,2.5s-327-20.08-649,192" />
                  <path className="cls-1" d="M1080.27,2.5s327-20.08,649,192" />
                  <path className="cls-1" d="M1081.35.82s-437-11.08-860,192" />
                  <path className="cls-1" d="M1084.37.82s437-11.08,860,192" />
                  <path className="cls-1" d="M1082.27,2.25s-780-2.08-1082,192" />
                  <path className="cls-1" d="M1082.27,2.25s780-2.08,1082,192" />
                </g>
              </g>
            </svg>
          </div>
          <div className="bg-blur" />
        </div>

        {/* https://blog.csdn.net/sillies_3/article/details/90607648  */}
        <div className="svg-wrap">
          <svg height="100" width="400">
            <rect id="rect" height="100" width="400" />
          </svg>
          <h1 className="text">我是text</h1>
        </div>

        <div className="tab-wrap">
          <ul className="nav-wrap">
            {tabData.map((navIt, navIndex) => {
              return (
                <li key={navIndex} className="tab-nav">
                  {navIt.title}
                </li>
              );
            })}
          </ul>
          <ul className="tab-content-wrap clearfix">
            {tabData.map((navIt, navIndex) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={navIndex} className="tab-content">
                  {navIt.desc}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="ipt-wrap">
          <input type="text" className="ipt" placeholder="请输入名字" />
        </div>
      </div>
    );
  }
}

export default CssIndex;
