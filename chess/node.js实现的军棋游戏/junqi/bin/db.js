/**
 * 数据库访问对象
 *
 */

//数据库对象
var mydb={

    //从文件中加载数据
    load:function(docName){
        var fileName ="data/"+docName+".json";
        var fs=require('fs');
        return JSON.parse(fs.readFileSync(fileName));
    },

    //将数据保存到文件中
    save:function(docName,doc){
        var fileName ="data/"+docName+".json";
        var fs=require('fs');
        fs.writeFileSync(fileName,JSON.stringify(doc));
    },

    //更新半边局面,注意不是直接修改jvMian,要考虑到深浅拷贝的问题
    updateHalfJvMian:function(jvMian,changedJvMian,playerType){
        var row,col;
        if(playerType=="r"){
            for(row=6;row<=12;row++) {
                for (col = 0; col < 5; col++) {
                    changedJvMian[row][col]=jvMian[row][col];
                }
            }
        }else{
            for(row=0;row<=6;row++) {
                for (col = 0; col < 5; col++) {
                    changedJvMian[row][col]=jvMian[row][col];
                }
            }
        }
        return changedJvMian;
    }
};

//初始布局
mydb.init_bujv=[
    ["dilei_1_r","junqi_r","dilei_2_r","paizhang_1_r","paizhang_2_r"],
    ["zhadan_1_r","dilei_3_r","gongbing_1_r","gongbing_2_r","gongbing_3_r"],
    ["lianzhang_1_r","","tuanzhang_1_r","","paizhang_3_r"],
    ["yingzhang_1_r","yingzhang_2_r","","lianzhang_2_r","lianzhang_3_r"],
    ["lvzhang_1_r","","zhadan_2_r","","tuanzhang_2_r"],
    ["siling_r","junzhang_r","shizhang_1_r","shizhang_2_r","lvzhang_2_r"],
    ["","","","",""],
    ["siling_b","junzhang_b","shizhang_1_b","shizhang_2_b","lvzhang_2_b"],
    ["lvzhang_1_b","","zhadan_2_b","","tuanzhang_2_b"],
    ["yingzhang_1_b","yingzhang_2_b","","lianzhang_2_b","lianzhang_3_b"],
    ["lianzhang_1_b","","tuanzhang_1_b","","paizhang_3_b"],
    ["zhadan_1_b","dilei_3_b","gongbing_1_b","gongbing_2_b","gongbing_3_b"],
    ["dilei_1_b","junqi_b","dilei_2_b","paizhang_1_b","paizhang_2_b"]
];

module.exports = mydb;



