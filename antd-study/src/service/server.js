const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    console.log(req.url)
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8009');
    res.setHeader("Access-Control-Allow-Credentials", "true"); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');  
    res.setHeader("Content-Type", "application/json;charset=utf-8"); 
    next();
    res.send('get请求已经被处理');

})

app.listen(8010, () => {
  console.log('8010 is listening')
})