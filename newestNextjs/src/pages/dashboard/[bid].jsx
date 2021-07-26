/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { SelfHeader, Button } from '@components';
import { withRouter } from 'next/router';
import Link from 'next/link';
import fetch from 'node-fetch';
import { fromJS, is } from 'immutable';

import styles from './index.module.scss';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.getDataFn();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsIm = fromJS(this.props);
    const nextPropsIm = fromJS(nextProps);
    const stateIm = fromJS(this.state);
    const nextStateIm = fromJS(nextState);
    return !is(propsIm, nextPropsIm) || !is(stateIm, nextStateIm);
  }

  getDataFn = async () => {
    try {
      const r = await fetch('http://localhost:10086/api/list');
      const { list } = await r.json();
      this.setState({ list });
    } catch (e) {
      console.log('e', e);
    }
  };

  render() {
    const { Title } = process.env;
    const { list } = this.state;
    const {
      router: {
        query: { bid },
      },
      // data: { list },
      router,
    } = this.props;

    return (
      <div>
        <SelfHeader />
        <span className={styles.text}>
          我是dashboard页面---{bid}---{Title}
          <Button className={styles.link_btn} onClick={() => router.push('/')}>
            返回首页
          </Button>
        </span>
        <p className={styles.title}>去往静态化detail</p>
        <ul className={styles.static}>
          {list.map((item, index) => (
            <li key={index}>
              <Link href={`/staticDetail/${item?.name}`} passHref>
                <span>
                  点击：{item?.name}---今年--{item?.age}岁了！！
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <hr />
        <hr />
        <hr />

        <p className={styles.title}>去往服务端渲染detail</p>
        <ul className={styles.server}>
          {list.map((item, index) => (
            <li key={index}>
              <Link href={`/serverDetail/${item?.name}`} passHref>
                <span>
                  点击：{item?.name}---今年--{item?.age}岁了！！
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// export const getServerSideProps = async () => {
//   const r = await fetch('http://localhost:10086/api/list');
//   const data = await r.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };

export default withRouter(DashBoard);
