// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  // console.log(req.method);
  // console.log(req.query);
  // console.log(req.cookies);
  if (req.method === 'GET') {
    res.status(403);
    res.end('internet Error');
    return;
  }
  console.log(req.body); // 服务端才能看到 === 本地终端能看到
  res.setHeader('content-type', 'application/json;charset=utf-8');
  // res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
