// 服务端渲染

import React from 'react';
import fs from 'fs';

const SongDetail = ({ data = [] }) => {
  // console.log(data);
  return (
    <div>
      <h3>服务端渲染</h3>
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

// 在页面每次请求时被调用
export const getServerSideProps = async ({ params, query: { id } }) => {
  // console.log({ params, id });
  // 调用外部 API 获取博文列表
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
  return {
    props: { data: [list] },
  };
};

export default SongDetail;
