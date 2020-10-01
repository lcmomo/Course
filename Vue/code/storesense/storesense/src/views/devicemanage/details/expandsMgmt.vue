<template>
   
      <div class="expands">
            <el-row style="height:100%">
                <el-col :span="17" class="main-left">
                    <el-col :span="12" class="container-usb">
                      
                            <div class="panel "style="background-color:#fcfcfc;margin-bottom:0px;height:100%">
                                <div class="panel-heading" style="border-bottom:1px solid #ddd;position:relative;height:32px;padding:5px 10px;background-color:#f3f7f8" >
                                    <span class="iconfont icon-waishe" style="color:#bbb;font-size:16px"></span>
                                    <span class="USBTitle">USB状况</span>
                                    <span class="USBStat " :class="USB.USBStat=='异常'?'backAbnormalStyle':'backNormalStyle'" v-show="USB.hasUSB">{{USB.USBStat}}</span>
                                </div>
                                <div class="panel-body" style="font-size:12px;padding:5px;height:85%">
                                    <div class="hasUSB" v-if="USB.hasUSB">
                                    监控USB连接数:{{USBStatus[0].usbTotalNum }}个,&nbsp;<span style="color:red">异常{{USBStatus[1].usbAbnormalNum}}个</span>,&nbsp;<span style="color:green">正常{{USBStatus[2].usbNormalNum}}个</span>
                                    </div>
                                    <div class="hasNotUSB" v-if="!USB.hasUSB">
                                        监控USB连接数:无
                                    </div>


                                    <div class="ServerIcon">
                                       <img :src="USB.USBStat=='异常'?deviceIconUrl.deviceAbnormal:deviceIconUrl.deviceNormal" alt="" class="deviceIconClass">
                                    </div>
                                    <div class="afterServerIcon" v-show="USB.hasUSB"></div>
                                    <div class="lineForDevice":style="{visibility:USB.usbShowLine2,width:USB.lineWidth+'%'}">
                                    </div>

                                    <div class="usb-box" v-for="(item,index) in USB.USBMock" :style="{width:USB.USBBoxWidth+'%'}" v-show="USB.hasUSB">
                                            <div class="screenIc">
                                                <div class="lineToDevice lineAbnormalStyle" :class="item.mode=='1'?'lineNormalStyle':'lineAbnormalStyle'">
                                                </div>
                                                <img :src="item.Status=='1'?deviceIconUrl.USBNormal:deviceIconUrl.USBAbnormal"class="USBImgClass" @mouseenter="showUSBDetail(item,$event)" @mouseleave="hiddenUSBDetail"
                                               v-if="index!==USB.USBMock.length-1">
                                                <img :src="deviceIconUrl.Unknown"class="USBImgClass" @mouseenter="showUSBDetail(item,$event)" @mouseleave="hiddenUSBDetail"
                                               v-if="index==USB.USBMock.length-1">
                                               <el-badge v-if="index==USB.USBMock.length-1":value="3" class="item UnknownBadge"style="font-size:3px;">
 
                                                </el-badge>
                                               
                                               
                                            </div>       
                                        </div> 
                                        <div class="USBDetial" v-show="USB.USBDetialViliable" v-cloak>
                                            
                                                   <span>{{USB.USBKeys[0]}}</span>
                                                   <span>{{USB. USBDetial.Product}}</span><br>
                                                     <span>{{USB.USBKeys[1]}}</span>
                                                   <span>{{USB. USBDetial.Manufacture}}</span>                     
                                    </div>
                                 
                                    
                                    
                            </div>
                        </div>



                    </el-col>
                    <el-col :span="12" class="container-screen">
                    
                            <div class="panel "style="background-color:#FCFCFC;height:100%">
                                <div class="panel-heading" style="border-bottom:1px solid #ddd;position:relative;height:32px;padding-top:5px;padding-left:10px;background-color:#f3f7f8">
                                    <span class="iconfont icon-shebeizhuangtai" style="color:#ccc;font-size:16px"></span>
                                    <span class="USBTitle ScreenTitle" >显示器状况</span>
                                    <span class="USBStat " :class="ScreenStat=='正常'?'backNormalStyle':'backAbnormalStyle'" v-show="hasScreen">{{ScreenStat}}</span>
                                </div>
                                <div class="panel-body" style="font-size:12px; padding:5px;height:80%">
                                    <div class="hasScreen" v-if="hasScreen">
                                    监控显示器:{{ScreenStatus[0].screenTotalNum }}个,&nbsp;<span style="color:red">异常{{ScreenStatus[1].screenAbnormalNum}}个</span>,&nbsp;<span style="color:green">正常{{ScreenStatus[2].screenNormalNum}}个</span>
                                    </div>
                                    <div class="haveNotScreen" v-if="!hasScreen">
                                        监控显示器:无
                                    </div>

                                    <div class="ServerIcon">
                                        <img :src="ScreenStat=='正常'?deviceIconUrl.deviceNormal:deviceIconUrl.deviceAbnormal" class="deviceIconClass"alt="">

                                    </div>
                                     <div class="afterServerIcon" v-show="hasScreen"></div>
                                        <div class="lineForDevice":style="{visibility:Screenshowline2}">
                                        </div>
 
                                        <div class="screen-box" v-for="(item,index) in ScreenData" :style="{width:boxWidth+'%',visibility:screenIconVisiable}">
                                            <div class="screenIc">
                                                <div class="lineToDevice lineAbnormalStyle" :class="item.mode=='1'?'lineNormalStyle':'lineAbnormalStyle'">
                                                </div>
                                                <!-- <i class="iconfont icon-shebeizhuangtai screenNormalStyle" :class="item.mode=='1'?'iconNormalStyle':'iconAbnormalStyle'" @mouseenter="showScreenDetail(item)" @mouseleave="hiddenScreenDetail" v-cloak>
                                                </i> -->
                                                 <img class="ScreenImgClass" :src="item.mode=='1'?deviceIconUrl.ScreenNormal:deviceIconUrl
                                                 .ScreenAbmormal" @mouseenter="showScreenDetail(item)" @mouseleave="hiddenScreenDetail" v-cloak>
                                                </i>
                                            </div>       
                                        </div> 

                                    <div class="screenDetail" v-show="screenDetailVisable">
                                        分辨率:{{this.screenWidth}}*{{this.screenHeight}}
                                    </div>

                                        
                                </div>
                            </div>
                     


                    </el-col>
                    <el-col :span="24" class="container-printer">
          
                            <div class="panel "style="background-color:#FCFCFC;height:100%">
                                <div class="panel-heading" style="border-bottom:1px solid #ddd;position:relative;height:32px;padding:5px 10px;background-color:#f3f7f8">
                                    <span :class="Printer.hasPrinter?'iconfont icon-dayinjidayinxianxing':'iconfont icon-waijieshebei'"></span>
                                    <span class="PtinterTitle">{{Printer.hasPrinter?'打印机状况':'外接设备'}}</span>
                                    <span v-show="Printer.hasPrinter"class="USBStat" :class="Printer.PrinterStat=='异常'?'backAbnormalStyle':'backNormalStyle'">{{Printer.PrinterStat}}</span>
                                </div>
                                <div class="panel-body" style="font-size:12px;height:184px;padding:0px">
                                <div class="PrinterBody">
                                  <div class="body-left">
                                      <div class="PrinterBox">
                                        <div v-if="!Printer.hasPrinter"class='iconfont icon-waijieshebei'></div>
                                         <div class="hasPrinterDiv"v-if="Printer.hasPrinter">
                                           <img :src="deviceIconUrl.PrinterImg" alt="">
                                         </div>
                                        <div class="Title" v-if="Printer.hasPrinter">打印机里程数: <span>{{2156}}</span><br>切刀数: <span>{{120}}</span></div>
                                        <div class="Title" v-if="!Printer.hasPrinter">
                                          此设备暂无更多外接设备需监控
                                        </div>
                                     
                                      </div>         
                                  </div> 
                                  <div class="body-right">
                                     <div class="PrinterItemBox" v-if="Printer.hasPrinter">
                                       <div class="PrinterItem" v-for="(item,index) in Printer.PrinterItem" :class="(index==0||index==1||index==4||index==5)?'primaryStyle':''" v-show="item.status=='bad'||item.status=='warn'">
                                         <div class="itemIcon" :class="item.status=='bad'?'badBackStyle':'warnBackStyle'"></div>
                                         <span>{{item.name}}</span>
                                       </div>
                                     </div>
                                  </div>

                                </div>
                                    

                                </div>
                            </div>
              


                    </el-col>
                </el-col> 
                <el-col :span="7" class="main-right">
                   <div class="panel "style="background-color:#FCFCFC;margin-bottom:0px;height:100%">
                                <div class="panel-heading" style="border-bottom:1px solid #ddd;position:relative;height:32px;padding:5px 10px;background-color:#f3f7f8">
                                <i class="iconfont icon-svg"></i>
                                   
                                    <span class="InfoTitle " >动态信息</span>
                                    <!--  <el-button type="primary" class="LookMore" size="mini" @click="getOneDayInfo">查看更多</el-button> -->
                                    
                                </div>
                                <div class="panel-body" style="font-size:12px;padding:5px;height:409px;">
                                    <GeminiScrollbar class="containe" :forceGemini="false" v-if="hasDeviceInfo">
                                    
                                        <div class="info-box" v-for="(item,index) in USB.USBHistoryData">
                                            <div class="timestamp">
                                                {{item.ts}}
                                            </div>
                                            
                                            <span class="itemIcon">
                                                
                                            </span>
                                            <div class="info-detial">
                                                检测到USB设备.产品名称{{
                                                item.product
                                                }},厂家{{item.manufacture}}
                                            </div>
                                        
                                        </div>
                                         <div class="line"></div>

                                    </GeminiScrollbar>
                                    <div  v-if="!hasDeviceInfo">
                                        暂无外设运行信息
                                    </div>

                                   
        

                                </div>
                            </div>

                </el-col>        
            </el-row>
              
      </div>
    
