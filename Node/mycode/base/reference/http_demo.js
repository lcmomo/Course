const http = require('http');

//创建服务器
http.createServer((req, res) =>{
  console.log(req.url);
  res.write("hello !");
  res.end()
}).listen(3000, () => {

  console.log("server running")
})