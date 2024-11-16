const fs = require('fs');

function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// 使用
readFileAsync('file.txt')
    .then(data => console.log(data))
    .catch(err => console.error(err)); 