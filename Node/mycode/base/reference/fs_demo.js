const fs = require('fs');

const path = require('path');

// fs.mkdir() // 创建异步目录(创建文件夹)
// fs.mkdir(path.join(__dirname, '/test'), {}, err => {
//     if (err) throw err;
//     console.log('文件夹已创建...');
// });

// fs.write() 写入异步文件
// fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello World!', err => {
//     if(err) throw err;
//     console.log('文件已被写入...');
//     fs.appendFile(path.join(__dirname,'/test','hello.txt'), 'I love Node.js', err => {
//         if(err) throw err;
//         console.log('文件已被写入...');
//     })
//  })

// fs.readFile(); 读取文件
// fs.readFile(path.join(__dirname, '/test','hello.txt'), 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

// fs.rename() 文件重命名
// fs.rename(path.join(__dirname,'/test','hello.txt'),path.join(__dirname,'/test', 'helloworld.txt'), err => {
//     if(err) throw err;
//     console.log('文件已被重新命名...');
// })