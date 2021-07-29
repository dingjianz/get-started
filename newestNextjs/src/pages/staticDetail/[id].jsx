/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, memo } from 'react';
import { useRouter } from 'next/router';
import { SelfHeader } from '@components';
import { getDashboardDetail } from '@api/dashboard';

const PageStaticDetail = () => {
  const [data, setDate] = useState(undefined);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(async () => {
    const r = await getDashboardDetail();
    setDate(r);
  }, [id]);

  return (
    <>
      <SelfHeader title="静态化detail" />
      <h1>
        静态化detail---: 查看的是 {id}，今年{data?.age}岁了。
        <p>个人简介： {data?.desc}</p>
      </h1>
      <style jsx>
        {`
          h1 {
            color: green;
          }
        `}
      </style>
    </>
  );
};

/* 
TODO: 如果是动态路由 [id].jsx，则最好使用getStaticPaths
  If a page has dynamic routes (documentation) and uses getStaticProps it needs to define a list of paths that have to be rendered to HTML at build time.
  If you export an async function called getStaticPaths from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths. 
*/

// 此函数在构建时被调用
// export async function getStaticPaths() {
//   // 调用外部 API 获取博文列表
//   const r = await fetch('http://localhost:3001/api/list');
//   const data = await r.json();

//   // 据博文列表生成所有需要预渲染的路径 TODO: 必须得到所有的动态页面
//   const paths = data.list.map((item) => ({
//     params: { id: `${item.name}` },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// 此函数在构建时被调用
// export async function getStaticProps() {
// TODO: 这里是根据 [id]里面的id 动态返回对应的数据
// console.log(context)
// const {
//   params: { id },
// } = context;
// const r = await fetch(
//   `http://localhost:3001/api/detail?name=${encodeURI(id)}`
// );
// const data = await r.json();
// console.log('data', data)
// 调用外部 API 获取博文列表
// 通过返回 { props: { posts } } 对象，Blog 组件
// 在构建时将接收到 `posts` 参数

//   const r = await fetch(`${process.env.baseUrl}/api/v1/getdetail`);
//   const { data } = await r.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default memo(PageStaticDetail);
