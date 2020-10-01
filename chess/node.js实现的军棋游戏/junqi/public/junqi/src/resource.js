var res = {
    qipan_pic : "res/qipan.png",
    qizi_pic : "res/qizi.png",
    toolbar_pic : "res/toolbar.png"
};

var g_resources = [
    //image
    res.qipan_pic,
    res.qizi_pic

    //plist

    //fnt

    //tmx

    //bgm

    //effect
];

var JunQi={};

//初始布局
JunQi.init_bujv=[
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

//当前局面
JunQi.jvMian=JunQi.init_bujv;




