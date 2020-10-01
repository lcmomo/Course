/**
*走棋机器人
 */

var robotFactory={};

robotFactory.Robot=function(roomID,playerType,socket) {

    this.roomID = roomID;
    this.playerType = playerType;
    this.socket = socket;

    //设置当前局面
    this.setJvMian=function(jvMian){
        var row,col;
        this.jvMian=[];
        for(row=0;row<13;row++) {
            this.jvMian[row]=[];
            for (col = 0; col < 5; col++) {
                this.jvMian[row][col]=jvMian[row][col];
            }
        }
    };

    //取得临时局面
    this.getTempJvMian=function(jvMian){
        var row,col;
        var tempJvMian=[];
        for(row=0;row<13;row++) {
            tempJvMian[row]=[];
            for (col = 0; col < 5; col++) {
                tempJvMian[row][col]=jvMian[row][col];
            }
        }
        return tempJvMian;
    };

    //走一步棋
    this.go=function(){
        this.findSrc();
        //找到局面最优的目标点
        var maxVal=-1,resSrc={row:-1,col:-1},resTarget={row:-1,col:-1};
        for(var s=0;s<this.srcStack.top;s++){
            var tmpSrc=this.srcStack.ele[s];
            //console.log(tmpSrc);
            //找出当前源点的所有可达点
            var target=this.findTarget(tmpSrc);
            for(var i=0;i<this.targetStack.top;i++){
                var tmpTarget=this.targetStack.ele[i];
                var tmpVal = this.computeTargetJvMian(tmpSrc.row,tmpSrc.col,tmpTarget.row,tmpTarget.col);
                //console.log(tmpVal);
                if(tmpVal > maxVal){
                    maxVal=tmpVal;
                    resSrc=tmpSrc;
                    resTarget=tmpTarget;
                }
            }
        }
        this.handleMove(resSrc.row,resSrc.col,resTarget.row,resTarget.col);
        return this.jvMian;
    }

    //找出可以走的棋子
    this.findSrc=function(){
        this.srcStack=new Stack();
        var row,col;
        for(row=0;row<13;row++) {
            for (col = 0; col < 5; col++) {
                var qiziName = this.jvMian[row][col];
                if (qiziName != "") {
                    var qiziType = qiziName.substr(qiziName.length - 1, 1);
                    if(qiziType==this.playerType){
                        this.srcStack.push({row:row,col:col});
                    }
                }
            }
        }
    }

    //找出目标点
    this.findTarget=function(src){
        this.targetStack=new Stack();
        var row,col;
        if(src.row==-1||src.col==-1){
            return ;
        }

        for(row=0;row<13;row++) {
            for (col = 0; col < 5; col++) {
                if (this.moveJudge(src.row,src.col,row,col)) {
                    this.targetStack.push({row:row,col:col});
                }
            }
        }
    }

    //计算目标局面的估值
    this.computeTargetJvMian = function (srcRow, srcCol, targetRow, targetCol) {
        var tempJvMian= this.getTempJvMian(this.jvMian);
        var qiziName=this.jvMian[srcRow][srcCol];
        //如果目标点为空位
        if (this.jvMian[targetRow][targetCol] == "") {
            tempJvMian[targetRow][targetCol]=qiziName;
            tempJvMian[srcRow][srcCol]="";
        } else { //调用此函数前已做检查，如果不是空位，则一定是对方的棋子
            var targetName = this.jvMian[targetRow][targetCol];
            var targetType = targetName.substr(targetName.length - 1, 1);
            var result = JunQi.powerJudge(qiziName, targetName);
            if (result == 0) {
                tempJvMian[targetRow][targetCol]="";
                tempJvMian[srcRow][srcCol]="";
            }
            if (result == 1) {
                tempJvMian[targetRow][targetCol]=qiziName;
                //在可以吃掉对方棋子的情况下，在原位置处保留原棋子，在估值时会因为吃掉的对方棋子而加分
                tempJvMian[srcRow][srcCol]=qiziName;
            }
            if (result == -1) {
                tempJvMian[targetRow][targetCol]=targetName;
                tempJvMian[srcRow][srcCol]="";              }
            if (result == 2) {
                tempJvMian[targetRow][targetCol]=qiziName;
                tempJvMian[srcRow][srcCol]="";               }
        }
        return  this.jvMianGuZhi(tempJvMian);
    }

    //处理棋子的移动
    this.handleMove = function (srcRow, srcCol, targetRow, targetCol) {
        var msg = {game: "playing", roomID: this.roomID, playerType: this.playerType, events: []};
        //机器人无子可走
        if(srcRow < 0 || targetRow < 0){
            var winner=this.playerType=="r"?"b":"r";
            msg.events[0] = {act:"gameover",winner:winner,tag:"no-moving"};
            this.socket.send(msg);
            return;
        }
        var qiziName=this.jvMian[srcRow][srcCol];
        //如果目标点为空位
        if (this.jvMian[targetRow][targetCol] == "") {
            msg.events[0] = {act: "moving", qizi: qiziName, row: targetRow, col: targetCol};
            msg.events[1] = {act: "jvmian", qizi: qiziName, row: targetRow, col: targetCol};
            msg.events[2] = {act: "jvmian", qizi: "", row: srcRow, col: srcCol};
        } else { //调用此函数前已做检查，如果不是空位，则一定是对方的棋子
            var targetName = this.jvMian[targetRow][targetCol];
            var targetType = targetName.substr(targetName.length - 1, 1);
            var result = JunQi.powerJudge(qiziName, targetName);
            if (result == 0) {
                msg.events[0] = {act: "moving", qizi: qiziName, row: targetRow, col: targetCol};
                msg.events[1] = {act: "hiding", qizi: qiziName};
                msg.events[2] = {act: "hiding", qizi: targetName};
                msg.events[3] = {act: "jvmian", qizi: "", row: targetRow, col: targetCol};
                msg.events[4] = {act: "jvmian", qizi: "", row: srcRow, col: srcCol};
            }
            if (result == 1) {
                msg.events[0] = {act: "moving", qizi: qiziName, row: targetRow, col: targetCol};
                msg.events[1] = {act: "hiding", qizi: targetName};
                msg.events[2] = {act: "jvmian", qizi: qiziName, row: targetRow, col: targetCol};
                msg.events[3] = {act: "jvmian", qizi: "", row: srcRow, col: srcCol};
            }
            if (result == -1) {
                msg.events[0] = {act: "moving", qizi: qiziName, row: targetRow, col: targetCol};
                msg.events[1] = {act: "hiding", qizi: qiziName};
                msg.events[2] = {act: "jvmian", qizi: "", row: srcRow, col: srcCol};
            }
            if (result == 2) {
                msg.events[0] = {act: "moving", qizi: qiziName, row: targetRow, col: targetCol};
                msg.events[1] = {act: "gameover", qizi: qiziName};
            }
        }
        this.handlePlayMsg(msg);
        this.socket.send(msg);
    }

    //处理走棋消息
    this.handlePlayMsg=function(msg){
        for(var i in msg.events){
            e=msg.events[i];
            if(e.act=="jvmian"){
                this.jvMian[e.row][e.col]= e.qizi;
            }
        }
    }

    //从源点到目标点的移动判断
    this.moveJudge = function (srcRow, srcCol, targetRow, targetCol) {
        var qiziName=this.jvMian[srcRow][srcCol];
        if(qiziName==""){
            return false;
        }
        if (JunQi.moveJudge(this.jvMian, qiziName, srcRow, srcCol, targetRow, targetCol)) {//可以移动到目标点
            //如果目标点为空位
            if (this.jvMian[targetRow][targetCol] == "") {
                return true
            } else {
                var targetName = this.jvMian[targetRow][targetCol];
                var targetType = targetName.substr(targetName.length - 1, 1);
                if (this.playerType == targetType) { //目标点为已方棋子
                    return false;
                } else {//目标点为对方棋子
                    if (JunQi.atStation(targetRow, targetCol)) {//对方棋子在行营中
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        } else {//不能移到目标点
            return false;
        }
        return true;
    }

    //局面估值函数,计算已方盘面上所剩棋子子力之和,加上吃掉的对方棋子的子力
    this.jvMianGuZhi=function(jvMian){
        var row,col,sum= 0;
        for(row=0;row<13;row++) {
            for (col = 0; col < 5; col++) {
                var qiziName = jvMian[row][col];
                if (qiziName != "") {
                    var qiziType = qiziName.substr(qiziName.length - 1, 1);
                    if(qiziType==this.playerType){
                        var powerName=qiziName.split("_")[0];
                        sum+=JunQi.qiziPower[powerName];
                    }
                }
            }
        }
        return sum;
    }
}

//堆栈
Stack=function(){
    this.ele=[];
    this.top=0;

    this.push=function(e){
        this.ele[this.top]=e;
        this.top++;
    };
    this.pop=function(){
        if(this.top>0){
            this.top--;
            return this.ele[this.top];
        }
    };
    this.empty=function(){
        if(this.top<=0)
            return true;
        else
            return false;
    }
}

var JunQi={};
//从源点到目标点的移动判断
JunQi.moveJudge=function(jvMian,qiziName,srcRow,srcCol,targetRow,targetCol){

    //不能进入界山
    if(targetRow==6 &&(targetCol==1||targetCol==3))
        return false;
    var powerName=qiziName.split("_")[0];
    //地雷不能移动
    if(powerName=="dilei")
        return false;
    //军棋不能移动
    if(powerName=="junqi")
        return false;
    //横走一格
    if(srcRow==targetRow && Math.abs(srcCol-targetCol)==1)
        return true;
    //竖走一格
    if(srcCol==targetCol && Math.abs(srcRow-targetRow)==1)
        return true;
    //斜走一格
    var key=srcRow+"_"+srcCol+"_"+targetRow+"_"+targetCol;
    if(JunQi.conn[key]==1)
        return true;
    //铁路横线上
    if(srcRow==targetRow && JunQi.atRailWay(srcRow,srcCol)&&JunQi.atRailWay(targetRow,targetCol) ){

        //判断路线中间是否有棋子,是否有不在铁路上的点
        var s,t;
        if (srcCol < targetCol){
            s=srcCol;
            t=targetCol;
        }else{
            s=targetCol;
            t=srcCol;
        }
        for(var i=s+1;i<t;i++){
            if(jvMian[srcRow][i]!="")
                return false;
            if(!JunQi.atRailWay(srcRow,i))
                return false;
        }
        return true;
    }
    //铁路竖线上
    if(srcCol==targetCol && JunQi.atRailWay(srcRow,srcCol)&&JunQi.atRailWay(targetRow,targetCol) ){

        //判断路线中间是否有棋子,是否有不在铁路上的点
        var s,t;
        if (srcRow < targetRow){
            s=srcRow;
            t=targetRow;
        }else{
            s=targetRow;
            t=srcRow;
        }
        for(var i=s+1;i<t;i++){
            if(jvMian[i][srcCol]!="")
                return false;
            if(!JunQi.atRailWay(i,srcCol))
                return false;
        }
        return true;
    }

    return false;
};


//当两方棋子相遇时，判断胜负
JunQi.powerJudge=function(srcName,targetName){
    var srcPower=srcName.split("_")[0];
    var targetPower=targetName.split("_")[0];
    var key=srcPower+"_"+targetPower;
    return JunQi.powerComp[key];
};

//判断落点是否在铁路上
JunQi.atRailWay=function(row,col){
    if(row==1||row==5||row==7||row==11)
        return true;
    if((col==0||col==4) && row>0 && row <12 )
        return true;
    if(col==2 && row>4 && row <8 )
        return true;
    return false;
}

//判断落点是否在行营上
JunQi.atStation=function(row,col){

    if((col==1||col==3) && (row==2||row==4||row==8||row==10) )
        return true;
    if(col==2  && (row == 3||row==9) )
        return true;
    return false;
}

//子力对比表，１：胜，-1：负，０：同归于尽，2,全局胜,５：特殊情况
JunQi.powerComp={
    "dilei_dilei":0,
    "junqi_dilei":5,
    "paizhang_dilei":0,
    "zhadan_dilei":0,
    "gongbing_dilei":1,
    "lianzhang_dilei":0,
    "tuanzhang_dilei":0,
    "yingzhang_dilei":0,
    "lvzhang_dilei":0,
    "siling_dilei":0,
    "junzhang_dilei":0,
    "shizhang_dilei":0,
    "dilei_junqi":5,
    "junqi_junqi":5,
    "paizhang_junqi":2,
    "zhadan_junqi":2,
    "gongbing_junqi":2,
    "lianzhang_junqi":2,
    "tuanzhang_junqi":2,
    "yingzhang_junqi":2,
    "lvzhang_junqi":2,
    "siling_junqi":2,
    "junzhang_junqi":2,
    "shizhang_junqi":2,
    "dilei_paizhang":0,
    "junqi_paizhang":5,
    "paizhang_paizhang":0,
    "zhadan_paizhang":0,
    "gongbing_paizhang":-1,
    "lianzhang_paizhang":1,
    "tuanzhang_paizhang":1,
    "yingzhang_paizhang":1,
    "lvzhang_paizhang":1,
    "siling_paizhang":1,
    "junzhang_paizhang":1,
    "shizhang_paizhang":1,
    "dilei_zhadan":0,
    "junqi_zhadan":5,
    "paizhang_zhadan":0,
    "zhadan_zhadan":0,
    "gongbing_zhadan":1,
    "lianzhang_zhadan":0,
    "tuanzhang_zhadan":0,
    "yingzhang_zhadan":0,
    "lvzhang_zhadan":0,
    "siling_zhadan":0,
    "junzhang_zhadan":0,
    "shizhang_zhadan":0,
    "dilei_gongbing":-1,
    "junqi_gongbing":5,
    "paizhang_gongbing":1,
    "zhadan_gongbing":-1,
    "gongbing_gongbing":0,
    "lianzhang_gongbing":1,
    "tuanzhang_gongbing":1,
    "yingzhang_gongbing":1,
    "lvzhang_gongbing":1,
    "siling_gongbing":1,
    "junzhang_gongbing":1,
    "shizhang_gongbing":1,
    "dilei_lianzhang":0,
    "junqi_lianzhang":5,
    "paizhang_lianzhang":-1,
    "zhadan_lianzhang":0,
    "gongbing_lianzhang":-1,
    "lianzhang_lianzhang":0,
    "tuanzhang_lianzhang":1,
    "yingzhang_lianzhang":1,
    "lvzhang_lianzhang":1,
    "siling_lianzhang":1,
    "junzhang_lianzhang":1,
    "shizhang_lianzhang":1,
    "dilei_tuanzhang":0,
    "junqi_tuanzhang":5,
    "paizhang_tuanzhang":-1,
    "zhadan_tuanzhang":0,
    "gongbing_tuanzhang":-1,
    "lianzhang_tuanzhang":-1,
    "tuanzhang_tuanzhang":0,
    "yingzhang_tuanzhang":-1,
    "lvzhang_tuanzhang":1,
    "siling_tuanzhang":1,
    "junzhang_tuanzhang":1,
    "shizhang_tuanzhang":1,
    "dilei_yingzhang":0,
    "junqi_yingzhang":5,
    "paizhang_yingzhang":-1,
    "zhadan_yingzhang":0,
    "gongbing_yingzhang":-1,
    "lianzhang_yingzhang":-1,
    "tuanzhang_yingzhang":1,
    "yingzhang_yingzhang":0,
    "lvzhang_yingzhang":1,
    "siling_yingzhang":1,
    "junzhang_yingzhang":1,
    "shizhang_yingzhang":1,
    "dilei_lvzhang":0,
    "junqi_lvzhang":5,
    "paizhang_lvzhang":-1,
    "zhadan_lvzhang":0,
    "gongbing_lvzhang":-1,
    "lianzhang_lvzhang":-1,
    "tuanzhang_lvzhang":-1,
    "yingzhang_lvzhang":-1,
    "lvzhang_lvzhang":0,
    "siling_lvzhang":1,
    "junzhang_lvzhang":1,
    "shizhang_lvzhang":1,
    "dilei_siling":0,
    "junqi_siling":5,
    "paizhang_siling":-1,
    "zhadan_siling":0,
    "gongbing_siling":-1,
    "lianzhang_siling":-1,
    "tuanzhang_siling":-1,
    "yingzhang_siling":-1,
    "lvzhang_siling":-1,
    "siling_siling":0,
    "junzhang_siling":-1,
    "shizhang_siling":-1,
    "dilei_junzhang":0,
    "junqi_junzhang":5,
    "paizhang_junzhang":-1,
    "zhadan_junzhang":0,
    "gongbing_junzhang":-1,
    "lianzhang_junzhang":-1,
    "tuanzhang_junzhang":-1,
    "yingzhang_junzhang":-1,
    "lvzhang_junzhang":-1,
    "siling_junzhang":1,
    "junzhang_junzhang":0,
    "shizhang_junzhang":-1,
    "dilei_shizhang":0,
    "junqi_shizhang":5,
    "paizhang_shizhang":-1,
    "zhadan_shizhang":0,
    "gongbing_shizhang":-1,
    "lianzhang_shizhang":-1,
    "tuanzhang_shizhang":-1,
    "yingzhang_shizhang":-1,
    "lvzhang_shizhang":-1,
    "siling_shizhang":1,
    "junzhang_shizhang":1,
    "shizhang_shizhang":0
};

//走斜线可达的源点与目标点数组
JunQi.conn={
    "1_0_2_1":1,
    "3_0_2_1":1,
    "3_0_4_1":1,
    "5_0_4_1":1,
    "2_1_1_2":1,
    "2_1_3_2":1,
    "4_1_3_2":1,
    "4_1_5_2":1,
    "1_2_2_3":1,
    "3_2_2_3":1,
    "3_2_4_3":1,
    "5_2_4_3":1,
    "2_3_1_4":1,
    "2_3_3_4":1,
    "4_3_3_4":1,
    "4_3_5_4":1,
    "7_0_8_1":1,
    "9_0_8_1":1,
    "9_0_10_1":1,
    "11_0_10_1":1,
    "8_1_7_2":1,
    "8_1_9_2":1,
    "10_1_9_2":1,
    "10_1_11_2":1,
    "7_2_8_3":1,
    "9_2_8_3":1,
    "9_2_10_3":1,
    "11_2_10_3":1,
    "8_3_7_4":1,
    "8_3_9_4":1,
    "10_3_9_4":1,
    "10_3_11_4":1,
    "2_1_1_0":1,
    "2_1_3_0":1,
    "4_1_3_0":1,
    "4_1_5_0":1,
    "1_2_2_1":1,
    "3_2_2_1":1,
    "3_2_4_1":1,
    "5_2_4_1":1,
    "2_3_1_2":1,
    "2_3_3_2":1,
    "4_3_3_2":1,
    "4_3_5_2":1,
    "1_4_2_3":1,
    "3_4_2_3":1,
    "3_4_4_3":1,
    "5_4_4_3":1,
    "8_1_7_0":1,
    "8_1_9_0":1,
    "10_1_9_0":1,
    "10_1_11_0":1,
    "7_2_8_1":1,
    "9_2_8_1":1,
    "9_2_10_1":1,
    "11_2_10_1":1,
    "8_3_7_2":1,
    "8_3_9_2":1,
    "10_3_9_2":1,
    "10_3_11_2":1,
    "7_4_8_3":1,
    "9_4_8_3":1,
    "9_4_10_3":1,
    "11_4_10_3":1
};

JunQi.qiziPower={
    "dilei":1,
    "zhadan":2,
    "gongbing":2,
    "paizhang":3,
    "lianzhang":4,
    "yingzhang":8,
    "tuanzhang":10,
    "lvzhang":12,
    "shizhang":20,
    "junzhang":25,
    "siling":30,
    "junqi":100
};

module.exports=robotFactory;
