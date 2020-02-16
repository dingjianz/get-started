import '../css/index.scss'
console.log('index')
import '../../static/lib/remtopx'

import axios from 'axios'

let sercice = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: {}
})

sercice.get('/api').then(res => {
  console.log(res)
})