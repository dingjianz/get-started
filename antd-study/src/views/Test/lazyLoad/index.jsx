/* eslint-disable */
import React, { Component } from 'react';
import { throttle } from '@/utils';
import './index.scss';

class ImgLazyLoad extends Component {
  state = {
    arr: [
      {
        id: 0,
        name: '张三',
      },
      {
        id: 1,
        name: '李四',
      },
      {
        id: 2,
        name: '王五',
      },
    ],
  };
  componentDidMount() {
    // this.imgLazyLoadFn1();
    this.imgLazyLoadFn2();

    const d2 = React.createElement('div');
    console.log(d2);
  }

  // imgLazyLoadFn1 = () => {
  //   try {
  //     const vwHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
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
  //       }, 500), true
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

  render() {
    const { arr } = this.state;
    return (
      <div className="img-lazyload" id="img_lazyload">
        {arr.map((item, index) => (
          <li key={item.id}>
            {item.name}
            <input placeholder="请输入数字" />
          </li>
        ))}
        <button
          type="button"
          onClick={() => {
            const newArr = [...arr];
            newArr.unshift({ id: 3, name: '赵六' });
            this.setState({
              arr: newArr,
            });
          }}
        >
          修改arr
        </button>
        <hr />
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
