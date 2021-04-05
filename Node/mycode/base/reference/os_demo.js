// 引入模块
const os = require('os');

// os.platform() 返回标示操作系统平台的字符串
console.log(os.platform());

// os.arch() 返回cup架构
console.log(os.arch());

// os.cups() 返回内核信息
console.log(os.cpus());

// os.freemen() 返回空闲的系统内存 （以字节为单位）
console.log(os.freemem());

// os.totalmen() 返回系统的内存总量
console.log(os.totalmem());

// os.homedir() 返回用户的主目录的字符串路径
console.log(os.homedir());

// os.uptime() 返回系统的正常运行时间（以秒为单位）
console.log(os.uptime());