/**
*布局规则
 */

//从源点到目标点的移动
JunQi.bujvJudge=function(srcRow,srcCol,targetRow,targetCol,srcQizi){

    //要处理黑方的视角转换
    sRow= JunQi.qipanRes.convertRow(srcRow,srcQizi.playerType);
    sCol= JunQi.qipanRes.convertCol(srcCol,srcQizi.playerType);
    tRow= JunQi.qipanRes.convertRow(targetRow,srcQizi.playerType);
    tCol= JunQi.qipanRes.convertCol(targetCol,srcQizi.playerType);

    //不能越界
    if(tRow > 5 )
        return false;
    else
        return true;
};


//处理棋子的布局
JunQi.handleBujv=function(srcRow,srcCol,targetRow,targetCol,srcQizi){
    var msg={game:"bujv",roomID:roomID,playerType:srcQizi.playerType,events:[]};
    var jvMianChanged =false;
    if(JunQi.bujvJudge(srcRow,srcCol,targetRow,targetCol,srcQizi)){//可以移动到目标点
        //如果目标点为空位
        if(JunQi.jvMian[targetRow][targetCol]==""){

            msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
            msg.events[1]={act:"jvmian",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
            msg.events[2]={act:"jvmian",qizi:"",row:srcRow,col:srcCol};
            jvMianChanged=true;

        }else{//交换两处的棋子
            var targetName=JunQi.jvMian[targetRow][targetCol];
            var targetType=targetName.substr(targetName.length-1,1);
            msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
            msg.events[1]={act:"moving",qizi:targetName,row:srcRow,col:srcCol};
            msg.events[2]={act:"jvmian",qizi:srcQizi.qiziName,row:targetRow,col:targetCol};
            msg.events[3]={act:"jvmian",qizi:targetName,row:srcRow,col:srcCol};
            jvMianChanged=true;
        }
    }else{//不能移到目标点
        msg.events[0]={act:"moving",qizi:srcQizi.qiziName,row:srcRow,col:srcCol};

    }
    //处理棋子动作
    JunQi.myQiPan.handlePlayMsg(msg);
    if(jvMianChanged){
        //发送半个局面的更新消息
        JunQi.updateJvMianOnServer(true);
    }
}

//布局检查
JunQi.bujvCheckAll=function(){
    var row,col,beginRow,endRow;
    if(playerType=="r"){
        beginRow=0;
        endRow=6;
    }else{
        beginRow=6;
        endRow=12;
    }
    for(row=beginRow;row<=endRow;row++) {
        for (col = 0; col < 5; col++) {
            var qiziName = JunQi.jvMian[row][col];
            if (qiziName != "") {
                //要处理黑方的视角转换
                var tRow = JunQi.qipanRes.convertRow(row, playerType);
                var tCol = JunQi.qipanRes.convertCol(col, playerType);
                var msg=JunQi.bujvCheckOne(tRow, tCol, qiziName);
                if ( msg!= "ok") {
                    alert("布局时"+msg+",请检查第"+(tRow+1)+"行,第"+(tCol+1)+"列");
                    return false;
                }
            }
        }
    }
    JunQi.ready[playerType]="yes";
    return true;
}

//布局检查
JunQi.bujvCheckOne=function(tRow,tCol,qiziName){
    //不能越界
    if(tRow > 5 )
        return "棋子不能越界";

    var powerName=qiziName.split("_")[0];
    //地雷只能在后两排
    if(powerName=="dilei"){
        if(tRow>1)
            return "地雷只能在后两排";
    }
    //军棋只能在大本营中
    if(powerName=="junqi"){
        if(tRow!=0){
            return "军棋只能在大本营中";
        }else{
            if(tCol!=1&&tCol!=3)
                return "军棋只能在大本营中";
        }
    }
    //不能在行营中
    if(JunQi.atStation(tRow,tCol)){
        return "棋子不能在行营中";
    }else{
        return "ok";
    }

};


