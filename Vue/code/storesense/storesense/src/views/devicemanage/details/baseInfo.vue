<template>
    <div>
        <el-row class="baseInfoContainer">
            <el-col :span="24" class="baseInfoBox">
                <div class="devicenamebox">
                    <span class="devicename">设备名称:</span><span class="devicenamevalue">{{device.name}}</span>
                </div>
                <div class="devicenamebox">
                   <span class="devicename"> AgentID:</span><span class="devicenamevalue" style="width:">{{device.agentId}}</span>
                </div>
                <div class="devicetypebox">
                    <span class="devicetype">&nbsp;&nbsp;设备型号: </span><span class="devicetypevalue">{{device.type}}</span>
                </div>
                <div class="devicetypebox">
                    <span class="devicetype">&nbsp;&nbsp;设备IP: </span><span class="devicetypevalue">{{device.agentIp}}</span>
                </div>
                <div class="devicetypebox" style="margin-bottom:0px;">
                    <span >&nbsp;&nbsp;&nbsp;&nbsp;备注:</span>
                </div>
                <input type="textarea" class="txtarea" rows=4>
            </el-col>
            <el-col :span="24" class="toolbar">
                <div class="tool">
                    <span>设备所在分组</span>
                    <el-select v-model="category"  
                        collapse-tags style="margin:0 10px;width:150px;" 
                        class="el-input" placeholder="" size="mini" 
                        @change="SelectCategory" 
                        filterable 
                        remote
                          >
                              <el-option v-for="item in firstCategory" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                    </el-select>
                </div>
                <div class="tool">

                    <span>套用排程</span>
                    <el-select v-model="category"  
                                collapse-tags style="margin:0 10px;width:150px;" 
                                class="el-input" placeholder="" size="mini" 
                                @change="SelectCategory" 
                                filterable 
                                remote
                                  >
                        <el-option v-for="item in firstCategory" :key="item.value" :label="item.label" :value="item.value">
                             </el-option>
                    </el-select>
                </div>  
            </el-col>

            <el-col :span="24" class="eventCondition">
                <div class="eventTitle" @click="show">
                    异常条件<span>{{15}}</span>个,共涉及<span>{{7}}</span>类异常
                    <div class="button" v-if="showDetail">
                         <i class="el-icon-arrow-down"></i><span >查看详情</span>
                    </div>
                    <div class="button" v-if="!showDetail">
                         <i class="el-icon-arrow-up"></i><span >收起详情</span>
                    </div>
                </div>
                 <hr class="hr">
                 <div class="deviceInfoBox">
                 <div class="deviceTitle"v-if="!showDetail">
                     设备资讯类
                 </div>
                 <div class="deviceTable" v-if="!showDetail">
                     <div class="tableItem" v-for="(item,index) in deviceInfoList">
                     <span class="tableItemName" :class="index==deviceInfoList.length-1?'bord':''">{{item.name}}</span>
                     <span class="tableItemval">{{item.value}}</span>

                      </div>
                 </div>
                 </div>
            </el-col>
            <el-col :span="24" class="eventCondition" style="margin-top:10px">
                <div class="eventTitle" @click="showinfo">
                    配置信息
                    <div class="button" v-if="showConfDetail" style="margin-right:0;">
                         <i class="el-icon-arrow-down"></i><span >查看详情</span>
                    </div>
                    <div class="button" v-if="!showConfDetail" style="margin-right:0px;">
                         <i class="el-icon-arrow-up"></i><span >收起详情</span>
                    </div>

                </div>
                 <hr class="hr">

                 <div class="deviceConfTable" v-show="!showConfDetail">
                     <div class="deviceConfItem" v-for="(item,index) in  deviceConfList">
                         <span class="deviceConName">{{item.name}}</span>
                         <span class="deviceConValue">{{item.value}}</span>

                         
                     </div>
                 </div>


            </el-col>
        </el-row>
    </div> 
</template>

<script>
    // import api  from '../../../api/index';
    // import echarts from 'echarts';
    // import axios from 'axios'
    // import util from '../../../common/util.js'
