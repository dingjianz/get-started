// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mapObj = {
  张三: { name: '张三', age: 18 },
  李四: { name: '李四', age: 23 },
  王五: { name: '王五', age: 47 },
  赵六: { name: '赵六', age: 65 },
  章八: { name: '章八', age: 99 },
};

export default function handler(req, res) {
  const {
    query: { name },
  } = req;
  res.status(200).json(mapObj?.[decodeURI(name)]);
}
