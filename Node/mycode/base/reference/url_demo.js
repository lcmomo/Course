// 引入模块
const url = require('url');

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

// 序列化URL
// console.log(myUrl.href);
// console.log(myUrl.toString());

// host
// console.log(myUrl.host);

// hostname
// console.log(myUrl.hostname);


// pathname
// console.log(myUrl.pathname);

// search
// console.log(myUrl.search);

// searchparams 
// console.log(myUrl.searchParams);

// append()
// myUrl.searchParams.append('abc','123');
// console.log(myUrl.searchParams);

// forEach
// myUrl.searchParams.forEach((value,name) => {
//     console.log(`${name}:${value}`);
// })
