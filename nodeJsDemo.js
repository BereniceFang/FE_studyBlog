//简单的server
var http = require('http')
http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  response.end('hello world\n')
}).listen(8124)

console.log('Server running at 127.0.0.1:8124')

// 简易的ls
var fs = require('fs');
var files = fs.readdirSync('./');
console.log(files);
