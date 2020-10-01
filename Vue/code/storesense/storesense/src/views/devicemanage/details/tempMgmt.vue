<template>
   
       <el-row class="TempMgmtContainer">
           <el-col :span="24" class="tempTitle">
               <i class="iconfont icon-wendu"></i>
              <span class="title">
                  温度监控
              </span>
              <span class="TempStat" :class="TempStat=='良好'?'Normal':'Abnormal'">{{TempStat}}</span>
           </el-col>
           <el-col :span="24" class="tempBody">
               <el-col :span="8"  class="navList">
                   <div :id="item.id"class="HardItem"@click="chooseItem(item,index)"v-for="(item,index) in navList" >
                        <div class="Icon">
                            <img :src="item.hasInfo?item.icon:item.iconunusual" alt=""  class="TempIcon"/> 
                        </div>
                         <div class="IconName" :style="{color:item.hasInfo?'':'#aaa'}">
                                               {{item.name}}
                        </div>
                        <div class="IconValue" v-if="item.hasInfo">
                            <span>{{item.value}}</span>℃
                        </div>
                         <div class="IconValue" v-if="!item.hasInfo">
                            <span style="color:#aaa">--</span>
                        </div>
                    </div>
               </el-col>
               <el-col :span="16" style="height:95.5%">
                   <div class="tempbox">
                       <div class="tempItem" v-for="(item,index) in navList" v-if="item.visiable">
                          
                           <div :id="item.name" style=" height:90%;margin:0 auto" v-if="hasTempInfo"></div>
                           <div v-if="!hasTempInfo">暂无{{item.name}}信息</div>
                       </div>
                   </div>
               </el-col>
           </el-col>
       </el-row>

</template>

<script>

    import api  from '../../../api/index';
    import echarts from 'echarts';
    import axios from 'axios'
    import util from '../../../common/util.js'

    export default{
        name:"tempMgmt",
        data(){
            return {
                TempStat:'良好',
                device:null,


                    TimeList:[],
                    cpuTempList:[20,10,56,78,89,56,67,45,58,67,100,95,87],
                    mainboardTempList:[20,67,56,78,56,56,67,89,58,67,134,95,23],
                    HDDTempList:[],
                    VideoCardTempList:[1,2,34,56,7,89,45,6,7,23,45],

                    //定时器
                    timeid:0,
                    //是否有温度信息
                    hasTempInfo:true,




                //导航数据
                navList:[
                    {
                        icon:'./static/img/icon2_normal.png',
                        iconwarn:'./static/img/icon2_unusual.png',
                        iconunusual:'./static/img/icon2_unusable.png',
                        name:'CPU温度',
                        value:22,
                        visiable:true,
                        hasInfo:true,
                        id:'cpu'
                    },
                    {
                        icon:'./static/img/icon_normal.png',
                        iconwarn:'./static/img/icon_unusual.png',
                        iconunusual:'./static/img/icon_unusable.png',
                        name:'主板温度',
                        value:36,
                        visiable:false,
                        hasInfo:false,
                         id:'mainboard'
                    },
                    {
                        icon:'./static/img/icon4_normal.png',
                        iconwarn:'./static/img/icon4_unusual.png',
                        iconunusual:'./static/img/icon4_unusable.png',
                        name:'硬盘温度',
                        value:36,
                        visiable:false,
                        hasInfo:true,
                        id:'hdd'
                    },
                    {
                        icon:'./static/img/icon5_normal.png',
                        iconwarn:'./static/img/icon5_unusual.png',
                        iconunusual:'./static/img/icon5_unusable.png',
                        name:'显卡温度',
                        value:31,
                        visiable:false,
                        hasInfo:true,
                        id:'xianka'
                    }

                ],

                //canvas画布
                Test:null,
                //echarts配置
                 option : {

                        color:'#36d55c',
                        dataZoom: {
                             show: false,
                             start : 10
                         },
                        
                        grid: {
                            x:45,
                            y:40,
                            x2:20,
                            y2: 20
                        },
                        xAxis : [
                            {
                                type : 'category',
                                 splitNumber:10,
                                data:[],
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                splitNumber:5,
                                axisLabel : {
                                        formatter: '{value} ℃'
                                    }

                            }
                        ],
                        series : [
                            {
                                // name: 'series1',
                                type: 'line',
                                showAllSymbol: false,
                                // symbolSize: function (value){
                                //     return Math.round(value[2]/10) + 2;
                                // },
                                data: []
                            }
                        ]
                    },


            }


        },
         methods:{
                chooseItem(value,index){
                    // console.log(value);
                    // console.log(index);
                    // if(index==0){
                    //     $('#cpu').css('background','#fff');
                    // }
                    // else{
                    //  $('#cpu').css('background','#f5f7fa');
                    //  }

                    this.navList[index].visiable=true;
                    $('#'+this.navList[index].id).css('background','#fff');
                    this.navList.filter((x,ind)=>{
                        if(ind!==index){
                            x.visiable=false;
                        $('#'+x.id).css('background','#f6f9fe');
                    }
                    });
                    setTimeout(()=>{
                        this.drawTempInfo(value.name,index);
                    },0);
                },
                //获取硬盘温度
                getHDDInfo(){
                    let params={
                     // agentId: "000040167E677023",
                    agentId:this.device.agentId,
                    type: "HDD",
                    beginTs: "2018-08-05 23:55:00",
                    endTs: "2018-08-06 0:55:00"
                    }
                    //params=util.getOneHourTime(params);
                       
                        api.getHistoryData(params).then(res=>{
                            // console.log(res.totalCount);
                            // console.log("wendu");
                            if(res.totalCount!=0){
                                
                                let listd=util.getHDDTempList(res.data);
                                console.log(res.data);
                                for(let i=0;i<res.data.length;i++){
                                    this.TimeList.push(listd[i].ts);
                                    this.HDDTempList.push(listd[i].hddTemp);

                                }
                                // console.log(this.TimeList);
                                // console.log(this.HDDTempList);
                                this.hasTempInfo=true;
                                 this.drawTempInfo("CPU温度",0);
                            }else{
                                console.log("ert");
                                //this.hasTempInfo=false;
                            }

                        })
                    

                },

                drawTempInfo(val,index){
                    //console.log(this.navList[index].visiable);
                    if(this.TimeList.length!==0&&this.navList[index].visiable==true){
                        this.hasTempInfo=true;

                    this.Test=echarts.init(document.getElementById(val));
                    this.option.xAxis[0].data=this.TimeList;
                   switch (index){

                    case 0:
                        {
                        this.option.series[0].data=this.cpuTempList;
                        break;
                        }
                    case 1:
                        {
                            this.option.series[0].data=this.mainboardTempList;
                            break;
                        }
                    case 2:
                        {
                            this.option.series[0].data=this.HDDTempList;
                            break;
                        }
                     case 3:
                        {
                            this.option.series[0].data=this.VideoCardTempList;
                            break;
                        }
                   }
                   var that=this;
                    this.Test.setOption(this.option);
                 window.addEventListener('resize',()=>{
                    that.Test.resize();

                 })

                    

                }else{
                    //this.hasTempInfo=false;

                }

                },
                clearData(){
                    this.TimeList=[];
                   // this.cpuTempList=[];
                    //this.mainboardTempList=[];
                    this.HDDTempList=[];
                    //this.VideoCardTempList=[];
                },

                refreshData(){
                    this.clearData();
                    this.getHDDInfo();
                },

                //保存当前路由路径
           setLocation(){
            sessionStorage.setItem('location',JSON.stringify(this.$route.name))
           }
            
                
            },



            


             mounted(){
                this.device=JSON.parse(sessionStorage.getItem('device'));
                this.device.agentId= "000040167E677023";
                 $('#cpu').css('background','#fff');

                this.getHDDInfo();
                if(this.timeid==0){
                    this.timeid=window.setInterval(this.refreshData,30*1000);
                }



                 this.setLocation();     


        },

        beforeDestroy(){
            window.clearInterval(this.timeid);
 
        }
 
    }