import { mapGetters } from 'vuex'
    export default{
        name:"baseinfo",
        data(){
            return {
                device:{
                    agentId:'',
                    agentIp:'',
                    name:'',
                    type:'sudhirhrdsjh'
                },
                showDetail:true,
                showConfDetail:true,

                //一级选择框显示数据
                firstCategory:[{
                    value: '选项1',
                    label: '黄金糕'
                  }, {
                    value: '选项2',
                    label: '双皮奶'
                  }, {
                    value: '选项3',
                    label: '蚵仔煎'
                  }, {
                    value: '选项4',
                    label: '龙须面'
                  }, {
                    value: '选项5',
                    label: '北京烤鸭'
                  }],

                  //所在分组
                  category:'',

                  //设备资讯列表
                  deviceInfoList:[
                      {
                        name:'主板类',
                        value:'CPU温度高，CPU风扇转速偏低,主板温度偏高,主板风扇转速偏低'
                      },
                      {
                        name:'电源类',
                        value:'电池电量偏低,电池温度偏高'
                      },
                      {
                        name:'外设类',
                        value:'USB连接数目异常,USB驱动加载异常,显示器连接数据异常'
                      },
                      {
                        name:'存储类',
                        value:'硬盘温度偏高'
                      },
                      {
                        name:'网络类',
                        value:'网络断线'
                      },
                      {
                        name:'系统运行类',
                        value:'CPU使用率偏高,内存使用率偏高'
                      },
                      {
                        name:'应用服务类',
                        value:'进程无响应,服务运行状态异常'
                      },

                  ],

                  //配置信息列表
                  deviceConfList:[
                      {
                        name:'操作系统',
                        value:'Windows 7旗舰版64位 SP1 (DirectX11)'
                      },
                      {
                        name:'处理器',
                        value:'英特尔 Core i7-7700 @ 3.60Hz 四核'
                      },
                      {
                        name:'主板',
                        value:'联想3107(英特尔Xcon E3-1200 v6/7th Gen Intel Core/DRAM Register...)'
                      },
                      {
                        name:'内存',
                        value:'8GB(海力士 DDR4 2400MHZ)'
                      },
                      {
                        name:"主硬盘",
                        value:"希捷ST1000DM003-1SB102(1TB/7200转/分)"
                      },
                      {
                        name:'显卡',
                        value:'Nvidia GeForce GT 730(2GB/宝龙达)'
                            
                      }

                  ]


            }
        },
        methods:{
             SelectCategory(val){ 
                console.log(val);

             },

             show(){
                this.showDetail=!this.showDetail;
             },
             showinfo(){
                this.showConfDetail=!this.showConfDetail;
             },
             ...mapGetters(['getBread']),
               //保存当前路由路径
           setLocation(){
            sessionStorage.setItem('location',JSON.stringify(this.$route.name))
            console.log(this.$route)
            console.log("syslog");
           }

        },
        mounted(){
            this.device=JSON.parse(sessionStorage.getItem('device'));
                 //console.log(this.device);
                
                  //this.$route.matched.splice(1,0,this.$store.state.deviceDetailPath);


                 // console.log(this.$route.matched);
                 // console.log("er")
                 // console.log(this.getBread());

           // this.setLocation();
            
     

        },

        beforeDestroy(){
          this.$PubSub.publish("BreadChange",{msg:' 导航改变',changeBread:false})
        }


        // beforeRouteEnter (to, from, next) {
        //     next(vm => {
        //       // 通过 `vm` 访问组件实例
        //       vm.$route.matched.splice(1,0,vm.$store.state.deviceDetailPath);
        //       console.log(vm.$route.matched+" before")
        //     })
        //   },

          //  afterRouteEnter (to, from, next) {
            
          //     vm.$route.matched.splice(1,1,vm.$store.state.deviceDetailPath);
          //     console.log(vm.$route.matched+" before")
          //  next();
          // }



      
  

    }
</script>

