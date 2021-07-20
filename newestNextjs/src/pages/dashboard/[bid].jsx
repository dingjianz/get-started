import React, { Component } from "react";
import { SelfHeader, Button } from "@components";
import { withRouter } from "next/router";
import Link from "next/link";
import fetch from "node-fetch";

import styles from "./index.module.scss";

class DashBoard extends Component {
  render() {
    const { Title } = process.env;
    const {
      router: {
        query: { bid },
      },
      data: { list },
      router,
    } = this.props;

    console.log("list:::::", list);

    return (
      <div>
        <SelfHeader />
        <span className={styles.text}>
          我是dashboard页面---{bid}---{Title}
          <Button className={styles.link_btn} onClick={() => router.push("/")}>
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

export const getServerSideProps = async () => {
  const r = await fetch("http://localhost:10010/api/list");
  const data = await r.json();
  return {
    props: {
      data,
    },
  };
};

export default withRouter(DashBoard);
