

//房间号
var roomID;
//红方或黑方
var playerType;
//轮到走子的玩家类型
JunQi.playerTurn="r";
//玩家是否就绪，布局完成
JunQi.ready={};

var MyLayer = cc.Layer.extend({
    size:null,
    init:function () {
        this._super();

        /*********游戏写在这这个区域里*********/

        //屏幕尺寸 screen size
        var size = cc.director.getWinSize();

        JunQi.myQiPan = new JunQi.QiPan(this,size);
        JunQi.myQiPan.show();

        //从请求地址取得房间号与玩家类型
        roomID=JunQi.getQueryString('roomID');
        playerType=JunQi.getQueryString('playerType');

        //棋子的初始化，playerType取值：r表示红方，b表示黑方
        JunQi.myQiPan.init_qizi(playerType);

        //消息对象初始化
        JunQi.msg.init();
        //开始游戏，向服务器发送消息
        JunQi.msg.send({game:"start",roomID:roomID,playerType:playerType});
        //从服务器请求局面数据
        JunQi.msg.send({game:"getJvMian",roomID:roomID});

        // cc.audioEngine.playMusic("res/back01.mp3", true);

        /*********游戏写在这这个区域里*********/
        return true;
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});

