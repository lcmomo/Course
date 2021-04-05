// 引入模块
const express = require('express');
const bodyParser = require('body-parser');
const ejs= require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// 初始化app
const app = express();

// 初始化nexmo
const nexmo = new Nexmo({
    apiKey:'6cc5dbf9',
    apiSecret:'1oT3oeSpsg0CSQAP'
},{debug:true});
// 设置ejs模版引擎
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 设置public 文件夹
app.use(express.static(__dirname + '/public'));

// 设置body-parser 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// index路由
app.get('/',(req,res) => {
    res.render('index');
})

// 捕获submit
app.post('/',(req,res) => {
    // res.send(req.body);
    // console.log(req.body);

    const number = req.body.number;
    const text = req.body.text;
    nexmo.message.sendSms('8615928514669',number, text, {type:'unicode'}, (err,responseData) =>{
        if(err){
            console.log(err)
        }else{
            console.dir(responseData);
            const data = {
                id:responseData.messages[0]['message-id'],
                number:responseData.messages[0]['to'],
                error:responseData.messages[0]['error-text']
            }

            // 触发事件将数据返回至客户端
            io.emit('smsStatus', data);
        }
    })
})

// 定义端口号
const Port = 4000;

// 监听端口号
const server = app.listen(Port, () => console.log(`服务器运行端口为${Port}`));

// 连接socket.io
const io = socketio(server);
io.on('connection',(server)=>{
    console.log('已连接');
    io.on('disconnect',()=>{
        console.log('已断开')
    })
})