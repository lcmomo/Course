/**
 * 工具栏类
 *
 */
JunQi.toolbarRes={};

JunQi.toolbarRes.colPos=[];
JunQi.toolbarRes.rowPos=[];

//初始化toolbar行列在资源图片中的位置
JunQi.toolbarRes.initRowColPos=function(){
    //以下4个常数值从资源图片中测得
    this.colPos[0]=33;
    this.colPos[4]=326;
    this.rowPos[0]=0;
    this.rowPos[1]=20;

    //"列"在资源图片中的x值
    var i,cp=this.colPos;
    var colWidth=(cp[4]-cp[0])/4;
    for(i=1;i<6;i++){
        cp[i]=cp[0]+colWidth*i;
    }

    //"行"在资源图片中的y值
    var rp=this.rowPos;
    var rowHeight=(rp[1]-rp[0]);
    for(i=1;i<2;i++){
        rp[i]=rp[0]+rowHeight*i;
    }
};


//按钮资源说明
JunQi.buttonRes={};

JunQi.buttonRes.pic = res.qizi_pic;

//按钮在资源图片中的行号与列号
//请注意在图片中y坐标向下，第０行在最上方
JunQi.buttonRes.RowCol={
    "huiqi":[5,0],
    "chongwan":[5,1],
    "kaizhan":[5,2],
    "renji":[5,3]
};

//按钮在资源图片中的宽度与高度
JunQi.buttonRes.width = 88;
JunQi.buttonRes.height = 38;

JunQi.buttonRes.scale = 0.4;

JunQi.buttonRes.colPos=[];
JunQi.buttonRes.rowPos=[];

//初始化按钮行列在资源图片中的位置
JunQi.buttonRes.initRowColPos=function() {
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
    for (i = 1; i < 6; i++) {
        rp[i] = rp[0] + rowHeight * i;
    }
};

//按钮类
JunQi.Button= function(parentSprite) {
    this.parentSprite = parentSprite;


     //创建按钮,localFunc为发送消息前在本地的处理函数
    this.create = function (buttonName,localFunc) {
        this.buttonName=buttonName;
        this.localFunc=localFunc;
        var resRowCol= JunQi.buttonRes.RowCol[buttonName];
        var xOfRes=JunQi.buttonRes.colPos[resRowCol[1]];
        var yOfRes=JunQi.buttonRes.rowPos[resRowCol[0]];

        //创建按钮spirit
        this.buttonSprite = cc.Sprite.create(JunQi.buttonRes.pic, cc.rect(xOfRes, yOfRes, JunQi.buttonRes.width, JunQi.buttonRes.height));
        this.buttonSprite.setScale(JunQi.buttonRes.scale);

        this.parentSprite.addChild(this.buttonSprite, 0);

        this.handleTouch();
        this.buttonSprite.button=this;

    };

    //移动按钮
    this.moveTo=function(row,col){
        this.row=row;
        this.col=col;
        var loc = cc.p( JunQi.toolbarRes.colPos[col],JunQi.toolbarRes.rowPos[row]);
        this.buttonSprite.setPosition(loc);
    };

    this.hide=function(){
        this.buttonSprite.setPosition(cc.p(-100,-100));
    };

    this.show=function(){
        var loc = cc.p( JunQi.toolbarRes.colPos[this.col],JunQi.toolbarRes.rowPos[this.row]);
        this.buttonSprite.setPosition(loc);
    };

    this.handleTouch=function(){
        //添加事件处理
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件处理回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类
                // 获取当前触摸点相对于sprite所在的坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //判断触摸点是否在sprite范围内
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //让sprite在最前面显示(sprite应为layer的子对象)
                    target.setLocalZOrder(100);
                    //如果有事件的本地处理函数
                    if(target.button.localFunc) {
                        if (target.button.localFunc()) {
                            //发送按钮消息
                            JunQi.msg.send({
                                game: "buttonEvent",
                                roomID: roomID,
                                playerType: playerType,
                                button: target.button.buttonName
                            });
                            target.button.hide();
                            console.log("ok");
                            //返回true才会触发onTouchMoved
                            return true;
                        }
                    }else{
                        //发送按钮消息
                        JunQi.msg.send({
                            game: "buttonEvent",
                            roomID: roomID,
                            playerType: playerType,
                            button: target.button.buttonName
                        });
                        target.button.hide();
                        //返回true才会触发onTouchMoved
                        return true;
                    }
                }
                return false;
            },

            onTouchMoved: function (touch, event) {
            },

            onTouchEnded: function (touch, event) {
            }
        }, this.buttonSprite);
    };
};