<style scoped lang="scss">
*{
  font-family:Microsoft YaHei;
}
.baseInfoContainer{
    margin:10px;
    border:1px solid #eee;
    width:100%;
    height:630px;
    //background-color:red;

    .baseInfoBox{
        height:180px;
        //background-color:green;
        padding:10px 10px 0 20px;

        .devicenamebox{
            width:50%;
            height:20px;
            //background-color:blue;
            float:left;
            line-height:20px;
            font-size:15px;
            color:#333;
            font-weight:bold;
            margin-bottom:20px;
            &:before{
                content:'* ';
                color:#f00;
                font-size:120%;
                margin-top:10px;
            }
            .devicename{
              width:70px;
              //background-color:green;
               text-align:right;
               

            }
            .devicenamevalue{
              text-align:left;
              line-height:20px;
              margin-left:30px;
              over-flow:visible;
            }
            span{
                color:#999;
                display:inline-block;
                width:350px;
               
                //background-color:red;
            }
        }

        .devicetypebox{
            width:50%;
            height:20px;
            //background-color:blue;
            float:left;
            line-height:20px;
            font-size:15px;
            color:#333;
            font-weight:bold;
            margin-bottom:20px;
           .devicetype{
              width:82px;
              //background-color:green;
               text-align:right;

            }
            .devicetypevalue{
               margin-left:30px;

            }
            span{
                color:#999;
                display:inline-block;

                width:350px;
                text-align:left;
              //  background-color:red;
            }
        }

        .txtarea{
            width:98%;
            background-color:#eee;
            border-radius:5px;
            height:60px;
            border:0;
        }
    }

    .toolbar{
        height:40px;
       // background-color:blue;
        padding:5px 20px 5px 20px;
        font-weight:bolder;
        .tool{
            position: relative;
            width:50%;
            float:left;

            span{
            display:inline-block;
            width:120px;
            text-align:left;
           // background-color:red;
        }
        }    
    }

    .eventCondition{
        width:100%;
        //height:230px;
        background-color:#fcfcfc;
        position: relative;

        .eventTitle{
            z-index:3;
            padding:10px 0 0 15px;
            font-weight:bolder;
            color:#333;
            position: relative;
            //background-color:red;
            width:350px;
            cursor:pointer;
            .button{
                width:100px;
                height:25px;
                text-align:center;
                float:left;
                position: absolute;
                right:10px;
                top:4px;
                line-height:25px;
                color:#fff;
                border-radius:7px;
                background-color:#456789;
                span{
                    display:inline-block;
                    width:70px;
                    text-align:center;
                }
                
            }
        }

        .hr{
            position: absolute;
            top:0px;
            left:240px;
            width:76%;
            z-index:0;
            height:1px;
            background-color:#ddd;
        }

        .deviceTitle{
            width:97%;
            height:20px;
            background-color:#b7c3cd;
            margin:10px auto 0 auto;
            padding-left:10px;
             font-weight:bolder;
             color:#fff;

        }
        .deviceTable{
            width:97%;
            height:150px;
            //background-color:blue;
            margin:0px auto 0 auto;
            overflow-y:auto;
           


            .tableItem{
                

                .tableItemName{
                    display:inline-block;
                    width:11.41%;
                    border:1px solid #ccc;
                    text-align:center;
                    border-top:0px;
                    background-color:#f2f2f2;
                    border-left:0px;
                    margin-right:-2px;
                    //padding-left:15px;

                    //height:30px;
                    line-height:30px;
                }

                .bord{
                     border-bottom:1px solid #ccc;
                }

                .tableItemval{
                    display:inline-block;
                    width:87.52%;
                    border:1px solid #ccc;
                    border-top:0px;
                    border-left:0px;
                    background-color:#fff;
                    margin-left:-2px;
                    height:30px;
                    line-height:30px;
                    padding-left:10px;
                }
            }

        }

        .deviceConfTable{
            position: relative;
            padding-left:15px;
            margin-top:10px;
            .deviceConfItem{

                float:left;
                width:50%;

                .deviceConName{
                     display:inline-block;
                        width:18.3%;
                        
                        margin:0;
                        height:25px;
                        
                        font-weight:bolder;
                }

                .deviceConValue{
                     display:inline-block;
                        width:400px;
                       overflow:dotted;
                        margin:0;
                        height:30px;
                        line-height:30px;
                        color:#666;
                        font-weight:normal;
                }
            }

        }
    }



} 
    
</style>