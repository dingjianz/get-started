/* eslint-disable no-unused-vars */
import React from 'react';
import Link from 'next/link';
import { Button, SelfHeader } from '@components';
import styles from '@assets/css/Home.module.css';
import fetch from 'node-fetch';

function Home(props) {
  console.log('props', props);

  return (
    <div className={styles.container}>
      <SelfHeader />
      <h1>Sea Grass Frame --- NextJs</h1>

      <div>
        <Button>
          <Link href="/dashboard/jianding9" passHref>
            Dashboard
          </Link>
        </Button>
        <Button className={styles.rbtn}>
          <Link href="/reducer" passHref>
            Redux
          </Link>
        </Button>
        <Button className={styles.rbtn}>
          <Link href="/imageLazyload" passHref>
            image lazyLoad
          </Link>
        </Button>
      </div>
    </div>
  );
}

// 此函数在构建时被调用
export async function getStaticProps(context) {
  // const r = await fetch(
  //   `http://test.1024.iflytek.com/developer/cms/page-data/process-new`
  // );
  // 调用外部 API 获取博文列表
  // 通过返回 { props: { posts } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数
  // const data = await r.json();
  // console.log('data:::', data);
  return {
    props: {
      data: {},
    },
  };
}

export default Home;
