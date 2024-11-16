const fs = require('fs');

// 读取流
const readStream = fs.createReadStream('big-file.txt');

// 写入流
const writeStream = fs.createWriteStream('output.txt');

// 管道传输
readStream.pipe(writeStream);

// 事件处理
readStream.on('data', (chunk) => {
    console.log('接收到数据:', chunk);
}); 