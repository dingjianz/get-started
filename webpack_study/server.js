const express = require('express')

let app = express()

app.get('/api', (req,res) => {
  res.json({"name": "丁健"})
})

app.listen(3001)