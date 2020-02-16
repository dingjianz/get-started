let path = require('path')

module.exports = {
  entry: {
    home: './src/home.js',
    about: './src/about.js'
  },
  output: {
    path: path.resolve(__dirname,'../', "dev"),
    filename:"[name].[chunkHash:8].js"
  }
}