<template>
    
       <el-row class="sysInfoContainer">
           <el-col :span="16" class="HDDBox">
                   <div class="HDDInfo">
                       <div class="panel "style="background-color:#fcfcfc;height:99.9%">
                                <div class="panel-heading" style="border-bottom:1px solid #ddd;position:relative;height:32px;padding:5px 10px;background-color:#f3f7f8">
                                     <span class="iconfont icon-yingpan"></span>
                                     <span class="Title">硬盘状况</span>
                                     <span class="Stat" :class="HDD.HddStat=='良好'?'backNormalStyle':'backAbnormalStyle'" v-show="HDD.hasHDD">{{HDD.HDDStat}}</span>
                                </div>
                                <div class="panel-body" style="font-size:12px;height:91%;padding:0">
                                    <div class="HDDIconbox">
                                        <div class="HDDIco">
                                           <!--  <div class="HDDIc">
                                                <span >{{HDD.HDDUsedSize}}</span>GB
                                            </div> -->

                                            <!-- <div class="loading">
                                                <div class="left"></div>
                                                <div class="right"></div>
                                                <div class="progress">
                                                    <span >{{HDD.HDDUsedSize}}</span>GB
                                                </div>
                                            </div> -->
                                            <div class="Progress">
                                                
                                            

                                            <div class="circle">
                                                <div class="pie-right">
                                                    <div class="right"></div>
                                                </div>
                                                <div class="pie-left">
                                                    <div class="left"></div>
                                                </div>
                                                <div class="mask"><span>{{HDD.HDDUsedSize}}</span>GB</div>
                                            </div>
                                            </div>

                                            <div class="HDDSize">
                                                硬盘容量
                                                <span>{{HDD.HDDTotalSize}}</span>
                                                GB
                                            </div>
                                        </div>
                                        <div class="TempIco">
                                            <div class="TempIc">
                                                <img :src="deviceImgUrl.tempIcoUrl" alt="">
                                                <span>{{HDD.HDDTemp}}</span>℃
                                            </div>
                                             <div class="TempSize">
                                                硬盘温度<br/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="HDDINfoBox">
                                        <div class="timebox">
                                            <i class="el-icon-time"></i>
                                            <span> 通电时间累计：</span>
                                            <span>{{HDD.UsedTimeDay}}天{{HDD.UsedTimeHour}}小时</span>
                                        </div>
                                        <div class="timebox">
                                            <i class="iconfont icon-rili"></i>
                                            <span> 预计剩余寿命：</span>
                                            <span>>{{HDD.availableTimeDay}}</span>
                                        </div>
                                        <div class="SMART">
                                             <span style="color:#1296db;text-decoration:underline;cursor:pointer" @click="toSmart">S.M.A.R.T资讯
                                             </span>
                                         </div> 
                                    </div>      
                                </div>                                 
                        </div>
                   </div>
                   
               </el-col>
           <el-col :span="8" class="HardInfoBox">
              
                   <div class="HardInfo">
                            <div class="panel "style="background-color:#fcfcfc;height:99.9%">
                                <div class="panel-heading" style="border-bottom:1px solid #ddd;position:relative;height:32px;padding:5px 10px;background-color:#f3f7f8">
                                     <span class="iconfont icon-icon-test"></span>
                                     <span class="Title">主板资讯</span>
                                     <span class="Stat" :class="HardWare.HardWareStat=='良好'?'backNormalStyle':'backAbnormalStyle'" v-show="HardWare.hasFanInfo">{{HardWare.HardWareStat}}</span>
                                </div>
                                <div class="panel-body" style="font-size:12px;height:90%;padding:0px">
                                    

                                    <div class="NoFanInfo" v-if="!HardWare.hasFanInfo">
                                        *该设备无法检测到CPU风扇和主板风扇
                                    </div>
                                    <div class="HardRound" v-if="HardWare.hasFanInfo">
                                        <div class="HardItem">
                                            <div class="Icon">
                                                <img :src="deviceImgUrl.FanIcon" alt="" class="FanIcon">
                                            </div>
                                            <div class="IconName" >
                                                CPU风扇
                                            </div>
                                            <div class="IconValue" >
                                                <span >{{HardWare.CPUFanRev}}</span>转/分
                                            </div>
                                        </div>
                                        <div class="HardItem">
                                            <div class="Icon">
                                                 <img :src="deviceImgUrl.FanIcon" alt="" class="FanIcon">
                                            </div>
                                            <div class="IconName" >
                                                主板风扇
                                            </div>
                                            <div class="IconValue" >
                                                <span >{{HardWare.MainBoardFanRev}}</span>转/分
                                            </div>
                                        </div>
                                    </div>

                                    <div class="HardRound" style="margin-top:10px" v-if="!HardWare.hasFanInfo" >
                                        <div class="HardItem">
                                            <div class="Icon">
                                                <img :src="deviceImgUrl.FanIcon" alt="" class="FanIcon">
                                            </div>
                                            <div class="IconName" style="color:#aaa">
                                                CPU风扇
                                            </div>
                                            <div class="IconValue" style="color:#aaa">
                                                <span style="color:#aaa">--</span>转/分
                                            </div>
                                        </div>
                                        <div class="HardItem">
                                            <div class="Icon">
                                                 <img :src="deviceImgUrl.FanIcon" alt="" class="FanIcon">
                                            </div>
                                            <div class="IconName" style="color:#aaa">
                                                主板风扇
                                            </div>
                                            <div class="IconValue"style="color:#aaa" >
                                                <span style="color:#aaa">--</span>转/分
                                            </div>
                                        </div>
                                    </div>
                                   
                                        
                                    </div>                           
                            </div>
                </div>     
           </el-col>
           <el-col :span="24" class="HDDBox" style="padding:0px 8px 5px 8px;height:50%">
               
              
               <div class="NetInfo">
                    <div class="panel"style="background-color:#fcfcfc;height:99.9%">
                                <div class="panel-heading" style="border-bottom:1px solid #ddd;position:relative;height:32px;padding:5px 10px;background-color:#f3f7f8">
                                     <span class="iconfont icon-wangluo1"></span>
                                     <span class="Title">网络状况</span>
                                     <span class="Stat" :class="device.status=='Connected'?'backNormalStyle':'backAbnormalStyle'" v-show="HardWare.hasHardWare">{{device.status=='Connected'?NET.normal:NET.abnormal}}</span>
                                </div>
                                <div class="panel-body" style="font-size:12px;height:180px;padding-left:20px" >
                                    <div class="netTitle">
                                网络状态: 
                                        <span :class="device.status=='Connected'?'fontNomal':'fontAbnomal'">{{device.status=="Connected"?NET.normal:NET.abnormal}}
                                        </span>
                                        <span>
                                            <i class="iconfont icon-xinhaowu" :class="device.status=='Connected'?'fontNomal':'fontAbnomal'">
                                            </i>
                                        </span>
                                    </div>
                                    <div class="netValue">
                                        <span>S/82&nbsp;</span>kbps&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>R/43&nbsp;</span>kbps
                                    </div>
                                    <div class="IPPosition">
                                       IP位置： <span>{{device.agentIp}}</span>
                                    </div>
                                   
                                        
                                    </div>                           
                            </div>
               </div>
                  
              
           </el-col>
       </el-row>
    