</template>

<script>
 import api  from '../../../api/index';
    import axios from 'axios'
    import util from '../../../common/util.js'
    export default{
        name:"expandMgmt",
        data(){
            return {

                //显示器模块
                
                ScreenStat:'正常',
                // //显示器状态图片
                // ScreenImgUrlNor:'./static/img/device_display_normal.png',
                // //显示器图片不正常
                // ScreenImgUrlAbn:'./static/img/device_display_unusual.png',
                
                //第一条线是否可见
                // Screenshowline1:'visibility',
                //第二条线是否可见
                Screenshowline2:'visibility',
                //显示器图标是否可见
                screenIconVisiable:'hidden',
                //有无显示器
                hasScreen:true,
                //显示器盒子宽度
                boxWidth:362,
                device:{agentId:'',name:''},//设备对象
                deviceIcon:'./static/img/设备状态_normal.png',

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

                  //显示器信息

                  ScreenData:[],

                  //显示器信息模拟数据
                  ScreenDataMoke:[
                    {devicename:'DESPLAY1',Height:'1080',width:'1920',mode:'1'},
                    {devicename:'DESPLAY2',Height:'768',width:'1366',mode:'1'},
                  ],
                  //显示器宽高
                  screenWidth:0,
                  screenHeight:0,
                  screenDetailVisable:false,
                  //显示器历史信息
                  ScreenHistoryData:[],



                  collapsed:false,




                  //USB模块
                  USB:{
                      USBStat:'异常',
                      hasUSB:true,
                      num:2,
                       USBBoxWidth:0,
                      
                       lineWidth:0,
                       usbShowLine2:'visibility',
                       isUnknownDevice:true,
                       USBDetialViliable:false,
                       USBDeviceIcon:'./static/img/设备状态.png',
                       
                       USBMock:[
                           {
                               'Product':'USB Optional Mouse',
                               'Manufacture':'Unknown',
                               'Status':"1",  
                            },

                            {
                               'Product':'USB Optional Mouse',
                               'Manufacture':'HDD',
                               'Status':"1",
                               
                            },
                            {
                               'Product':'USB Optional Mouse',
                               'Manufacture':'mDD',
                               'Status':"1",
                            },
                            {
                               'Product':'USB Optional Mouse',
                               'Manufacture':'mDD',
                               'Status':"1",
                              
                            },
                            {
                               'Product':'USB Optional Mouse',
                               'Manufacture':'xDD',
                               'Status':"2",
                                
                            },
                            {
                               'Product':'USB Optional Mouse',
                               'Manufacture':'yDD',
                               'Status':"1",
                              
                            },
                            {
                               'Product':'USB Optional Mouse',
                               'Manufacture':'zDD',
                               'Status':"2",
                             
                            },
                            // {
                            //    'Product':'USB Optional Mouse',
                            //    'Manufacture':'zDD',
                            //    'Status':"2",
                             
                            // },
                            
                            


                       ],

                       USBDetial:{
                            'Product':'',
                            'Manufacture':'',
                           },
                       USBKeys:[],

                       USBHistoryData:[],


                    },


                  //打印机模块
                  Printer:{
                    PrinterStat:'异常',
                    hasPrinter:true,

                    PrinterItem:[
                      {
                        name:'切刀异常',
                        status:'bad',
                      },
                      {
                        name:'缺纸',
                        status:'bad',
                      },
                      {
                        name:'异常开盖',
                        status:'bad',
                      },
                      {
                        name:'打印机错误',
                        status:'warn',
                      },
                      {
                        name:'flash异常',
                        status:'bad',
                      },
                      {
                        name:'打印机过热',
                        status:'bad',
                      },
                      {
                        name:'黑标异常',
                        status:'bad',
                      },
                      {
                        name:'内存错误',
                        status:'bad',
                      },
                      {
                        name:'纸将尽',
                        status:'warn',
                      },


                    ]

                  },






                    //动态信息
                    hasDeviceInfo:true,
                    //定时器
                    timeid:0,
                    timeid2:0,
                    //本组件所有图片地址
                     deviceIconUrl:{
                      deviceNormal:'./static/img/设备状态_normal.png',
                      deviceAbnormal:'./static/img/设备状态.png',
                        USBNormal:'./static/img/device_U_normal.png',
                        USBAbnormal:'./static/img/device_U_unusual.png',
                        Unknown:'./static/img/device_unknown_normal.png',
                        ScreenNormal:'./static/img/device_display_normal.png',
                        ScreenAbmormal:'./static/img/device_display_unusual.png',
                        PrinterImg:'./static/img/device_printer_pic.png'
                       },
              




            }
        },


        methods:{

            //获取设备USB信息(实时)
            getUSBInfo(){

              let para={agentId:this.device.agentId,type:"USB"};
              console.log(para);
               //api.getExpandsInfo(para).then((res)=>{
               //  console.log("usb-expand");
              //   console.log(res.data.length);
               
              // })
             this.USB.num=this.USB.USBMock.length;

            },

            //获取设备显示器信息(实时)
            getScreenInfo(){
              let para={agentId:this.device.agentId,type:"Screen"};
              api.getExpandsInfo(para).then((res)=>{
                console.log("screen-expand");
                this.ScreenData=this.ScreenDataMoke;

                if(this.ScreenData==null||this.ScreenData.length==0){
                     // this.Screenshowline1="hidden";
                     this.Screenshowline2='hidden';
                    this.ScreenStatus[0].screenTotalNum=0;
                    this.ScreenStatus[1].screenAbnormalNum=0;
                    this.ScreenStatus[2].screenNormalNum=0;
                    this.ScreenStat='异常';
                    this.hasScreen=false;


                }else if(this.ScreenData.length==1){
                    
                    this.screenIconVisiable='visibility';

                    let temp=util.handleScreenData(this.ScreenData);
                    this.ScreenStatus[0].screenTotalNum=temp[0];
                    this.ScreenStatus[1].screenAbnormalNum=temp[1];
                    this.ScreenStatus[2].screenNormalNum=temp[2];
                    if(this.ScreenStatus[1].screenAbnormalNum!=0){
                        this.ScreenStat='异常';
                    }
                    // this.Screenshowline1="visibility";
                    this.Screenshowline2='hidden';


                }
                else{
                    
                    this.screenIconVisiable='visibility';
                    let temp=util.handleScreenData(this.ScreenData);
                    this.ScreenStatus[0].screenTotalNum=temp[0];
                    this.ScreenStatus[1].screenAbnormalNum=temp[1];
                    this.ScreenStatus[2].screenNormalNum=temp[2];

                    if(this.ScreenStatus[1].screenAbnormalNum!=0){
                        this.ScreenStat='异常';
                    }
                    // this.Screenshowline1="visibility";
                     this.Screenshowline2='visibility';
                     console.log(this.Screenshowline1);

                   
                     console.log(this.ScreenData.length);

                }

               
              })

            },


            //获取实时数据
            getRealTime(){
               let para={agentId:this.device.agentId,type:"USB"};
               let para2={agentId:this.device.agentId,type:"Screen"};
               axios.all([api.getExpandsInfo(para),api.getExpandsInfo(para2)]).then(axios.spread((usbres,screenres)=>{
                console.log("real");
                 //this.initWidth();
               }));

            },
       

            //显示显示器属性
            showScreenDetail(val){
                

                this.screenDetailVisable=true;
                this.screenHeight=val.Height;
                this.screenWidth=val.width;
            },
            //隐藏显示器属性
            hiddenScreenDetail(){
                this.screenDetailVisable=false;
            },


            //显示USB属性
            showUSBDetail(val,el){
                
                //console.log(val);
                 this.USB.USBDetialViliable=true;
                this.USB.USBDetial=val;
                
                this.USB.USBKeys=Object.keys(val);               
            },
            //隐藏USB属性

             hiddenUSBDetail(){
                this.USB.USBDetialViliable=false;
            },

            //获取USB一小时信息(历史)
            // getUSBOneHourInfo(){
            //     let para={
            //         agentId:this.device.agentId,
            //         type:"USB",
            //         beginTs: "2018-01-09 13:00:00",
            //         endTs:"2018-08-07 17:35:00",
            //     }
            //      //para=util.getOneHourTime(para);
            //      console.log('onehour');
            //      console.log(para);
            //     api.getHistoryData(para).then(res=>{
            //         if(res.data.length==0){
            //             this.hasDeviceInfo=false;
            //         }else{
            //         res.data=util.timestampToTime(res.data);
            //         this.USB.USBHistoryData=res.data;
            //         this.hasDeviceInfo=true;
            //     }

            //         // console.log(this.USB.USBHistoryData);
            //     })

            // },

            //获取显示器一小时信息
            // getScreenOneHourInfo(){
            //     let para={
            //         agentId:this.device.agentId,
            //         type:"Screen",
            //         beginTs: "2018-01-09 13:00:00",
            //         endTs:"2018-08-07 17:35:00",
            //     }
            //     console.log("screen onehour");
            //      // para=util.getOneHourTime(para);
            //     // api.getHistoryData(para).then(res=>{ 
            //     //    if(res.data.length==0){
            //     // this.hasDeviceInfo=false;
            //     //    }else{
            //     //     res.data=util.timestampToTime(res.data);
            //     //     this.ScreenHistoryData=res.data;
            //     //        this.hasDeviceInfo=true;                          
            //   //}
                    
            //     // });

            // },

            //获取USB一天内数据

            // getUSBOneDayInfo(){
            //      let para={
            //         agentId:this.device.agentId,
            //         type:"USB",
            //         beginTs: "2018-01-09 13:00:00",
            //         endTs:"2018-08-07 17:35:00",
            //         }
            //        // para=util.getOneDayTime(para);
            //         console.log(para);
                    
            //         api.getHistoryData(para).then(res=>{
            //             if(res.data.length==0){
            //                 this.hasDeviceInfo=false;
            //             }else{
            //             res.data=util.timestampToTime(res.data);
            //             this.USB.USBHistoryData=res.data;
            //             console.log('onedayUSB');
            //             console.log(this.USB.USBHistoryData);
            //             this.hasDeviceInfo=true;
            //         }
            //        })
            // },

             //获取显示器一天内数据

            // getScreenOneDayInfo(){
            //      let para={
            //         agentId:this.device.agentId,
            //         type:"Screen",
            //         beginTs: "2018-01-09 13:00:00",
            //         endTs:"2018-08-07 17:35:00",
            //         }
            //        // para=util.getOneDayTime(para);
            //         //console.log(para);
            //         console.log('oneday screen');
            //        //  api.getHistoryData(para).then(res=>{
            //        //      res.data=util.timestampToTime(res.data);
            //        //      this.ScreenHistoryData=res.data;
            //        // })
            // },
            //获取一小时内数据
            // getOneHourInfo(){

            //    let paraScreen={
            //         agentId:this.device.agentId,
            //         type:"Screen",
            //         beginTs: "2018-01-09 13:00:00",
            //         endTs:"2018-08-07 17:35:00",
            //     }
              
            //     paraScreen=util.getOneHourTime(paraScreen);
            //     let paraUSB={
            //         agentId:this.device.agentId,
            //         type:"USB",
            //         beginTs: "2018-01-09 13:00:00",
            //         endTs:"2018-08-07 17:35:00",
            //     }
               
            //     paraUSB=util.getOneHourTime(paraUSB);


            //   axios.all([api.getHistoryData(paraScreen),api.getHistoryData(paraUSB)]).then(axios.spread((screenres,usbres)=>{
            //     console.log(screenres);
            //     console.log("1234o");
            //     console.log(usbres);
            //     if(screenres.data.length==0||usbres.data.length==0){
            //                 this.hasDeviceInfo=false;
            //             }else{
                        
            //             this.USB.USBHistoryData=util.timestampToTime(usbres.data);;
            //             console.log('onedayUSB');
            //             //console.log(this.USB.USBHistoryData);
            //             this.hasDeviceInfo=true;
            //         }
            //   }));

            //     //console.log('onehourfinish')
            //     //this.getScreenOneHourInfo();
            // },
            //获取一天内数据
            getOneDayInfo(){
                //this.getUSBOneDayInfo();
                //this.getScreenOneDayInfo();
                let paraScreen={
                    agentId:this.device.agentId,
                    type:"Screen",
                    beginTs: "2018-01-09 13:00:00",
                    endTs:"2018-08-07 17:35:00",
                }
              
                paraScreen=util.getOneDayTime(paraScreen);
                let paraUSB={
                    agentId:this.device.agentId,
                    type:"USB",
                    beginTs: "2018-01-09 13:00:00",
                    endTs:"2018-08-07 17:35:00",
                }
                //paraUSB=util.getOneDayTime(paraScreen);
                 axios.all([api.getHistoryData(paraScreen),api.getHistoryData(paraUSB)]).then(axios.spread((screenres,usbres)=>{
                console.log(screenres);
               console.log("1234o");
                console.log(usbres);
                if(screenres.data.length==0&&usbres.data.length==0){
                            this.hasDeviceInfo=false;
                        }else{
                        
                        this.USB.USBHistoryData=util.timestampToTime(usbres.data);;
                        console.log('onedayUSB');
                        console.log(this.USB.USBHistoryData);
                        this.hasDeviceInfo=true;
                    }
              }));
               
                console.log("onedayfinish");
            },

            //get Store
            getStore(){

              //let cellapse=this.$store.state.collapsed?(422-23):(367-23);
               let cellapse=this.$store.state.collapsed?(410-23):(350-23);

                this.USB.USBBoxWidth=((cellapse/this.USB.num)/cellapse)*100;
                //this.USB.USBBoxWidth=
                //this.USB.USBBoxWidth=this.$store.state.collapsed?14.2:14.2
                 this.USB.lineWidth=(19.857+18.583*this.USB.num-1.297*this.USB.num*this.USB.num);

                 let boxwidth=this.$store.state.collapsed?422:365;
                  this.boxWidth=((boxwidth-2)/(this.ScreenData.length)/boxwidth)*100;
                 // this.boxwidth=this.store.state.collapsed
            },

            // getStore(event,data){

            //   let cellapse=data.collapsed?(425-23):(365-23);

            //     this.USB.USBBoxWidth=cellapse/this.USB.num;
            //      this.USB.lineWidth=(19.857+18.583*this.USB.num-1.297*this.USB.num*this.USB.num);

            //      let boxwidth=data.collapsed?429:365;
            //       this.boxWidth=(boxwidth-5)/(this.ScreenData.length);
            // },

            // initWidth(){

            //   //let cellapse=(425-23);

            //     this.USB.USBBoxWidth=342/this.USB.num;
            //      this.USB.lineWidth=(19.857+18.583*this.USB.num-1.297*this.USB.num*this.USB.num);
            //       this.boxWidth=360/(this.ScreenData.length);
            // },


           


            clearData(){
              this.USBHistoryData=[];
              this.ScreenHistoryData=[];
            },
            refreshData(){
              this.clearData();
              this.getRealTime();
              this.getOneDayInfo();
            },

            //保存当前路由路径
           setLocation(){
            sessionStorage.setItem('location',JSON.stringify(this.$route.name))
            console.log(this.$route)
            console.log("syslog");
           }
            


        },

        mounted(){
          if(this.timeid==0){
              this.timeid=setInterval(this.getStore,0);
          }
          this.device.agentId= "000040167E677023";
          this.getRealTime();
          this.getOneDayInfo();
          

          //this.$PubSub.subscribe("COLLAPSECHANGE",this.getStore);
          if(this.timeid2==0){
            //this.timeid2=setInterval(this.refreshData,60*1000)
          }
                // this.device=this.$route.params.device;
                this.device=JSON.parse(sessionStorage.getItem('device'));
                
               
               
                this.getUSBInfo();
                this.getScreenInfo();

               
               
                  // this.getUSBOneHourInfo();
                  // this.getScreenOneHourInfo();
                  //this.getUSBOneDayInfo();
                 //this.getOneHourInfo();
                  //this.getOneDayInfo();
                  console.log(this.$route.metched)

                  // console.log("store"+this.$store.state.collapsed);
                  // this.$store.state.currentPathname="外设管理";

                this.setLocation();

                  
                
            
        },

        beforeDestroy(){
          window.clearInterval(this.timeid);
          window.clearInterval(this.timeid2);
            
        }

        
    }