</script>

<style scoped lang="scss">
*{
    font-family:Microsoft YaHei;
}
.TempMgmtContainer{
    position: relative;
    border:1px solid #dcdcdc;
    height:100%;
    //padding:5px;
    .icon-wendu{
        display:inline-block;
        width:25px;
        font-size:18px;
        color:#ccc;
    }

    .tempTitle{
        width:100%;
        height:30px;
        background-color:#f3f7f8;
        border-bottom:1px solid #ccc;
        font-size:16px;
        font-weight:bolder;
        padding-left:10px;
        .title{
            margin-top:0px;
            display:inline-block;
            color:#4b5262;
        }

        .TempStat{
           
            width:50px;
            height:20px;
            display:inline-block;
            text-align:center;
            margin-left:10px;
            margin-top:5px;
            color:white;

        }
    }

    .tempBody{
        width:100%;
        height:98.39%;
        position: relative;
       // background-color:red;
       .navList{
            position: relative;
            background-color:#f6f9fe;
            width:25%;
            height:94.7%;

            .HardItem{
                        width:100%;
                        height:20%;
                        //background-color:red;
                        position: relative;
                        padding:5%;
                        &:hover{
                            background-color:white;
                            cursor:pointer;
                        }

                        .Icon{  
                            float:left;
                            width:18.21%;
                            height:40px;
                           
                            //background-color:green;
                            text-align:center;
                            

                        }
                        .TempIcon{
                            width:100%;
                            height:40px;
                        }
                        .IconName{
                            float:left;
                            width:45.52%;
                            height:50px;
                           // background-color:blue;
                            text-align:center;
                            line-height:50px;
                            font-size:16px;
                            color:#4b5262;
                            font-weight:bolder;

                        }
                        .IconValue{
                            width:30%;
                            float:left;
                            //background-color:yellow;
                            height:50px;
                            text-align:left;
                            line-height:50px;
                            font-size:16px;
                            color:#666;
                            font-weight:bolder;
                            span{
                                font-size:25px;
                                margin-right:3px;
                                display:inline-block;
                                color:green;

                            }

                        }
                    }
                }
            }
        .tempbox{
            position: relative;
            width:100%;
            height:92%;
            
            .tempItem{
                width:100%;
                background-color:#fff;
                height:100%;
                div{
                    width:100%;
                    height:100%;
                }
            }
        }  
}


.Normal{
    background-color:green;
}
.Abnormal{
    background-color:blue;
}
    
</style>