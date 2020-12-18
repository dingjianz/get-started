import fs from 'fs';

export default (req, res) => {
  console.log(req.query);
  // mock 数据
  let data = fs.readFileSync(`${process.cwd()}/json/data.json`, 'utf-8');
  data = JSON.parse(data);
  const r = data.filter((item) => item.songStringId === req.query.id);
  console.log(r);
  res.setHeader('content-type', 'application/json;charset=utf-8');
  res.statusCode = 200;
  res.send(r);
};
