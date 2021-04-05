const path = require('path');

console.log(path.basename(__filename));
// path.basename() 返回path的最后一部分
// console.log(path.basename(__filename));

// path.dirname() 返回path的目录名
// console.log(path.dirname(__filename));

// path.extname() 返回文件的扩展名
// console.log(path.extname(__filename));

// path.parse()返回一个对象
// console.log(path.parse(__filename).base);

// path.join() 串联路径
// ../test/hello.html
console.log(path.join(__dirname, 'test','hello.html'));