</script>
<style lang="scss" scoped>
  *{
    font-family:Microsoft YaHei;
  }
.expands{
   
    //padding:5px;
    position: relative;
    width:100%;
    height:93%;
    margin:auto;
    background-color:#fff;

    .main-left{
        
        font-weight:bold;
        height:100%;

        .container-usb{
            height:49.39%;
            
            width:48%;
            color:#4b5262;
            margin-right:8px;
            border:1px solid #ddd;
            margin-bottom:5px;
            position: relative;
            .hasUSB,.hasNotUSB{
              font-size:14px;
              padding-left:10px;
              padding-top:5px;
              height:12%;

            }


            .ServerIcon{
                width:100%;
                height:38%;
               
                line-height:50px;
                padding-top:10px;
                position: relative;
                text-align:center;

                .deviceIconClass{
                    width:17%;
                    height:100%;
                 
                } 
            }
            .afterServerIcon{
                  
                    height:8%;
                    width:2px;
                    position:relative;
                    border:1px dashed green;
                   top:-1.5%;
                  left:50%;
               
            }
            .lineForDevice{
                    width:88%;
                    border:1px dashed green;
                    margin: 0px  auto 0px auto;
                }

                .lineToDevice{ 
                   height:25.86%;
                    width:2px;
                    position:absolute;  
                    top:2px;
                    left:50%;                   
                 }           
            .usb-box{
                        width:10px;
                        height:58px;         
                        float:left;
                        text-align:center;
                        margin:0 auto 0 auto;

                        
                        .screenIc{
                           
                            position:relative;                
                            height:60px;


                            
                            .USBImgClass{
                              width:30px;
                              margin-top:15px;
                            }

                            .UnknownBadge{

                              position:absolute;
                              top:10px;
                              right:0px;
                              
                            }

                            }

                                    
                        
                        
                    }

            .USBDetial{
                position:absolute;
                text-align:center;
                bottom:2%;
                left:11%;
               

                span{
                    display:inline-block;
                    border:1px solid #aaa;
                    padding:0px 5px;
                    font-size:3px;
                    width:140px;
                    text-align:center;
                    margin:0 -2px;
                    height:20px;
                    line-height:20px;
                    background-color:#fff;


                }

            }
                

            
        }
        .container-screen{
            height:49.39%;
            
            border:1px solid #ddd;
            margin-bottom:5px;
            position: relative;
            color:#4b5262;

            .ScreenTitle{
                width:80px;
            }

            .hasScreen,.hasNotScreen{
              font-size:14px;
              padding-left:10px;
              padding-top:5px;
              height:12%;

            }

            .ServerIcon{
                width:100%;
                height:38%;
               
                line-height:50px;
                padding-top:10px;
                position: relative;
                text-align:center;

                 .deviceIconClass{
                    width:17%;
                    height:100%;
                   
                } 
            }

            .afterServerIcon{

                    height:8%;
                    width:2px;
                    position:relative;
                    border:1px dashed green;
                   top:-1.5%;
                  left:50%;

                }
                .lineForDevice{
                    width:50%;
                    border:1px dashed green;
                    margin: 0px  auto 0px auto;

                }
                
                .lineToDevice{ 
                   height:15px;
                    width:2px;
                    position:absolute;  
                    top:2px;
                    left:49.5%;                   
                 }                
                    .screen-box{
                        
                        width:10px;
                        height:58px;         
                        float:left;
                        text-align:center;
                        margin:0 auto 0 auto;

                        .screenIc{
                           
                            position:relative;                
                            height:60px;

                            .ScreenImgClass{
                                width:30px;
                                display:inline-block;
                                margin: 15px auto;
                                cursor: pointer;
                            }           
                        }
                        
                    }


                    .screenDetail{
                        position: absolute;
                        bottom:17%;
                        left:33%;
                        width:130px;
                        height:24px;
                        text-align:center;
                        border:1px solid #aaa;
                        line-height:20px;
                        padding:2px 10px;
                       
                    }
                }
            
        
        .container-printer{
            height:55.7%;
            width:99%;
            border:1px solid #ddd;
            .icon-dayinjidayinxianxing,.icon-waijieshebei{
                font-size:18px;
                width:15px;
                line-height:18px;
                color:#aaa;
            }
            
            .PtinterTitle{
                display:inline-block;
                width:80px;
                text-align:center;
                font-size:13px;
                font-weight:bold;

            }

            .PrinterBody{
              width:100%;
              height:100%;
              position: relative;
              //background-color:green;

              .body-left{
                width:40%;
                height:100%;
                position: relative;
                //background-color:red;
                float:left;

                .PrinterBox{
                  width:100%;
                  height:48.94%;
                  //background-color:blue;
                  padding:50px 0px 0 0px;
                  position: relative;
                 
                 .icon-waijieshebei{
                      display:inline-block;
                          float:left;
                          width:120px;
                          height:50px;
                          text-align:center;
                          font-size:50px;
                          color:#aaa;
                  }
                  .hasPrinterDiv{
                    position: absolute;
                    width:120px;
                    height:50px;
                    top:45px;
                    left:35px;
                  }


                  .Title{
                    //background-color:green;
                    height:50px;
                    float:left;
                    position:absolute;
                    bottom:0px;
                    left:130px;
                    font-size:14px;
                    line-height:25px;
                    color:#4b5262;

                  }
                }
              }

               .body-right{
                  padding:10px;
                  width:60%;
                  height:100%;

                 // background-color:green;
                  float:left;
                  position: relative;

                  .PrinterItemBox{
                    position: relative;

                    .PrinterItem{
                      width:50%;
                      height:30px;
                      //background-color:blue;
                      line-height:35px;
                      padding-left:30px;
                      float:left;
                      color:#4b5262;

                      
                      .itemIcon{
                        display:inline-block;
                        width:15px;
                        height:15px;
                        border-radius:100%;
                        
                        margin-right:20px;

                      }

                      span{
                        
                        position: relative;
                        top:-2px;
                        font-size:14px;

                      }

                    }
                  }
                
                 }
              }


        }

        .el-icon-mobile-phone{
                font-size:18px;
                width:15px;
                line-height:18px;
            }
            .USBTitle{
                display:inline-block;
                width:70px;
                text-align:center;
                font-size:13px;
                font-weight:bold;
                color:#4b5262;

            }
            .USBStat{
                display:inline-block;
                width:45px;
                font-size:14px;
                font-weight:bold;
                text-align:center;
                height:18px;
                color:white;
            }

    }
    .main-right{
        
        height:106%;
        border:1px solid #ddd;
        color:#4b5262;
        .InfoTitle{
            display:inline-block;
            width:70px;
            text-align:center;
            font-size:13px;
             font-weight:bold;
        }
        .icon-svg{
          color:#bbb;
          font-size:16px;
        }

        .LookMore{
            height:20px;
            line-height:7px;
            float:right;

        }

        .containe{
            width:100%;
            //background-color:red;
            overflow-x:hidden;
           
              
            position: relative;
            overflow-y:auto;
            overflow-x:hidden;
            padding:0px;
            height:404px;
            div:first-child{
                .itemIcon{
                    background-color:#3bacf9;
                    width:14px;
                    height:14px;
                    border:2px solid #acdcfb;
                    
                }
            }
            div:last-child{
              .timestamp{
                  &:after{
                  height:70%;
                }
              }
            }

            .info-box{
                width:100%;
                height:60px;
                position: relative;
               


                .timestamp{
                    width:21.77%;   
                    font-size:14px;
                    float:left;
                    padding:0px;
                    color:#4b525c;
                    font-weight:bold;
                    //background-color:red;
                    text-align:center;

                    
                    }   

                .timestamp:after{
                    border:0.5px solid #ddd;
                    content: '';
                    position: absolute;
                    left:24.7%;
                    top:0px;        
                    height:80px;

                }

                .itemIcon{
                    display: inline-block;
                   background-color:#3bacf9;
                    border-radius: 100%;
                    width:12px;
                    height:12px;
                    position: absolute;
                    top:5px;
                    left:23.0%;



                }
                .info-detial{
                    width:78.23%;
                    height:60px;
                    color:#4b5262;

                    
                    //background-color:blue;
                    float:right;
                    font-size: 14px;
                    padding:0 0px 0 25px;
                }

            
            }

        }

        .line{
          position: absolute;
          float:left;
          border:0.2px solid #ddd;
          height:90%;

         left:24.9%;
         z-index:-1;
          top:0px;
        }                   
          
    }
}
   


     .backAbnormalStyle{
                    
        background-color:#fd446d;

     } 
    .backNormalStyle{
                    
        background-color:#1ad147;

        } 

        .iconAbnormalStyle{
            color:red;
        }
         .iconNormalStyle{
            color:green;
        }
        .lineAbnormalStyle{
            border:1px dashed red;
        }
        .lineNormalStyle{
            border:1px dashed green;
        }

        .primaryStyle{
              background-color:#eff4f7;
                   
                    }
        .badBackStyle{
          background-color:#fe5e5b;
        }
        .warnBackStyle{
          background-color:#fda510;

        }


.iconfont{
  font-size:16px;
}

</style>