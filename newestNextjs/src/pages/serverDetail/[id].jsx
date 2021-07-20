import React from "react";
import { useRouter } from "next/router";
import { SelfHeader } from "@components";

const PageServerDetail = ({ data }) => {
  // console.log('props', props)
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <>
      <SelfHeader title="服务端渲染detail" />
      <h1>
        服务端渲染detail---{id}: 查看的是{data?.name}，其今年{data?.age}岁了
      </h1>
      <style jsx>
        {`
          h1 {
            color: purple;
          }
        `}
      </style>
    </>
  );
};


// 此函数在构建时被调用
export async function getServerSideProps(context) {
  // TODO: 这里是根据 [id]里面的id 动态返回对应的数据
  // console.log(context)
  const {
    query: { id },
  } = context;
  const r = await fetch(
    `http://localhost:10010/api/detail?name=${encodeURI(id)}`
  );
  const data = await r.json();
  console.log('data', data)
  // 调用外部 API 获取博文列表
  // 通过返回 { props: { posts } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数
  return {
    props: {
      data,
    },
  };
}

export default PageServerDetail;
