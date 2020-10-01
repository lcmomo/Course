<template>
   
         <el-row class="container">
             <el-col class="toolbar" :span="24">
                 <el-col :span="3" class="deviceIcon">
                 <img :src="device.status=='Connected'?deviceIconUrl.normal:deviceIconUrl.abnormal" alt="" class="deviceImg">
                     <!-- <div class="deviceIco" :style="sy?statusSuccess:statusFailure">
                         <i class="iconfont icon-shebeizhuangtai icon-pos":style="sy?statusSuccess:statusFailure"></i>
                     </div> -->

                 </el-col>
                 <div  class="deviceTitle">
                     <!-- {{this.$route.params.device.name}} -->
                     {{this.device.name}}
                 </div>
                 <div class="lookInfo">
                    <i class="el-icon-info"></i>
                     <span style="color:#45acf8;font-size:14px;cursor:pointer" @click="toSmart">查看设备基础资讯
                      </span>
                </div>

                  <el-button type="primary" size="medium"  class="remoteButton" ><i class="iconfont icon-screenshotjt"style="margin-left:0px"></i>远程截图</el-button>
                     <el-button type="primary" size="medium"  class="remoteButton" ><i class="iconfont icon-yuanchengzhuomian"></i>远程桌面</el-button>
                       <!--  <el-dropdown split-button type="primary" @command="getPower" size="small" class="powerButton" >
                          电源管理
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item  v-for="(item,index,key) in powerStatusList" :key="item.en"style="width:115px;padding-left:10px;background-color:#eee" :command="item.en" >{{item.zh}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>       -->
                        <div >
                        <div class="powerButton" @click="handleClick">
                          <span>电源管理</span>
                          <input type="hidden" v-model="powerSelect">

                          <i class="iconfont  icon-down-trangle"></i>
                        </div>
                        <div class="powerItemList" v-show="powerItemShow">
                          <ul>
                            <li class="powerItemListItem" @click="selectList(item,index)" v-for="(item,index) in powerStatusList">{{ item.zh }}</li>
                          </ul>
                        </div>
                    </div>
                    <el-col :span="10" class="contentNav">
                      <template>
                      <el-tabs   @tab-click="changeTabs" style="height:40px;padding:0;" :value="activeName2">
                        <el-tab-pane v-for="(item,index) in tabList":label="item.label" :name="item.label" :key="item.name" v-model="tabTo" style="font-size:18px" class="tabnavItem">
                        <!--  <component :is="item.content" v-if="!item.hidden"></component>  -->
                        </el-tab-pane>
                      </el-tabs>   
                </template>
                
                    </el-col>
 
             </el-col>

             <el-col :span="24" class="content">
                 
                

                  <transition name="fade" mode="out-in">
                   
                    <router-view ></router-view>
                  </transition>
             </el-col>
             <el-col :span="24" >
                <el-dialog title="" :visible.sync="dialogVisible" width="10%" top="15%" :show-close="false" :modal-append-to-body="false">

  
                </el-dialog>
                <div v-if="dialogVisible" class="restartTip">设备重启中...</div>
             </el-col>
         </el-row>
    
</template>
<script>
    import api  from '../../api/index';
    import axios from 'axios'
    import util from '../../common/util.js'
    import ExpandsMgmt from './details/expandsMgmt'
    import SoftMgmt from './details/softMgmt'
    import SysInfo from './details/sysInfo'
    import TempMgmt from './details/tempMgmt'


    
  import { mapActions } from 'vuex'
  
     export default {
        name: "deviceDetail",
        components:{
          // ExpandsMgmt,
          // SoftMgmt,
          // SysInfo,
          // TempMgmt
        },
        data(){
            return {
              //设备状态
              sy:true,
              //tab激活页
              activeName2:'外设管理',

              //tab跳转的页面

              tabTo:'外设管理',
              //遮罩显示
              dialogVisible:false,
              //
              //activeKey:null,
             
               powerItemShow:false,//电源列表项是否显示
                powerSelect:'',//电源列表项选中



               
                //设备成功状态
                  statusSuccess:{
                    color:'#7FFF00',
                    backgroundColor:'#19d147', 

                  },
                  
                  //设备失败状态
                  statusFailure:{
                   color:'#f44d68',
                    backgroundColor:'#fea8bb',
                  
                  },

                  //电源状态列表
                  powerStatusList:[],
                  //设备
                  device:{
                    name:'',
                    status:'Connected'

                  },
                  //tab导航列表
                  tabList:[
                      {
                        label:'外设管理',
                        name:'expandMgmt',
                        content:ExpandsMgmt,
                        hidden:false,

                        
                     
                      },
                      {
                        label:'软体监控',
                        name:'softMgmt',
                        content:SoftMgmt,
                        hidden:true
                         
                      },
                      {
                        label:'运行资讯',
                        name:'sysInfo',
                        content:SysInfo,
                        hidden:true
                       
                      },
                      {
                        label:'温度管理',
                        name:'tempMgmt',
                        content:TempMgmt,
                        hiden:true
                      }

                  ],
                  //usb状态
                  USBStatus:[
                    {usbTotalNum:7},
                    {usbAbnormalNum:2},
                    {usbNormalNum:6},
                    {usbUnknowNum:1}

                  ],
                  //显示器状态
                  ScreenStatus:[
                    {screenTotalNum:2},
                    {screenAbnormalNum:1},
                    {screenNormalNum:1}
                  ],

                  //设备图标
                  deviceIconUrl:{
                    normal:'./static/img/设备状态_normal.png',
                    abnormal:'./static/img/设备状态.png'
                  }




            }
        },        //data
     
        methods:{

            handleClick(val){
            console.log("sta");
            console.log(val);
            this.powerItemShow=!this.powerItemShow;
         
             // this.doAction(val);
             // let para={pageNum:this.page,pageSize:this.sizeNum}
             // this.getDeviceList(para);
           // this.getPowerscope();
          },

          //选择了电源项之后
          selectList(item,index){
            // console.log(item)
            // console.log("it")
            // console.log(index+' index');
            this.powerItemShow=false;
           let restartto= sessionStorage.getItem('location')
           console.log(restartto);

           if(restartto!=null&&restartto!=''&&item.en=='restart'){
            this.getPower(item.en,JSON.parse(restartto));
          }else if(item.en=='reset'){
            this.getPower(item.en,'外设管理')
          }else{
            
          }

          },
         
            //获取电源状态范围
            getPowerscope(){
              // this.device=this.$route.params.device;
               let para={agentId:this.device.agentId};
              //let para={agentId:"00007427EAE40EF7"};
              
              api.getPowerscope(para).then(res=>{
                if(res.data!=null){
                this.powerStatusList=util.formatter(res.data);
                
                
              }else{
                console.log('error power detail');
              }
              

              });


            },

            //电源状态

           getPower(val,restartto){
              console.log("sta");
              console.log(val);
              if(val='reset'){
                this.dialogVisible=true;
                setTimeout(()=>{
                  this.dialogVisible=false;
                  this.$router.push({name:restartto,params:''})
                },5000);

              }

           
               // this.doAction(val);
               // let para={pageNum:this.page,pageSize:this.sizeNum}
               // this.getDeviceList(para);
             // this.getPowerscope();
            },

            //设置设备电源状态
            doAction(val){
               let para={agentId:this.device.agentId,action:val};
              // let para={agentId:"00007427EAE40EF7",action:val};
              api.doAction(para).then((res)=>{
                if(res.result=='success'){
                console.log('succ');
              }else{
                console.log('fail');
              }
             
              }).catch(err=>{
                console.log(err.status+err)
              });

            },

            //获取设备USB信息
            getUSBInfo(){
              let para={agentId:this.device.agentId,type:"USB"};
              console.log(para);
              api.geExpandsInfo(para).then((res)=>{
                console.log("usb");
                console.log(typeof res.data);
              })
            },

            //获取设备显示器信息
            getScreenInfo(){
              let para={agentId:this.device.agentId,type:"Screen"};
              api.getExpandsInfo(para).then((res)=>{
                console.log("screen");
               
              })

            },

            //切换Tab
            changeTabs(tab){

            if(this.tabTo){
              this.tabTo=tab.label;
              console.log(this.tabTo);
                this.$router.push({name:this.tabTo,params:{device:this.device }});
              }


            // this.tabList[tab.index].hidden=false;
            //         this.tabList.filter((x,ind)=>{
            //             if(ind!==tab.index)
            //                 x.visiable=true;
            //         });

            },
            

            showTabs(){
              if(this.tableTo!=''){

              this.$router.push({name:this.tabTo,params:{device:this.device }});
              console.log(this.$route.matched.path)
              //this.tabList[0].hidden=true;
            }
            },
            //跳转到smart
            toSmart(){
              this.changeBread({first:this.device.name,second:'基础资讯',path:'/devicemanage/devicedetails/baseinfo'});
              //发布导航改变时间
              this.$PubSub.publish("BreadChange",{msg:' 导航改变',changeBread:true})

              this.$router.push({name:'基础资讯'})
              console.log("bread");

            },

            ...mapActions(['changeBread'])
            






          },

         mounted(){
          console.log(this.$route);
         this.device=JSON.parse(sessionStorage.getItem('device'));
        

         // this.$PubSub.subscribe('MyRouterPath',(event,data)=>{
         //  //this.tabTo=data.fullPath;
         //  console.log(this.tabTo)
         //   this.changeTabs(this.tableTo);

         // })
            this.getPowerscope();
           
            // this.getUSBInfo();
            // this.getScreenInfo();
            this.$route.matched[1].name=this.device.name;
             //this.tableTo=this.$store.state.currentPathname;
             //this.tabTo='外设管理';
             //console.log(this.tableTo)
            //this.$store.state.deviceDetailPath=this.$route.matched[1];
           

            // console.log(this.$route.matched);
             
         let loc=sessionStorage.getItem('location')
         let location=loc?JSON.parse(loc):'';
         // console.log(typeof location);
         // console.log(loc);
    
         if(location){
                 this.tabTo=location;
                 //this.activeName2=location;
                 console.log(typeof this.tabTo);
                this.activeName2=location;
                 this.showTabs();
               }else{
                this.tabTo='外设管理'
                this.showTabs();
              }


        },
        update(){
          
            this.$route.matched[1].name=this.device.name;
          
        }, 
        beforeDestroy(){
          this.$route.matched[1].name=this.device.name;
          
        } 
        

    }
</script>


<style scoped lang="scss">
*{
  font-family:Microsoft YaHei;
}
.container{
    position: relative;
    padding:0 15px;
    top: 0px;
    left: 0px;
   width:100%;
    height:98.5%;
    background-color: #f7f8fc;
    .toolbar{
        margin: 8px 0px 0px 0px;
        height:120px;
        width:100%;
        border-top:1px solid #eee;
        border-bottom:1px solid #eee;
        position: relative;
       text-align:left;
        background-color:#fff;
        padding:0px 0px;

        .deviceIcon{
            
            height:61px;
            margin-top:9px;

            //background-color:red;
            text-align:center;
            .deviceImg{
              width:60px;
              height:60px;
              //background-color:green;
              margin:auto;
            }
           
            .deviceIco{
                width:60px;
                height:60px;
                border-radius:100%;
                background-color:green;
                padding:5px;
                text-align:center;
                vertical-align:middle;
                margin-left:60px;
                position:relative;
                .icon-pos{
                    font-size:32px;
                    position: absolute;
                    top:10px;
                    left:15px;

                }
            }
        }
        .deviceTitle{
            height:60px;
            margin-top:20px;
            font-size:24px;
            padding-left:5px;
            color:#4b5262;
            
            float:left;

        }

        .lookInfo{
          position:relative;
          height:45px;
          left:40px;
          top:10px;
          float:left;

          .el-icon-info{
            font-size:20px;
            margin-top:15px;
            color:#1296db;
            display:inline-block;
            width:25px;

          }
          a{
            position: relative;
            top:-2px;
            margin-right:5px;
            color:#1f9dd5;
            height:30px;
            line-height:30px;

          }

        }

        .icon-screenshotjt{
          position: relative;
          left:-10px;
          color:#fff;

        }
        .icon-yuanchengzhuomian{
          position: relative;
          left:-10px;
          color:#fff;
        }

        .remoteButton{
            float:right;
            line-height:10px;
            
            width:110px;
            font-size:14px;
            color:#fff;
            font-weight:bold;
            margin:70px 10px 10px 10px;

        }

        .powerButton{
            background-color:#409EFF;
            display:inline-block;
            width:110px;
            height:33px;
            border-radius:4px;
            margin-top:70px;
            margin-right:20px;
            line-height:30px;
            float:right;
            padding-left:14px;
            font-size:14px;
            color:#fff;
            font-weight:bold;
            &:hover{
             background-color: #3babf9;
            }
            position: relative;
            span{
              color:#fff;
              &:after{
                content:'';
                position: absolute;
                border:0.5px solid #fff;
                width:1px;
                height:20px;
                right:30px;
                top:5px;
                opacity: 0.4;
              }
            }
            .icon-down-trangle{
               color:#fff;
               display:inline-block;
               width:20px;
               text-align:right;
               position: absolute;
               right:10px;

            }
      
        }

        .powerItemList{
          display:inline-block;
          width:110px;
          position: absolute;
          background-color:#f0f5f8;
          top:103px;
          right:280px;
          z-index:1;
          ul{
          -webkit-padding-start: 0px;
          text-align:center;
        }


        }
        .powerItemListItem{
          list-style-type: none;
          color:#4b5262;
          cursor:pointer;

         
          &:hover{
            background-color:#eee;
          }
        }

      .is-active {
          color:red !important;
        }
         .contentNav{
              height:50px;
             // background-color:red;
              position:absolute;
             padding-top:10px;
             padding-bottom:0px;
              bottom:-2px;
              left:30px;  
              .tabnavItem{
                border:none;

              }
          }


      
    }
    .content{
              
              border:1px solid #eee;
              position:relative;
              padding:10px 10px;
              background-color:#fff;
              width:100%;
              height:81.5%;

          }

   
    .restartTip{
      width:500px;
      height:35px;
     
      font-weight:bold;
      font-size:16px;
      color:#fff;
      text-align:center;
      z-index:2100;
      position: absolute;
      line-height:35px;
      top:50%;
      left:17%;
      letter-spacing:2px;
    }

}
  
  .ActiveClass{
            height:50px;
            color:red;
        }
</style>