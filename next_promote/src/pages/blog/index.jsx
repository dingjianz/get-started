import React, { Component } from 'react';
import Head from 'next/head';
import styles from './index.module.scss';

class Blog extends Component {
  state = {
    name: 'jianding9',
  };

  render() {
    const { name } = this.state;
    return (
      <div>
        <Head>
          <title>这是Blog页面</title>
        </Head>
        <h1 className={styles.test}>我是blog页面 --- {name}</h1>
        <img className={styles.img_logo} src="/docs/logo.jpg" alt="" />
      </div>
    );
  }
}

export default Blog;
