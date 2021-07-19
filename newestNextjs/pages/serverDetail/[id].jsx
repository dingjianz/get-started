import React from "react";
import { useRouter } from 'next/router';

const PageDetail = ({ data }) => {
  // console.log('props', props)
  const router = useRouter();
  const { query: {
    id
  }} = router;

  return <h1>detail---{id}: 查看的是{data?.name}，其今年{data?.age}岁了</h1>;
};

// 此函数在构建时被调用
export async function getStaticPaths() {
// 调用外部 API 获取博文列表
const r = await fetch("http://localhost:3000/api/list");
const data = await r.json();

// 据博文列表生成所有需要预渲染的路径 TODO: 必须得到所有的动态页面
const paths = data.list.map((item) => ({
  params: { id: item.name + '' },
}));

// We'll pre-render only these paths at build time.
// { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// 此函数在构建时被调用
export async function getStaticProps(context) {
  // TODO: 这里是根据 [id]里面的id 动态返回对应的数据
  // console.log(context)
  const { params: { id }} = context;
  const r = await fetch(`http://localhost:3000/api/detail?name=${encodeURI(id)}`);
  const data = await r.json();
  // console.log('data', data)
// 调用外部 API 获取博文列表
// 通过返回 { props: { posts } } 对象，Blog 组件
// 在构建时将接收到 `posts` 参数
  return {
    props: {
      data
    },
  };
}

export default PageDetail;
