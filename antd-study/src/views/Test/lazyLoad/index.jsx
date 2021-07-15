/* eslint-disable */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import { throttle } from '@/utils';
import './index.scss';

class ImgLazyLoad extends Component {
  // imgLazyLoadFn1 = () => {
  //   try {
  //     const vwHeight = window.innerHeight;
  //     const $imgs = Array.from(document.querySelectorAll('.lazy-img'));
  //     window.addEventListener(
  //       'scroll',
  //       throttle(() => {
  //         $imgs.forEach((it) => {
  //           if (it.getBoundingClientRect().top < vwHeight) {
  //             const imgSrc = it.getAttribute('data-src');
  //             it.setAttribute('src', imgSrc);
  //           }
  //         });
  //       }, 500)
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  imgLazyLoadFn2 = () => {
    const callback = (entries) => {
      // console.log('看到了触发，看不到了再触发');
      entries.forEach((entry) => {
        const { isIntersecting, target } = entry;
        if (isIntersecting) {
          const imgSrc = target.getAttribute('data-src');
          target.setAttribute('src', imgSrc);
          observer.unobserve(target);
        }
      });
    };
    const $imgs = Array.from(document.querySelectorAll('.lazy-img'));
    const observer = new IntersectionObserver(callback);
    $imgs.forEach((it) => {
      observer.observe(it);
    });
  };

  componentDidMount() {
    // this.imgLazyLoadFn1();
    this.imgLazyLoadFn2();
  }

  render() {
    return (
      <div className="img-lazyload">
        <p>我是一段文字</p>
        <img
          className="lazy-img"
          data-src="https://img2.baidu.com/it/u=1704219071,3761829583&fm=26&fmt=auto&gp=0.jpg"
          alt=""
        />
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <img
          className="lazy-img"
          data-src="https://img0.baidu.com/it/u=2592042537,1864064944&fm=26&fmt=auto&gp=0.jpg"
          alt=""
        />
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <img
          className="lazy-img"
          data-src="https://img1.baidu.com/it/u=1541636380,2661844494&fm=26&fmt=auto&gp=0.jpg"
          alt=""
        />
        <p>我是一段文字</p>
        <p>我是一段文字</p>
        <img
          className="lazy-img"
          data-src="https://img2.baidu.com/it/u=2645058785,2214371962&fm=26&fmt=auto&gp=0.jpg"
          alt=""
        />
        <p>我是一段文字</p>
      </div>
    );
  }
}

export default ImgLazyLoad;
