/**
 * 棋盘类
 *
 */

JunQi.qipanRes={};

JunQi.qipanRes.colPos=[];
JunQi.qipanRes.rowPos=[];

JunQi.qipanRes.colUbound=[];
JunQi.qipanRes.rowUbound=[];

//初始化棋盘行列在资源图片中的位置
JunQi.qipanRes.initRowColPos=function(){
    //以下６个常数值从资源图片中测得
    this.colPos[0]=33;
    this.colPos[4]=326;
    this.rowPos[0]=63;
    this.rowPos[5]=223;
    this.rowPos[7]=295;
    this.rowPos[12]=455;

    //"列"在资源图片中的x值
    var i,cp=this.colPos;
    var colWidth=(cp[4]-cp[0])/4;
    for(i=1;i<6;i++){
        cp[i]=cp[0]+colWidth*i;
    }

    //"行"在资源图片中的y值
    var rp=this.rowPos;
    var rowHeight=(rp[5]-rp[0])/5;
    for(i=1;i<5;i++){
        rp[i]=rp[0]+rowHeight*i;
    }
    rp[6]=(rp[5]+rp[7])/2;
    for(i=1;i<5;i++){
        rp[7+i]=rp[7]+rowHeight*i;
    }

    //列所在范围的上限
    for(i=0;i<6;i++){
        this.colUbound[i]=(this.colPos[i]+this.colPos[i+1])/2
    }

    //行所在范围的上限
    for(i=0;i<12;i++){
        this.rowUbound[i]=(this.rowPos[i]+this.rowPos[i+1])/2
    }
};

//棋盘上点所对应的"行"
JunQi.qipanRes.rowOfLoc=function(loc){

    var jp=this.rowUbound;
    for(i=0;i<jp.length;i++){
        if(loc<jp[i])
            return i;
    }
    return jp.length;

};

//棋盘上点所对应的"列"
JunQi.qipanRes.colOfLoc=function(loc){
    //var xp0=15,dxp=67;
    var jp=this.colUbound;
    for(i=0;i<jp.length;i++){
        if(loc<jp[i])
            return i;
    }
    return jp.length;
};

//将布局中的行转换为显示中的行或相反操作
JunQi.qipanRes.convertRow=function(row,playerType){
    if(playerType=="r")
        return row;
    else
        return 12-row;
};

//将布局中的列转换为显示中的列或相反操作
JunQi.qipanRes.convertCol=function(col,playerType){
    if(playerType=="r")
        return col;
    else
        return 4-col;
};

