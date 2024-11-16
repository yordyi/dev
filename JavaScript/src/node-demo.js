// 1. 基本 HTTP 服务器
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Node.js!');
});

server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000/');
}); 