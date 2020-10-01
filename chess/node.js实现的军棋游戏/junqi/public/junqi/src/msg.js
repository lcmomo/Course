/**
 * 全局消息对象
 *
 */

//消息对象
JunQi.msg={

    serverUrl:'http',
    firstconnect : true,

    //初始化到sockeitIO服务器的连接
    init:function(callback){
        this.serverUrl=JunQi.getUrl();
        if(this.firstconnect) {
            this.socket = io.connect(this.serverUrl);

            this.socket.on('message', function(json){
                JunQi.msg.handleMsg(json);
            });

            //this.socket.on('connect', function(){ status_update("Connected to Server"); });
            //this.socket.on('disconnect', function(){ status_update("Disconnected from Server"); });
            //this.socket.on('reconnect', function(){ status_update("Reconnected to Server"); });
            //this.socket.on('reconnecting', function( nextRetry ){ status_update("Reconnecting in "
            //    + nextRetry + " seconds"); });
            //this.socket.on('reconnect_failed', function(){ message("Reconnect Failed"); });

            this.firstconnect = false;
        } else {
            this.socket.socket.reconnect();
        }
        if(callback){
            callback();
        }

    },

    //向服务器发送消息
    send:function(json) {
        this.socket.send(json );
    },

    //接收到消息后的处理
    handleMsg:function (json) {
        if(json.login){
            JunQi.login.handleMsg(json);
            console.log()
        }

        if(json.game=="allReady"){
            //从服务器请求局面数据
            JunQi.msg.send({game:"getJvMian",roomID:roomID});
        }

        if(json.game=="getJvMian_response"){

            JunQi.jvMian=json.jvMian;
            JunQi.myQiPan.bujv(JunQi.jvMian);
            JunQi.playerTurn=json.playerTurn;
            JunQi.ready=json.ready;
            if(JunQi.ready["room"+roomID]=="yes"){
                JunQi.myQiPan.btnKaiZhan.hide();
                JunQi.myQiPan.btnRenJi.hide();
                JunQi.myQiPan.btnChongWan.show();
            }
        }

        if(json.game=="playing"){
            JunQi.myQiPan.handlePlayMsg(json);
        }

        if(json.game=="buttonEvent"){
            if(json.button=="chongwan"){
                if(confirm("您同意对方的开局请求吗？")){
                    this.send({game:"playerResponse",roomID:json.roomID,playerType:json.playerType,query:"chongwan",response:"yes",msg:"对方同意重新开始"});
                }else{
                    this.send({game:"playerResponse",roomID:json.roomID,playerType:json.playerType,query:"chongwan",response:"no",msg:"对方不同意重新开始"});
                }
            }

            if(json.button=="huiqi"){
                if(confirm("您同意对方的悔棋请求吗？")){
                    this.send({game:"playerResponse",roomID:json.roomID,playerType:json.playerType,query:"huiqi",response:"yes",msg:"对方同意悔棋"});
                }else{
                    this.send({game:"playerResponse",roomID:json.roomID,playerType:json.playerType,query:"huiqi",response:"no",msg:"对方不同意悔棋"});
                }
            }
        }

        if(json.game=="playerResponse"){
            JunQi.myQiPan.handlePlayerResponse(json);
        }
    }
};

//取得url中的参数
JunQi.getQueryString=function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//取得url
JunQi.getUrl=function () {
    var r = window.location.protocol+"//"+window.location.host;
    return r;
}




