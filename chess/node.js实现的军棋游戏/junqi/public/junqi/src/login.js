/**
 * 登陆相关函数
 *
 */

JunQi.login={};

//注册新用户
JunQi.registPlayer=function (){
    var playerName=$('#playerName').val();
    var passWord  =$('#passWord1').val();

    if (playerName =="" || passWord == ""){
        alert("请输入姓名与密码");
        return;
    }

    //向服务器发送注册消息
    JunQi.msg.send({login:"addplayer",playerName:playerName,passWord:passWord});

}

//进入房间,开始游戏
JunQi.enterRoom=function(roomID){
    //if (canEnterRoom) {
    //    if (playerCntInRoom[roomID - 1] < 2) {
            var playerName = $('#playerName').val();
            var passWord = $('#passWord1').val();
            var playerType=$("input[name='playerType']:checked").val();

            if (playerName == "" || passWord == ""||playerType=="") {
                alert("请输入姓名,密码及棋子颜色！");
                return;
            }

            //向服务器发送进入房间消息
            JunQi.msg.send({login:"login",roomID: roomID, playerName: playerName, passWord: passWord,playerType:playerType});

    //  }
    //}
}

//登陆时的初始化操作
JunQi.login.init=function(){
    JunQi.msg.init(
        function(){
            JunQi.msg.send({refreshRoom:1});
        }
    )
}

//处理返回的消息
JunQi.login.handleMsg=function(json){
    if(json.login=="regist_response"){
        alert(json.msg);
    }

    if(json.login=="login_response"){
        if(json.msg=="loginOK"){
            window.location.href="index.html?roomID="+json.roomID+"&playerType="+json.playerType;
        }else{
            alert(json.msg);
        }
    }

    if(json.login=="refreshRoom_response"){
        for(var i in json.roomPlayers){
            var room=json.roomPlayers[i];
            $('#room'+room.id).html("进入游戏<br>[房间"+room.id+"]<br>共 "+room.playerCount+" 人");
        }
    }
}
