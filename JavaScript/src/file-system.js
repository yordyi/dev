const fs = require('fs').promises;

async function handleFiles() {
    // 读取文件
    const data = await fs.readFile('file.txt', 'utf8');
    
    // 写入文件
    await fs.writeFile('new.txt', 'Hello!');
    
    // 目录操作
    await fs.mkdir('newDir');
} 