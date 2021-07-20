// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    list: [
      {name: '张三', age: 18},
      {name: '李四', age: 23},
      {name: '王五', age: 47},
      {name: '赵六', age: 65},
      {name: '章八', age: 99},
    ]
  })
}
