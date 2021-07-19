import React, { Component } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import fetch from "node-fetch";

import styles from "./index.module.scss";

class DashBoard extends Component {
  render() {
    const {
      router: {
        query: { bid },
      },
    } = this.props;
    const { Title } = process.env;
    const {
      data: { list },
    } = this.props;

    console.log("list:::::", list);

    return (
      <div className={styles.text}>
        我是dashboard页面---{bid}---{Title}

        <p>去往静态化detail</p>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <Link href={`/staticDetail/${item?.name}`}>
                <span>{item?.name}---今年--{item?.age}岁了！！</span>
              </Link>
            </li>
          ))}
        </ul>

        <hr />
        <hr />
        <hr />
        <p>去往服务端渲染detail</p>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <Link href={`/serverDetail/${item?.name}`}>
                <span>{item?.name}---今年--{item?.age}岁了！！</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export const getServerSideProps = async () => {
  const r = await fetch("http://localhost:3000/api/list");
  const data = await r.json();
  return {
    props: {
      data,
    },
  };
};

export default withRouter(DashBoard);
