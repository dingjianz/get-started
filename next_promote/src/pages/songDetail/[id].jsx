// 静态生成

import React from 'react';
import fs from 'fs';

const SongDetail = ({ data }) => {
  // console.log(data);
  return (
    <div>
      <h3>静态生成</h3>
      {data.map((item) => {
        return (
          <div key={item.songId}>
            <h1>{item.songName}</h1>
            <img src={item.albumLogo} alt="loading..." />
          </div>
        );
      })}
      <style jsx>
        {`
          img {
            width: 200px;
          }
        `}
      </style>
    </div>
  );
};

// 此函数在构建时被调用
export const getStaticPaths = async () => {
  // 调用外部 API 获取博文列表
  // const res = await fetch('http://localhost:10087/api/list');
  // const data = await res.json();

  // mock 数据
  let data = fs.readFileSync(`${process.cwd()}/json/data.json`, 'utf-8');
  data = JSON.parse(data);

  // 根据博文列表生成所有需要预渲染的路径
  const paths = data.map((item) => ({
    params: { id: `${item.songId}` }, // 这个id 要对应 [id]
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths, // paths是一个数组
    fallback: true, // false即找不到页面直接去404，true 不跳转404
  };
};

// 在构建时也会被调用
export const getStaticProps = async ({ params: { id } }) => {
  /*
    console.log(context);
    {
      params: { id: '2' }, // 自动筛取对应id
      locales: undefined,
      locale: undefined,
      defaultLocale: undefined
    }
  */

  // params 包含此片博文的 `id` 信息。
  // 如果路由是 /posts/1，那么 params.id 就是 1
  // const res = await fetch(`http://localhost:10087/api/list/${id}`);
  // const data = await res.json();

  // mock 数据
  let data = fs.readFileSync(`${process.cwd()}/json/data.json`, 'utf-8');
  let list = null;
  data = JSON.parse(data);
  data.some((item) => {
    if (item.songStringId === id) {
      list = item;
      return true;
    }
    return false;
  });

  // 通过 props 参数向页面传递博文的数据
  return {
    props: { data: [list] }, // 作为组件的props
  };
};

export default SongDetail;
