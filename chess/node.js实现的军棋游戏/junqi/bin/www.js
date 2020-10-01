#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('junqi2:server');
var http = require('http');

//从游戏数据库中加载
var db=require('./db');
db.players=db.load("players");
db.roomPlayers=db.load("roomPlayers");
db.rooms=db.load("rooms");
for(var i in db.rooms){
  db.rooms[i]["top"]=0;
  db.rooms[i]["jvMian"]=[];
  db.rooms[i]["jvMian"][0]=db.init_bujv;
  db.rooms[i]["playerTurn"]="r";
  db.rooms[i]["ready"]={"r":"no","b":"no",room:"no"};
  db.rooms[i].robot=0;
}
//自动对战机器人
var robotFactory=require('./robot');



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/**
 *
 * socketIO服务端
 * 知识点：
 * 由于安装了sockit.io服务端，因此在html页面中
 *可以用/socket.io/socket.io.js的形式引用sockio客户端。
 */

var io = require('socket.io').listen(server);
var socketPool={};
var playerPool={};

io.sockets.on('connection', function(socket){
  //console.log("Socket " + socket.id + " connected.");

  socket.on('message', function(json){

    console.log("Received message: " + JSON.stringify(json) + " - from client " + socket.id);

    //请求刷新房间信息
    if(json.refreshRoom){
      socket.send({login:"refreshRoom_response",roomPlayers:db.roomPlayers});
    }

    //请求注册
    if(json.login=="addplayer"){
      if(db.players[json.playerName]){
        socket.send({login:"regist_response",msg:"用户已存在!"});
      }else{
        db.players[json.playerName]=json.passWord;
        db.save("players",db.players);
        socket.send({login:"regist_response",msg:"注册成功!"});
      }
    }

    //请求登陆
    if(json.login=="login"){
      if(db.players[json.playerName]==json.passWord){
        var room="room"+json.roomID;

        if(db.roomPlayers[room].playerCount>1){
          socket.send({login:"login_response",msg:"房间已满！",roomID:json.roomID,playerType:json.playerType});
          return;
        }

        if(db.rooms[room][json.playerType]==1){
          socket.send({login:"login_response",msg:"已有玩家选择此位置!"});
          return;
        }

        //进入玩家位置（红方或黑方）
        if(db.roomPlayers[room].playerCount<2){
          db.roomPlayers[room].playerCount++;
        }
        db.rooms[room][json.playerType]=1;
        db.rooms[room][json.playerType+'player']=json.playerName;
        socket.send({login:"login_response",msg:"loginOK",roomID:json.roomID,playerType:json.playerType});

      }else{
        socket.send({login:"login_response",msg:"用户不存在或密码不正确!"});
      }
    }

    //游戏开始，保存客户端socket,记录socket与棋局的关系
    if(json.game=="start"){
      if(json.playerType){
        socketPool["room"+json.roomID+json.playerType]=socket;
        playerPool[socket.id]={roomID:json.roomID,playerType:json.playerType};
      }
    }

    //游戏进行中，收到棋局消息后向对方转发消息
    if(json.game=="playing"){
      //双人对战时
      if(db.rooms[i].robot==0){
        sendToTargetPlayer(json.playerType,json.roomID,json);
      }
    }

    //游戏进行中，收到按钮消息
    if(json.game=="buttonEvent"){

      //重玩，开新局
      if(json.button=="chongwan" ){
        var room="room"+json.roomID;
        if(db.rooms[room].robot) {//人机对战
          reStartGame(json.roomID);
          var respMsg = {
            game: "playerResponse",
            roomID: json.roomID,
            playerType: json.playerType,
            query: "chongwan",
            response: "yes",
            msg: "机器人同意您的请求"
          }
          socket.send(respMsg);
        }else{
          sendToTargetPlayer(json.playerType, json.roomID, json);
        }
      }

      //悔棋
      if(json.button=="huiqi"){
        var room="room"+json.roomID;
        if(db.rooms[room].robot) {//人机对战
          var respMsg = {
            game: "playerResponse",
            roomID: json.roomID,
            playerType: json.playerType,
            query: "huiqi",
            response: "yes",
            msg: "机器人同意您的请求"
          }
          if (db.rooms[room]["top"] > 0) {//向对方转发消息
            db.rooms[room]["top"]--;
            db.rooms[room]["playerTurn"]=switchPlayerType(db.rooms[room]["playerTurn"]);
          } else {//通知对方无法悔棋
            respMsg.response= "no";
            respMsg.msg= "现在无法悔棋";
          }
          socket.send(respMsg);

        }else{//双人对战
          if (db.rooms[room]["top"] > 0) {//向对方转发消息
            sendToTargetPlayer(json.playerType, json.roomID, json);
          } else {//通知双方无法悔棋
            var respMsg = {
              game: "playerResponse",
              roomID: json.roomID,
              playerType: json.playerType,
              query: "huiqi",
              response: "no",
              msg: "现在无法悔棋"
            }
            sendTwoPlayer(json.playerType, json.roomID, respMsg);
          }
        }
      }

      //布局完成，双人对战
      if(json.button=="kaizhan"){
        var room="room"+json.roomID;
        db.rooms[room]["ready"][json.playerType]="yes";
        db.rooms[i].robot=0;
        if(db.rooms[room]["ready"]["r"]=="yes" && db.rooms[room]["ready"]["b"]=="yes"){
          if(db.rooms[room]["ready"][room]!="yes"){
            db.rooms[room]["ready"][room]="yes";
            sendTwoPlayer(json.playerType,json.roomID,{game:"allReady"});
          }
        }
      }

      //布局完成，人机对战
      if(json.button=="renji"){
        var room="room"+json.roomID;
        db.rooms[room]["ready"][json.playerType]="yes";
        if(db.rooms[room]["ready"][room]!="yes"){
          db.rooms[room]["ready"][room]="yes";
          db.rooms[room].robot=new robotFactory.Robot(json.roomID,switchPlayerType(json.playerType),socket);
          socket.send({game:"allReady"});
          if(json.playerType=="b"){//如果玩家是黑方，则机器人先走
            db.rooms[room].robot.setJvMian(db.rooms[room]["jvMian"][db.rooms[room]["top"]]);
            var jvMian=db.rooms[room].robot.go();
            db.rooms[room]["top"]++;
            db.rooms[room]["jvMian"][db.rooms[room]["top"]] = jvMian;
            db.rooms[room]["playerTurn"] = json.playerTurn;
          }
        }
      }
    }

    //收到玩家的对对手的请求的响应
    if(json.game=="playerResponse"){
      if(json.query=="chongwan"&&json.response=="yes"){
        reStartGame(json.roomID);
      }
      if(json.query=="huiqi"&&json.response=="yes"){
        var room="room"+json.roomID;
        if(db.rooms[room]["top"]>0){
          db.rooms[room]["top"]--;
          db.rooms[room]["playerTurn"]=switchPlayerType(db.rooms[room]["playerTurn"]);
        }
      }
      sendTwoPlayer(json.playerType,json.roomID,json);
    }

    //收到更新局面消息
    if(json.game=="updateJvMian"){
      var room = "room" + json.roomID;
      db.rooms[room]["top"]++;
      db.rooms[room]["jvMian"][db.rooms[room]["top"]] = json.jvMian;
      db.rooms[room]["playerTurn"] = json.playerTurn;

      if(db.rooms[room].robot){//人机对战
          db.rooms[room].robot.setJvMian(json.jvMian);
          var jvMian=db.rooms[room].robot.go();
          db.rooms[room]["top"]++;
          db.rooms[room]["jvMian"][db.rooms[room]["top"]] = jvMian;
      }
    }

    //在布局阶段会收到收到更新半个局面消息
    if(json.game=="updateHalfJvMian"){
      var room="room"+json.roomID;
      db.rooms[room]["jvMian"][0]=db.updateHalfJvMian(db.rooms[room]["jvMian"][0],json.jvMian,json.playerType);
    }

    //请求局面数据
    if(json.game=="getJvMian"){
      var room="room"+json.roomID;
      var jvMian=db.rooms[room]["jvMian"][db.rooms[room]["top"]];
      socket.send({game:"getJvMian_response",playerTurn:db.rooms[room]["playerTurn"],ready:db.rooms[room]["ready"],jvMian:jvMian});
    }

  });

  socket.on('disconnect', function(){
    //console.log("Socket: " + socket.id + " disconnect.");
    if(playerPool[socket.id]){
      var room="room"+playerPool[socket.id].roomID;
      var playerType=playerPool[socket.id].playerType;
      if(db.roomPlayers[room].playerCount>0){
        db.roomPlayers[room].playerCount--;
      }
      db.rooms[room][playerType]=0;
      delete playerPool[socket.id];
    }

  });

});