</template>

<script>

    import api  from '../../../api/index';
    import echarts from 'echarts';
    import axios from 'axios'
    import util from '../../../common/util.js'
     import { mapActions } from 'vuex'
    export default{
        name:"sysInfo",
        data(){
            return {
                
                device:{
                    name:'',
                    status:''
                },

                deviceImgUrl:{
                    tempIcoUrl:"./static/img/设备状态2.png",
                     FanIcon:'./static/img/icon3_normal.png',

                },
                timeid:0,//定时器

                //主板资讯
                HardWare:{
                    HardWareStat:"良好",//硬件状态
                    hasHardWare:true,//是否显示状态图标
                   
                    CPUFanRev:0,//cpu风扇转速
                    MainBoardFanRev:0,//主板风扇转速
                    hasFanInfo:false,
                               
                },

                //硬盘状况 
                HDD:{
                    HDDStat:'警告',
                    hasHDD:true,
                    HDDTotalSize:0,//硬盘总容量
                    HDDUsedSize:0,//已用硬盘容量
                    HDDTemp:0,//硬盘温度
                    UsedTimeDay:0,//通电时间
                    UsedTimeHour:0,
                    availableTimeDay:0,

                },

                NET:{
                    normal:'正常',
                    abnormal:'未连接',
                    SSpeed:0,
                    RSpeed:0,//网速

                },

                //当前路由路径，实现刷新后保持
                currentPath:null,




                

            }
        },

        methods:{

            getSysInfo(){
                let para={agentId:this.device.agentId,type:'HDD'};
                let para2={agentId:this.device.agentId,type:'Hardware'}
                axios.all([api.getExpandsInfo(para),api.getExpandsInfo(para2)]).then(axios.spread((hddres,hardres)=>{
                    // console.log(hddres);
                    // console.log('23');
                    // console.log(hardres);
                }))
            },

            //跳转到smart
            toSmart(){
              this.changeBread({first:this.device.name,second:'S.M.A.R.T资讯',path:'/devicemanage/devicedetails/smart'});
              //发布导航改变时间
              this.$PubSub.publish("BreadChange",{msg:' 导航改变',changeBread:true})

              this.$router.push({name:'S.M.A.R.T资讯'})
              //console.log("bread");

            },

            ...mapActions(["changeBread"]),

           //保存当前路由路径
           setLocation(){
            sessionStorage.setItem('location',JSON.stringify(this.$route.name))

           }
            


        },

         



        mounted(){
            //console.log(this.$route.name);
            this.device=JSON.parse(sessionStorage.getItem('device'));
            this.device.agentId= "000040167E677023";
            this.getSysInfo();
            if(!this.timeid){
                this.timeid=window.setInterval(this.getSysInfo,10*1000);
            }
            
              this.setLocation();
              util.changeProcess(23);     
            
        },

         beforeDestroy(){
          window.clearInterval(this.timeid);

          this.$PubSub.publish("MyRouterPath",{msg:' 我的路径',fullPath:this.$route.name})



        }
       
    }
