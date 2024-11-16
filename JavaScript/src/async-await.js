async function processFiles() {
    try {
        const file1 = await readFileAsync('1.txt');
        const file2 = await readFileAsync('2.txt');
        return file1 + file2;
    } catch (err) {
        console.error('处理文件出错:', err);
    }
} 