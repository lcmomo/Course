/**
 * 棋子类
 *
 */

JunQi.qiziRes={};

JunQi.qiziRes.pic = res.qizi_pic;

//按钮在资源图片中的行号与列号
//请注意在图片中y坐标向下，第０行在最上方
JunQi.qiziRes.RowCol={
    "dilei_r":[0,0],
    "junqi_r":[0,1],
    "paizhang_r":[0,2],
    "zhadan_r":[0,3],
    "gongbing_r":[0,4],
    "lianzhang_r":[1,0],
    "tuanzhang_r":[1,1],
    "yingzhang_r":[1,2],
    "lvzhang_r":[1,3],
    "siling_r":[1,4],
    "junzhang_r":[2,0],
    "shizhang_r":[2,1],
    "beimian":[2,2],
    "dilei_b":[3,0],
    "junqi_b":[3,1],
    "paizhang_b":[3,2],
    "zhadan_b":[3,3],
    "gongbing_b":[3,4],
    "lianzhang_b":[4,0],
    "tuanzhang_b":[4,1],
    "yingzhang_b":[4,2],
    "lvzhang_b":[4,3],
    "siling_b":[4,4],
    "junzhang_b":[2,3],
    "shizhang_b":[2,4]
};

//棋子在资源图片中的宽度与高度
JunQi.qiziRes.width = 88;
JunQi.qiziRes.height = 56;

JunQi.qiziRes.scale = 0.4;

JunQi.qiziRes.colPos=[];
JunQi.qiziRes.rowPos=[];

//初始化棋子行列在资源图片中的位置
JunQi.qiziRes.initRowColPos=function() {
    //以下4个常数值从资源图片中测得
    this.colPos[0] = 7;
    var colWidth = 100;
    this.rowPos[0] = 5;
    var rowHeight = 64;

    //"列"在资源图片中的x值
    var i, cp = this.colPos;
    for (i = 1; i < 5; i++) {
        cp[i] = cp[0] + colWidth * i;
    }

    //"行"在资源图片中的y值
    var rp = this.rowPos;
    for (i = 1; i < 5; i++) {
        rp[i] = rp[0] + rowHeight * i;
    }
};

//棋子类
JunQi.QiZi= function(parentLayer,qipanSprite) {
    this.parentLayer = parentLayer;
    this.qipanSprite = qipanSprite;

     //创建棋子，playerType分为红黑两方，用r,b分别表示
    this.create = function (qiziName, playerType) {
        this.qiziName=qiziName;
        this.playerType=playerType;
        var qiziType=qiziName.substr(qiziName.length-1,1);

        var res_name
        if(qiziType==playerType){
            res_name = qiziName.split("_")[0]+"_"+playerType;
        }else{
            //如果玩家类型与棋子类型不同，则显示“背面”
            res_name ="beimian"
        }

        var resRowCol= JunQi.qiziRes.RowCol[res_name];
        var xOfRes=JunQi.qiziRes.colPos[resRowCol[1]];
        var yOfRes=JunQi.qiziRes.rowPos[resRowCol[0]];

        //创建棋子spirit
        this.qiziSprite = cc.Sprite.create(JunQi.qiziRes.pic, cc.rect(xOfRes, yOfRes, JunQi.qiziRes.width, JunQi.qiziRes.height));
        this.qiziSprite.setScale(JunQi.qiziRes.scale);

        //将棋子sprite加入layer而不是棋盘sprite,是因为要在touch事件中动态改变棋子的ZOrder
        //layer的子对象可以在事件中改变ZOrder,但sprite的子对象做不到这一点
        this.parentLayer.addChild(this.qiziSprite, 0);
        this.hide();

        if(qiziType==playerType){
            this.handleTouch();
            this.qiziSprite.qizi=this;
        }
    };

    //移动棋子后再执行callBack
    this.moveTo=function(row,col,callBack){
        //记录当前位置，以红方为已方的布局数组中的位置
        this.currentRow=row;
        this.currentCol=col;
        //转换为实际显示的位置
        row= JunQi.qipanRes.convertRow(row,this.playerType);
        col= JunQi.qipanRes.convertCol(col,this.playerType);
        var loc = this.qipanSprite.convertToWorldSpace(cc.p( JunQi.qipanRes.colPos[col],JunQi.qipanRes.rowPos[row]));
        this.qiziSprite.setPosition(loc);
        if(callBack){
            callBack();
        }

    };

    //缓动，移动棋子后再执行callBack
    this.moveSlowly=function(row,col,callBack){
        //当前走动的棋子置于最上层
        this.qiziSprite.setLocalZOrder(100);
        //记录当前位置，以红方为已方的布局数组中的位置
        this.currentRow=row;
        this.currentCol=col;
        //转换为实际显示的位置
        row= JunQi.qipanRes.convertRow(row,this.playerType);
        col= JunQi.qipanRes.convertCol(col,this.playerType);
        var loc = this.qipanSprite.convertToWorldSpace(cc.p( JunQi.qipanRes.colPos[col],JunQi.qipanRes.rowPos[row]));

        var action = cc.MoveTo.create(1,loc);
        if(callBack) {
            var seq = cc.Sequence.create(action, cc.callFunc(callBack));
            this.qiziSprite.runAction(seq);
        }else{
            this.qiziSprite.runAction(action);
        }
    };

    this.hide=function(){
        this.qiziSprite.setPosition(cc.p(-100,-100));
    };

    this.handleTouch=function(){
        //添加事件处理
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件处理回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类

                //该房间已就绪，并且没有轮到自己走棋
                if(JunQi.ready["room"+roomID]=="yes"){
                    if(JunQi.playerTurn!=playerType) {//未轮到自已走棋
                        return false;
                    }
                }else{//该房间未就绪
                    if(JunQi.ready[playerType]=="yes") {//已方已布局完成
                        return false;
                    }
                }


                // 获取当前触摸点相对于棋子所在的坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                //cc.log(s.width, s.height);
                //cc.log(locationInNode.x,locationInNode.y)

                //判断触摸点是否在棋子范围内
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //让当前棋子在最前面显示(棋子应为layer的子对象)
                    target.setLocalZOrder(100);
                    //返回true才会触发onTouchMoved
                    return true;
                }
                return false;
            },

            onTouchMoved: function (touch, event) {

                // 移动当前棋子的坐标位置
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                // 获取当前触摸点相对于棋盘所在的坐标
                var locQiPan = target.qizi.qipanSprite.convertToNodeSpace(touch.getLocation());
                var row=JunQi.qipanRes.rowOfLoc(locQiPan.y);
                var col=JunQi.qipanRes.colOfLoc(locQiPan.x);

                //取得目标点行列位置,要处理黑方的视角转换
                row= JunQi.qipanRes.convertRow(row,target.qizi.playerType);
                col= JunQi.qipanRes.convertCol(col,target.qizi.playerType);

                if(JunQi.ready["room"+roomID]=="yes"&&JunQi.ready[playerType]=="yes") {
                    //按军棋规则处理棋子的移动
                    JunQi.handleMove(target.qizi.currentRow, target.qizi.currentCol, row, col, target.qizi);
                }else{
                    //按布局规则处理棋子的移动
                    JunQi.handleBujv(target.qizi.currentRow, target.qizi.currentCol, row, col, target.qizi);
                }
                //cc.log("row:"+row+",col:"+col);
            }
        }, this.qiziSprite);
    };
};