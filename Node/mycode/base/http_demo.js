const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res) => {
  console.log(req.url);
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(data);
    })
  }

  if (req.url === '/about') {
    fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(data);
    })
  }

  if (req.url === '/api/user') {
    const users = [{
      name: 'summer', age: 20
    },
  {
    name: 'li', age: 21
  }];

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(users))
  }
})

const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log(`server running ${PORT}...`));