//棋盘类
JunQi.QiPan=function (parentLayer,size){
    this.parentLayer=parentLayer;
    this.qiziSet={};

    this.show=function(){
        //显示棋盘
        this.qipanSprite = cc.Sprite.create(res.qipan_pic);
        this.qipanSprite.setPosition(cc.p(size.width / 2,size.height / 2));
        //this.qipanRes.setScale(0.5);
        parentLayer.addChild(this.qipanSprite, 0);
        this.qipanSprite.qipan=this;

        JunQi.qipanRes.initRowColPos();
        JunQi.qiziRes.initRowColPos();
        JunQi.buttonRes.initRowColPos();
        JunQi.toolbarRes.initRowColPos();

        //显示toolbar
        this.toolbarSprite = cc.Sprite.create(res.toolbar_pic);
        this.toolbarSprite.setPosition(cc.p(size.width / 2,20));
        parentLayer.addChild(this.toolbarSprite, 0);

        //显示按钮
        //this.btnHuiQi = new JunQi.Button(this.toolbarSprite);
        //this.btnHuiQi.create("huiqi");
        //this.btnHuiQi.moveTo(1,3);

        this.btnChongWan = new JunQi.Button(this.toolbarSprite);
        this.btnChongWan.create("chongwan");
        this.btnChongWan.moveTo(1,0);

        this.btnHuiQi = new JunQi.Button(this.toolbarSprite);
        this.btnHuiQi.create("huiqi");
        this.btnHuiQi.moveTo(1,2);

        this.btnKaiZhan = new JunQi.Button(this.toolbarSprite);
        this.btnKaiZhan.create("kaizhan",JunQi.bujvCheckAll);
        this.btnKaiZhan.moveTo(1,4);

        this.btnRenJi = new JunQi.Button(this.toolbarSprite);
        this.btnRenJi.create("renji",JunQi.bujvCheckAll);
        this.btnRenJi.moveTo(1,3);
    };

    //初始化棋子,playerType分为红黑两方，用r,b分别表示
    this.init_qizi=function(playerType){
        var row,col;
        for(row=0;row<13;row++) {
            for (col = 0; col < 5; col++) {
                var qiziName = JunQi.init_bujv[row][col];
                if (qiziName != "") {
                    this.qiziSet[qiziName] = new JunQi.QiZi(this.parentLayer,this.qipanSprite);
                    this.qiziSet[qiziName].create(qiziName,playerType);
                }
            }
        }

    };

    //按布局数据摆放棋子,请注意在Cocos2d中，y坐标向上，第０行在最下面
    this.bujv=function(buJvArray){
        var qizi,row,col;
        for(row=0;row<13;row++) {
            for (col = 0; col < 5; col++) {
                var qiziName = buJvArray[row][col];
                if (qiziName != "") {
                    qizi=this.qiziSet[qiziName];
                    qizi.moveTo(row,col);
                }
            }
        }
    }

    //隐藏所有的棋子
    this.hideAll=function(){
        for(var qiziName in this.qiziSet){
            this.qiziSet[qiziName].hide();
        }
    }

    //处理走棋消息
    this.handlePlayMsg=function(msg){

        //收到对方发来的走子消息，则轮到我方走子
        if(msg.playerType!=playerType){
            if(msg.playerType=="r")
                JunQi.playerTurn="b";
            else
                JunQi.playerTurn="r";
        }

        var qizi, e;
        var doAfterMoving=function(){
            for(var i in msg.events){
                e=msg.events[i];
                if(e.act=="hiding"){
                    qizi=JunQi.myQiPan.qiziSet[e.qizi];
                    qizi.hide();
                }
                if(e.act=="gameover"){
                    JunQi.playerTurn = "none";
                    if(playerType== e.winner){
                        alert("我方胜利！");
                    }else{
                        alert("我方失败！");
                    }
                }
            }
        };

        for(var i in msg.events){
            e=msg.events[i];
            if(e.act=="moving"){
                qizi=JunQi.myQiPan.qiziSet[e.qizi];
                if(playerType==msg.playerType){
                    qizi.moveTo(e.row, e.col,doAfterMoving);
                }else{
                    qizi.moveSlowly(e.row, e.col,doAfterMoving);
                }
            }

            if(e.act=="jvmian"){
                JunQi.jvMian[e.row][e.col]= e.qizi;
            }

            if(e.act=="gameover"&& e.tag=="no-moving"){
                doAfterMoving();
            }
        }
    }

    //处理玩家响应
    this.handlePlayerResponse = function(json){
        //因为json.playerType中存放的是最先发起请求的玩家类型，现在响应回来了
        if(playerType==json.playerType){
            alert(json.msg);
        }

        if( json.response=="yes"){
            if(json.query=="chongwan"){
                //重新开始游戏，向服务器发送消息
                JunQi.msg.send({game:"start",roomID:roomID,playerType:playerType});
                //从服务器请求局面数据
                JunQi.msg.send({game:"getJvMian",roomID:roomID});
                this.btnChongWan.show();
                this.btnHuiQi.show();
                this.btnKaiZhan.show();
                this.btnRenJi.show();
            }
            if(json.query=="huiqi"){
                //从服务器请求局面数据
                JunQi.msg.send({game:"getJvMian",roomID:roomID});
                this.btnHuiQi.show();
            }
        }
    }
};



