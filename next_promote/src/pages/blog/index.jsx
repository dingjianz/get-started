/* eslint-disable */
import React, { Component } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

import styles from './index.module.scss';

class Blog extends Component {
  state = {
    name: 'jianding9',
  };

  inputEl = null;

  sendData = async () => {
    const val = this.inputEl.value;
    const r = await fetch('http://localhost:10087/api/hello', {
      body: JSON.stringify({
        value: val,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await r.json();
    console.log('data', data);
  };

  openNewPage = () => {
    // window.open('http://localhost:10087/pagetest');
    Router.push('/pagetest').then(() =>
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    );
  };

  render() {
    const { name } = this.state;
    return (
      <div>
        <Head>
          <title>这是Blog页面</title>
        </Head>
        <h1 className={styles.test}>我是blog页面 --- {name}</h1>
        <img className={styles.img_logo} src="/logo.jpg" alt="" />
        <div className={styles.logowrap} />
        <hr />
        <input type="text" ref={(el) => (this.inputEl = el)} />
        <button type="button" onClick={this.sendData}>
          点击发送 /api/hello
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button type="button" onClick={this.openNewPage}>
          打开新页面 opener
        </button>
      </div>
    );
  }
}

export default Blog;