</script>
<style lang="scss" scoped>
*{
    color:#4b5262;
    font-size:14px;
    font-family:Microsoft YaHei;
}

    .sysInfoContainer{
        position: relative;
        //background-color:#eee;
        height:100%;


        .icon-yingpan{
                font-size:18px;
                width:18px;
                line-height:18px;
                color:#c2c8d4;
            }


        .icon-icon-test{
            font-size:18px;
                width:18px;
                line-height:18px;
                color:#c2c8d4;
            }
        .Title{
            display:inline-block;
            width:70px;
            text-align:center;
            font-size:13px;
            font-weight:bold;

            }

            .Stat{
                display:inline-block;
                width:60px;
                font-size:14px;
                font-weight:bold;
                text-align:center;
                height:20px;
                color:white;
            }
        .HardInfoBox{
            height:52.32%;
            //background-color:#eee;
            padding:10px 8px 4px 0px;

            position: relative;

            .HardInfo{
                border:1px solid #ddd;
                height:99%;


                

                
                .HardRound{
                    width:100%;
                    //background-color:#eee;
                    height:60%;
                    float:left;
                    position: relative;
                    margin-top:30px;

                    
                     .HardItem{
                            width:100%;
                            height:50%;

                           //background-color:red;
                            position: relative;
                            padding:8px 22px;
                            &:hover{
                                background-color:white;
                            }

                            

                            .Icon{  
                                float:left;
                                
                               
                                width:16.02%;
                                height:40px;
                                
                                //background-color:green;
                                text-align:center;
                                
                                //margin-top:5px;
                                .FanIcon{
                                    width:80%;
                                    height:40px;
                                }



                            }
                            .IconName{
                                float:left;
                                width:25.63%;
                                height:50px;
                                //background-color:blue;
                                text-align:center;
                                line-height:40px;
                                font-size:16px;
                                color:#4b5262;
                                font-weight:bolder;

                            }
                            .IconValue{
                                width:44.86%;
                                float:left;
                                //background-color:yellow;
                                height:40px;
                                text-align:center;
                                line-height:38px;
                                font-size:14px;
                                color:#19d147;
                                font-weight:bolder;
                                span{
                                    font-size:24px;
                                    margin-right:3px;
                                    display:inline-block;
                                    color:#19d147;

                                }

                            }
                    }
                }

                .NoFanInfo{
                    color:#fcbe67!important;
                    padding:8px 15px;
                    height:20px;
                }
            }
        }

        .HDDBox{
            //background-color:red;
            padding:10px 0px 0px 8px;
            position: relative;
             height:52.32%;

            .HDDInfo{
                border:1px solid #ddd;
                
                margin-right:5px;
                position: relative;
                height:98%;
                

                .HDDIconbox{
                    width:55%;
                   
                    height:100%;
                    float:left;
                    padding:15px;
                    &:after{
                        content:'';
                        display:block;
                        width:1px;
                        height:65%;
                        background-color:#ccc;
                        position: absolute;
                        top:25%;
                        left:52%;

                    }

                    .HDDIco{
                        width:50%;
                        height:100%;
                        //background-color:red;
                        float:left;
                        position: relative;
                        
                        .Progress{
                            position: relative;
                            width:90px;
                            height:100px;
                            //background-color:green;
                            left:45px;
                            padding-top:20px;
                            padding-left:5px;



                        .circle {
                                position: absolute;
                                height: 80px;
                                width: 80px;
                                border-radius: 50%;
                                background: #13d043;


                                .pie-right {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    height:80px;
                                    width: 80px;
                                    border-radius: 50%;

                                    .right { 
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        height: 80px;
                                        width: 80px;
                                        border-radius: 50%;
                                        background: #f3f7f8;
                                        clip: rect(0, auto, auto, 40px);
                                        
                                        }
                                }

                                .pie-left {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    height:80px;
                                    width: 80px;
                                    border-radius: 50%;
                                    .left { 
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        height: 80px;
                                        width: 80px;
                                        border-radius: 50%;
                                        background: #f3f7f8;
                                        clip: rect(0, 40px, auto, 0);
                                    }
                                }

                                .mask {
                                    position: absolute;
                                    top:5px;
                                    left: 5px;
                                    height: 70px;
                                    width: 70px;
                                    background: #fff;
                                    border-radius: 50%;
                                    text-align: center;
                                    line-height:70px;
                                    color:green;

                                    span{
                                        font-size:22px;
                                        font-weight:bolder;
                                        color:green;
                                        }
                                    }   

                            }


                            .HDDIc{
                            width:80px;
                            height:80px;
                            margin:auto;
                            //background-color:white;
                            border-radius:100%;
                            border:5px solid #8de4c6;
                            text-align:center;
                            line-height:70px;
                            color:green;
                            margin-top:20px;
                            &:after{
                                content:'';
                                width:80px;
                                height:20px;
                                background-color:#fcfcfc;
                                position: absolute;
                                bottom:55px;
                                left:55px;
                            }
                            span{
                              
                                font-size:20px;
                                font-weight:bolder;
                            }
                        }
                        }
                                                                                                         
                        
                        .HDDSize{
                            font-size:14px;
                            text-align:center;
                            font-weight:bold;
                            margin-top:10px;
                        }

                    }
                    .TempIco{
                        width:45%;
                        height:100%;
                        //background-color:blue;
                        float:left;

                        .TempIc{
                            width:100px;
                            height:80px;
                            margin:auto;
                            //background-color:blue;
                            img{
                                width:60px;
                                height:80px;
                                //background-color:red;
                                float:left;
                            }
                            margin-top:20px;
                            color:green;
                            span{
                              //background-color:red;
                                font-size:20px;
                                font-weight:bolder;
                                line-height:80px;

                            }
                        }

                        .TempSize{
                            font-size:14px;
                            text-align:center;
                            font-weight:bold;
                            margin-top:10px;
                        }


                    }


                }
                .HDDINfoBox{
                    width:40%;
                    float:left;
                    height:100%;
                   
                    
                    padding:30px 15px;

                    .timebox{
                        width:100%;
                        height:35px;
                       color:#4b5262;
                        margin:0px 0px 5px 0px;
                        line-height:35px;
                        position:relative;
                       .icon-rili, .el-icon-time{
                            font-size:20px;
                            margin:0px 10px 0 0;
                            position: relative;
                            top:3px;
                            left:5px;
                            color:#8197aa;
                            
                           
                        }
                        span{
                            
                            font-weight:bold;
                            font-size:14px;
                            line-height:20px;
                            display:inline-block;
                            height:20px;
                            color:#4b5262;

   
                        }
                    }

                    .SMART{
                        padding:10px;
                        font-weight:bold;
                        margin-top:20px;
                        a{
                            text-decoration: underline;
                            color:#1c9dd6;
                        }
                    }
                }
               
           

            }

            .NetInfo{
               border:1px solid #ddd;
                height:94.5%;
                font-weight:bolder;
                font-size:16px;
                .icon-wangluo1{
                    color:#c2c8d4;
                }
               



                .netTitle{
                    width:220px;
                    height:60px;
                    float:left;
                    line-height:60px;
                    font-size:14px;
                    font-weight:bolder;
                    color:#4b5262;
                    span{
                       
                        
                        display:inline-block;
                        width:60px;
                        text-align:center;
                        font-size:18px;
                    }

                }

                .netValue{
                    font-size:14px;
                    width:200px;
                    text-align:center;
                  
                    float:left;
                    height:60px;
                    color:#4b5262;
                    line-height:60px;
                    
                    span{
                        color:#4b5262;

                    }

                }
                .IPPosition{
                    width:250px;
                   
                    
                    height:60px;
                    color:#4b5262;
                    font-size:14px;
                    margin-top:20px;
                     line-height:60px;

                    span{

                    }
                }

            }

        }

       
    }


    .backAbnormalStyle{
                    
        background-color:#f4ad38;

     } 
    .backNormalStyle{
                    
        background-color:#19d147;

        } 

    .fontAbnomal{
        color:#f4ad38;
    }
    .fontNomal{
        color:#19d147;
    }
</style>