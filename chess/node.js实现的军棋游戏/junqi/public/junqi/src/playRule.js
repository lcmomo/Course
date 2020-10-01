/**
*走棋规则
 */

//从源点到目标点的移动判断
JunQi.moveJudge=function(srcRow,srcCol,targetRow,targetCol,srcQizi){

    //不能进入界山
    if(targetRow==6 &&(targetCol==1||targetCol==3))
        return false;
    var powerName=srcQizi.qiziName.split("_")[0];
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
            if(JunQi.jvMian[srcRow][i]!="")
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
            if(JunQi.jvMian[i][srcCol]!="")
                return false;
            if(!JunQi.atRailWay(i,srcCol))
                return false;
        }
        return true;
    }

    return false;
};

//处理棋子的移动
JunQi.handleMove=function(srcRow,srcCol,targetRow,targetCol,srcQizi){
    var msg={game:"playing",roomID:roomID,playerType:srcQizi.playerType,events:[]};
    var myTurnEnd=true;
    if(JunQi.moveJudge(srcRow,srcCol,targetRow,targetCol,srcQizi)){//可以移动到目标点
        //如果目标点为空位
        if(JunQi.jvMian[targetRow][targetCol]==""){
            msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
            msg.events[1]={act:"jvmian",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
            msg.events[2]={act:"jvmian",qizi:"",row:srcRow,col:srcCol};
        }else{
            var targetName=JunQi.jvMian[targetRow][targetCol];
            var targetType=targetName.substr(targetName.length-1,1);
            if(srcQizi.playerType==targetType){ //目标点为已方棋子

                msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:srcRow,col:srcCol};
                myTurnEnd=false;

            }else{//目标点为对方棋子

                if(JunQi.atStation(targetRow,targetCol)){//对方棋子在行营中
                    msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:srcRow,col:srcCol};
                    myTurnEnd=false;
                }else{
                    var result=JunQi.powerJudge(srcQizi.qiziName,targetName);
                    if(result==0){
                        msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
                        msg.events[1]={act:"hiding",qizi:srcQizi.qiziName};
                        msg.events[2]={act:"hiding",qizi:JunQi.myQiPan.qiziSet[targetName].qiziName};
                        msg.events[3]={act:"jvmian",qizi:"",row:targetRow,col:targetCol};
                        msg.events[4]={act:"jvmian",qizi:"",row:srcRow,col:srcCol};
                    }
                    if(result==1){
                        msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
                        msg.events[1]={act:"hiding",qizi:JunQi.myQiPan.qiziSet[targetName].qiziName};
                        msg.events[2]={act:"jvmian",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
                        msg.events[3]={act:"jvmian",qizi:"",row:srcRow,col:srcCol};
                    }
                    if(result==-1){
                        msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
                        msg.events[1]={act:"hiding",qizi:srcQizi.qiziName};
                        msg.events[2]={act:"jvmian",qizi:"",row:srcRow,col:srcCol};
                    }
                    if(result==2){
                        msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
                        msg.events[1]={act:"gameover",winner:playerType};
                    }
                }
            }
        }
    }else{//不能移到目标点

        msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:srcRow,col:srcCol};
        myTurnEnd=false;
    }
    //处理棋子动作
    JunQi.myQiPan.handlePlayMsg(msg);
    if(myTurnEnd){

        //向服务器发送棋子移动的消息
        JunQi.msg.send(msg);

        //轮到对方移动棋子
        if(JunQi.playerTurn=="r")
            JunQi.playerTurn="b";
        else
            JunQi.playerTurn="r";

        //发送局面更新消息
        JunQi.updateJvMianOnServer(false);
    }

}

//发送局面更新消息,可选择是更新整个局面还是半个局面
JunQi.updateJvMianOnServer=function(updateHalf){
    if(updateHalf)
        JunQi.msg.send({game:"updateHalfJvMian",roomID:roomID,playerType:playerType,playerTurn:JunQi.playerTurn,jvMian:JunQi.jvMian});
    else
        JunQi.msg.send({game:"updateJvMian",roomID:roomID,playerType:playerType,playerTurn:JunQi.playerTurn,jvMian:JunQi.jvMian});

}

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