//向对方玩家发送消息
function sendToTargetPlayer(myPlayerType,myRoomID,msg) {
  var targetPlayerType="r";
  if(myPlayerType=="r"){
    targetPlayerType="b"
  }
  if(socketPool["room"+myRoomID+targetPlayerType]){
    socketPool["room"+myRoomID+targetPlayerType].send(msg);
  }
}

//向双方玩家发送消息
function sendTwoPlayer(myPlayerType,myRoomID,msg) {
  var targetPlayerType=switchPlayerType(myPlayerType);
  if(socketPool["room"+myRoomID+targetPlayerType]){
    socketPool["room"+myRoomID+targetPlayerType].send(msg);
  }
  if(socketPool["room"+myRoomID+myPlayerType]){
    socketPool["room"+myRoomID+myPlayerType].send(msg);
  }
}

//切换玩家类型
function switchPlayerType(playerType){
  if(playerType=="r"){
    return "b";
  }else{
    return "r";
  }
}

//重新开始
function reStartGame(roomID){
  var room="room"+roomID;
  db.rooms[room]["top"]=0;
  db.rooms[room]["jvMian"]=[];
  db.rooms[room]["jvMian"][0]=db.init_bujv;
  db.rooms[room]["playerTurn"]="r";
  db.rooms[room]["ready"]={"r":"no","b":"no",room:"no"};
  db.rooms[i].robot=0;
}
