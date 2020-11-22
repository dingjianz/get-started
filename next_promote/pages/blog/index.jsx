import React, { Component } from 'react'
import Head from 'next/head'
import styles from './index.module.scss'

console.log(styles)

class Blog extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>这是Blog页面</title>
        </Head>
        <h1 className={styles.test}>我是blog页面</h1>
        <img className={styles.img_logo} src="/logo.jpg" alt="" />
      </div>
    )
  }
}

export default Blog
