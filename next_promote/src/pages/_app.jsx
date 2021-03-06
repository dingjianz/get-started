import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import '@/styles/globals.scss'; // 全局样式

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>我是公共title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
