// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log(req.method);
  console.log(req.query);
  console.log(req.cookies);

  res.setHeader('content-type', 'application/json;charset=utf-8');
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
