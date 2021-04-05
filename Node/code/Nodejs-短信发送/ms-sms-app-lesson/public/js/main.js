// 获取节点
const numberInput = document.getElementById('number'),
    textInput = document.getElementById('msg'),
    button = document.getElementById('button'),
    response = document.querySelector('.response');

// 事件监听
button.addEventListener('click', send, false);

// 捕获服务器返回的短信状态
const socket = io();
socket.on('smsStatus', function(data){
    if(data.error){
        response.innerHTML = `<h5>${data.error}</h5>`
    }else{
        response.innerHTML = `<h5>短信已发送至${data.number}</h5>`
    }
})
// send函数
function send(){
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;
    fetch('/',{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({number:number,text:text})
    }).then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}