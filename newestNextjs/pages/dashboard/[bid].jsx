import React, { Component } from "react";
import { withRouter } from "next/router";

import styles from "./index.module.scss";

class DashBoard extends Component {
  render() {
    const {
      router: {
        query: { bid },
      },
    } = this.props;
    const { Title } = process.env;

    return <div className={styles.text}>我是dashboard页面---{bid}---{Title}</div>;
  }
}

// 此函数在构建时被调用
// export async function getStaticPaths() {
// 调用外部 API 获取博文列表
// const res = await fetch("https://.../posts");
// const posts = await res.json();

// 据博文列表生成所有需要预渲染的路径
// const paths = posts.map((post) => ({
//   params: { bid: post.bid },
// }));

// We'll pre-render only these paths at build time.
// { fallback: false } means other routes should 404.
//   return { params: { bid: post.bid }, fallback: false };
// }

// 此函数在构建时被调用
// export async function getStaticProps() {
// 调用外部 API 获取博文列表
// const res = await fetch('https://.../posts')
// const posts = await res.json()

// 通过返回 { props: { posts } } 对象，Blog 组件
// 在构建时将接收到 `posts` 参数
//   return {
//     props: {
//       params: {
//         bid: 1
//       },
//     },
//   };
// }

export default withRouter(DashBoard);
