const path = require('path')
module.exports = {
  mode: 'none',
  entry: './index.js',
  devtool: false,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
  
}