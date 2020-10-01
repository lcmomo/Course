<template>
    <div class="softMgmt">
        <el-row style="height:100%">
           <el-col  :span="24" class="toobar">
               <el-col :span="2" style="height:100%">
                   <div class="StatIcon">
                       <i :class="ProcessIconStat==true?'el-icon-success':'el-icon-warning'"></i>
                   </div>
               </el-col>
               <el-col :span="19">
                   <div class="StatTitle" v-if="!ProcessIconStat">
                   当前进程数：{{currentProcessNum}}个,危险进程：2&nbsp;&nbsp;无响应进程：{{noResponseProcessNum}}
                   </div>
                   <div class="StatTitle1" v-if="ProcessIconStat">
                   当前进程数：{{currentProcessNum}}个
                   </div>
               </el-col>
               
           </el-col>

           <el-col :span="24" class="CPURAMInfo">
               <div class="HardIconBox">
                  <div class="HardItem" id="cpu"@click="choiceCPU">
                    <div class="Icon">
                      <img :src="CPUImg" alt="" class="IconClass">
                    </div>
                    <div class="IconName">
                        CPU
                    </div>
                    <div class="IconValue" :class="CPUUsageReal>50?'abnormalColor':'normalColor'">
                        <span>{{CPUUsageReal}}</span>%
                    </div>
                  </div>
                  <div class="HardItem"@click="choiceRAM"  id="ram">
                      <div class="Icon">
                         <img :src="RAMImg" alt="" class="IconClass">
                      </div>
                      <div class="IconName">
                          RAM
                      </div>
                      <div class="IconValue" :class="RAMUsageReal>50?'abnormalColor':'normalColor'">
                          <span>{{RAMUsageReal}}</span>%
                      </div>
                  </div>
              </div>
                <div class="HardGraph">
                    <div class="CPUGraph" v-if="HardWare.isCPUGraph">
                        <div id="Test" style=" height:100%;margin:0 auto" ></div>
                    </div>
                                          

                    <div class="RAMGraph" v-if="!HardWare.isCPUGraph">
                        <div id="Test2" style=" height:100%;margin:0 auto"></div>            
                    </div>
                </div>
          </el-col>

           <el-col :span="24" class="StatTable">
               
                <template v-if="" >
                  <el-table
                    :data="afterSelect"
                    stripe
                    style="width: 100%"
                    :header-cell-style="tableHeadClass"
                    :highlight-current-row="true"
                    :max-height="flextableHeight"
                    :height="flextableHeight"
                    empty-text="暂无进程信息"
                    :row-style="{height:25+'px'}"
                    :cell-style="isCellStyle"
                    align="center"
                    @cell-mouse-enter="showKill"
                    @cell-mouse-leave="hiddenKill"
                  >
                  
                    <el-table-column
                      
                     
                      width=""
                      header-align="center"
                      align="center">

                          <template slot-scope="scope" >
                            <span style="display:inline-block;width:50px;height:20px;color:white;background-color:#fd446d;cursor:pointer" v-show="scope.row.IsActive===false" >危险</span>
                            
                        </template>

                    </el-table-column>
                    <el-table-column
                      prop="Name"
                      label="程序名称"
                      width="150"
                      header-align="center"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="CPU Usage"
                      label="CPU使用率"
                      width="145"
                      header-align="center"
                       align="center"
                       sortable>
                    </el-table-column>
                    <el-table-column
                      prop="Mem Usage"
                      label="RAM使用率"
                      header-align="center"
                      width="150"
                       align="center">
                    </el-table-column>
                    <el-table-column
                      prop="IsActive"
                      label="状态"
                      width="150"
                      header-align="center"
                       align="center"
                       :filters="[{text:'运行中',value:'true'},{text:'无响应',value:'false'},{text:'危险',value:'危险'}]":filter-method="filterHandler"
                       filter-placement="bottom"
                       :formatter="formatterProcessStat"
                       >
                    </el-table-column>
                    <el-table-column
                      prop="PID"
                      label="PID"
                      width="145"
                      header-align="center"
                       align="center"
                       sortable>
                    </el-table-column>
                    <el-table-column
                      width=""
                      header-align="center"
                       align="center">
                        <template slot-scope="scope" >
                            <span style="display:inline-block;width:70px;height:20px;color:white;background-color:#f4ad38;line-height:20px;cursor:pointer"v-show="(scope.row.IsActive===false||scope.row.showBtn)" @click="killProcess(scope.row)">立即结束</span>
                            
                        </template>
                    </el-table-column>
                  </el-table>
                  
                </template>
                <div class="select" @click="showAllProcess" v-if="!ProcessIconStat">
                    <div class="showAll" v-if="!showAll">
                      <span >显示全部进程</span><i class="el-icon-arrow-down"></i>
                      </div>
                      <div class="showAll" v-if="showAll">
                      <span >收起全部进程</span><i class="el-icon-arrow-up"></i>
                      </div>

                  </div>

                  <template >
                  <el-table
                    :data="afterSelect2"
                    stripe
                    style="width: 100%"
                    :header-cell-style="tableHeadClass"
                    :highlight-current-row="true"
                    :show-header="false"
                    :max-height="flextableHeight2"
                   :height='flextableHeight2'
                   :row-style="{height:25+'px'}"
                    :cell-style="{padding:2+'px'}"
                    v-show="showAll"
                      @cell-mouse-enter="showKill"
                    @cell-mouse-leave="hiddenKill"
                   align="center">
                    <el-table-column
                      width=""
                      header-align="center"
                      align="center">

                          <template slot-scope="scope" >
                            <span style="display:inline-block;width:50px;height:20px;color:white;background-color:#fd446d;cursor:pointer" v-show="scope.row.IsActive==='false'" >危险</span>
                            
                        </template>

                    </el-table-column>
                    <el-table-column
                      prop="Name"
                      label="程序名称"
                      width="150"
                      header-align="center"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="CPU Usage"
                      label="CPU使用率"
                      width="145"
                      header-align="center"
                       align="center"
                       sortable>
                    </el-table-column>
                    <el-table-column
                      prop="Mem Usage"
                      label="RAM使用率"
                      header-align="center"
                       align="center"
                       width="150">
                    </el-table-column>
                    <el-table-column
                      prop="IsActive"
                      label="状态"
                      width="150"
                      header-align="center"
                       align="center"
                       :filters="[{text:'运行中',value:'运行中'},{text:'无响应',value:'无响应'},{text:'危险',value:'危险'}]":filter-method="filterHandler"
                       filter-placement="bottom"
                       :formatter="formatterProcessStat">
                    </el-table-column>
                    <el-table-column
                      prop="PID"
                      label="PID"
                      width="145"
                      header-align="center"
                       align="center"
                       sortable>
                    </el-table-column>
                    <el-table-column
                     
                      header-align="center"
                       align="center"
                       >
                        <template slot-scope="scope" >
                            <span style="display:inline-block;width:70px;height:25px;color:white;background-color:#f4ad38;line-height:25px;cursor:pointer" v-show="scope.row.showBtn"@click="killProcess(scope.row)"

                           >立即结束</span>
                            
                        </template>
                    </el-table-column>
                  </el-table>
                  
                </template>

           </el-col>
       </el-row>


    </div>
</template>

<script>

    import api  from '../../../api/index';
    import axios from 'axios'
    import util from '../../../common/util.js'
    import echarts from 'echarts'
    export default{
        name:"softMgmt",
        data(){
            return {
              flextableHeight:window.innerHeight*0.2083,
              flextableHeight2:0,

                //进程图标状态
                ProcessIconStat:true,
                //设备
                device:{name:'',agentId:''},
                CPUImg:'./static/img/icon2_normal.png',
                RAMImg:'./static/img/icon_normal.png',
                //进程数
                currentProcessNum:0,
                //危险进程
                dangerProcessNum:0,
                //无响应进程
                noResponseProcessNum:0,
                //CPU实时使用
                CPUUsageReal:0,
                //RAM实时使用
                RAMUsageReal:0,
                //定时器
                timeid:0,//请求数据定时器
                timeid2:0,//获取store定时器

                 tableData: [{
                      date: '2016-05-02',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1518 弄',
                      stat:'运行中'
                    }, {
                      date: '2016-05-04',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1517 弄',
                      stat:'无响应'
                    }, {
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄',
                      stat:'无响应'
                    }, {
                      date: '2016-05-03',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1516 弄',
                      stat:'危险'
                    }],

                    //是否显示全部进程
                    showAll:false,
                    



                    // 模拟数据

                    tableData:[{"Name":"chrome.exe","PID":"10140","CPU Usage":"0","Mem Usage":"56996","IsActive":true},{"Name":"chrome.exe","PID":"10516","CPU Usage":"0","Mem Usage":"68152","IsActive":true},{"Name":"OUTLOOK.EXE","PID":"9376","CPU Usage":"0","Mem Usage":"109484","IsActive":true},{"Name":"QQExternal.exe","PID":"6388","CPU Usage":"0","Mem Usage":"69104","IsActive":true},{"Name":"vcpkgsrv.exe","PID":"6632","CPU Usage":"0","Mem Usage":"43520","IsActive":true},{"Name":"ScriptedSandbox64.exe","PID":"6300","CPU Usage":"0","Mem Usage":"53544","IsActive":true},{"Name":"RdrCEF.exe","PID":"10596","CPU Usage":"0","Mem Usage":"55528","IsActive":true},{"Name":"RdrCEF.exe","PID":"9064","CPU Usage":"0","Mem Usage":"34500","IsActive":true},{"Name":"AcroRd32.exe","PID":"5104","CPU Usage":"0","Mem Usage":"154204","IsActive":true},{"Name":"AcroRd32.exe","PID":"3480","CPU Usage":"0","Mem Usage":"29680","IsActive":true},{"Name":"pgAdmin3.exe","PID":"10204","CPU Usage":"0","Mem Usage":"51504","IsActive":true},{"Name":"chrome.exe","PID":"4104","CPU Usage":"0","Mem Usage":"107928","IsActive":true},{"Name":"chrome.exe","PID":"4876","CPU Usage":"0","Mem Usage":"47196","IsActive":true},{"Name":"chrome.exe","PID":"3500","CPU Usage":"0","Mem Usage":"60752","IsActive":true},{"Name":"chrome.exe","PID":"7932","CPU Usage":"0","Mem Usage":"117232","IsActive":true},{"Name":"chrome.exe","PID":"1832","CPU Usage":"0","Mem Usage":"17532","IsActive":true},{"Name":"chrome.exe","PID":"12216","CPU Usage":"0","Mem Usage":"16828","IsActive":true},{"Name":"chrome.exe","PID":"5416","CPU Usage":"0","Mem Usage":"144048","IsActive":true},{"Name":"conhost.exe","PID":"3856","CPU Usage":"0","Mem Usage":"13344","IsActive":true},{"Name":"Microsoft.VsHub.Server.HttpHost.exe","PID":"7252","CPU Usage":"0","Mem Usage":"140576","IsActive":true},{"Name":"VsHub.exe","PID":"8432","CPU Usage":"0","Mem Usage":"51016","IsActive":true},{"Name":"devenv.exe","PID":"6020","CPU Usage":"0","Mem Usage":"642180","IsActive":true},{"Name":"TXPlatform.exe","PID":"7172","CPU Usage":"0","Mem Usage":"1184","IsActive":true},{"Name":"TIM.exe","PID":"7048","CPU Usage":"0","Mem Usage":"195588","IsActive":true},{"Name":"TGitCache.exe","PID":"5916","CPU Usage":"0","Mem Usage":"13960","IsActive":true},{"Name":"SogouCloud.exe","PID":"2776","CPU Usage":"0","Mem Usage":"23960","IsActive":true},{"Name":"DTShellHlp.exe","PID":"7244","CPU Usage":"0","Mem Usage":"8608","IsActive":true},{"Name":"TSVNCache.exe","PID":"6536","CPU Usage":"0","Mem Usage":"35060","IsActive":true},{"Name":"ONENOTEM.EXE","PID":"6564","CPU Usage":"0","Mem Usage":"1444","IsActive":true},{"Name":"explorer.exe","PID":"6024","CPU Usage":"0","Mem Usage":"126148","IsActive":true},{"Name":"dwm.exe","PID":"5956","CPU Usage":"0","Mem Usage":"48464","IsActive":false},{"Name":"taskhost.exe","PID":"5892","CPU Usage":"0","Mem Usage":"11508","IsActive":false}],

                    //筛选的数据
                    afterSelect:[],

                    afterSelect2:[],


                     //硬件资讯
                HardWare:{
                    HardWareStat:"良好",
                    hasHardWare:true,
                    isCPUGraph:true,
                    isRAMGraph:false,
                    hasCpuInfo:true,
                    hasRAMInfo:true,
                    CPUUsageList:[],
                    TimeList:[],
                    AvailMemList:[],


                },

                
                Test:null,
                //CPu
                 option : {

                        color:'#ff00ff',
                        animation:true,
                        animationDelay: function (idx) {// 越往后的数据延迟越大
                        return idx * 100;
                        },
                        // title : {
                        //     text : '',
                        //     subtext : ''
                        // },
                         tooltip : {
                           trigger: 'item',
                            formatter :function (params){
                              console.log(params);
                              // params.marker='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f4ad38;"></span>'



                              if(params.seriesName=='cpu'){
                                return params.data+" %";
                              }
                              else if(params.seriesName=='ram'){

                              console.log("ech");
                              let res=(params.data/100*8)+' GB';
                              return res;
                            }

                            }
                         },
                            // itemStyle: {
                            //     normal: {
                            //         label: {
                            //             show: false
                            //         },
                            //         labelLine: {
                            //             show: false
                            //         }
                            //     } ,
                            //     emphasis: {
                            //         label: {
                            //             show: true,
                            //             //position: 'outer'
                            //         },
                            //         labelLine: {
                            //             show: true,
                            //             lineStyle: {
                            //                 color: 'red'
                            //             }
                            //         }
                            //     }
                            // },
                        // toolbox: {
                        //     show : false,
                        //     feature : {
                        //         mark : {show: true},
                        //         dataView : {show: true, readOnly: false},
                        //         restore : {show: true},
                        //         saveAsImage : {show: true}
                        //     }
                        // },
                         dataZoom: {
                             show: false,
                             start : 70
                         },
                        // legend : {
                        //      data : ['series1']
                        // },
                        grid: {
                            x:45,
                            y:20,
                            x2:10,
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
                                        formatter: '{value} %'
                                    }

                            }
                        ],
                        series : [
                            {
                                 name: 'series1',
                                type: 'line',
                                showAllSymbol: true,
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
            //表格数据过滤
            filterHandler(value, row,column){
                const property=column['property'];
                //console.log(value);
                return row[property]===value;
            },
            //表头样式
            tableHeadClass({ row, column, rowIndex, columnIndex }){
                if (rowIndex == 0) {
                    return 'background:#ddd;color:#333;height:20px;padding:0px;font-size:12px'
                } else {
                    return 'height:20px;'
                }


            },
            //单元格样式
            isCellStyle({row,column,rowIndex,columnIndex}){
              // console.log(row);
              // console.log(rowIndex);
              //  console.log(columnIndex);
              return (row.IsActive=='false'&&columnIndex==4)?'padding:2px;color:#fcc579':'padding:2px;';
             
            },

            //结束进程
            killProcess(value){
                // console.log(value);
                // console.log('kill');

            },

            //显示全部进程
            showAllProcess(){
                this.showAll=!this.showAll;
            },
            //鼠标滑过显示结束进程按钮
            showKill(row,column,cell,event){
              
              
              row.showBtn=true;
            },
            hiddenKill(row,column,cell,event){
             
             
              row.showBtn=false;
            },

            //获取进程信息列表数据
            getProcessInfoList(){
                let para={agentId:this.device.agentId,type:'Process'};
                api.getExpandsInfo(para).then(res=>{

                    if(res.data!=null){
                         console.log("beforeJSOn");
                         console.log(res.data);

                        //this.tableData=res.data;

                       console.log("afterJSOn");
                       //console.log(this.tableData);
                        this.currentProcessNum=this.tableData.length;
                        var res=util.getProcessInfo(this.tableData);
                        console.log(res);
                        this.afterSelect= res[0];
                        this.afterSelect2=res[1];
                        

                       
                       
                        if(this.afterSelect.length==0){
                            this.ProcessIconStat=true;
                            this.flextableHeight=window.innerHeight*0.40;
                            
                            this.afterSelect=this.tableData;
                                    
                        }else{
                        this.ProcessIconStat=false;
                        this.flextableHeight=window.innerHeight*0.2083;
                        this.flextableHeight2=window.innerHeight*0.1677;
                        this.noResponseProcessNum=this.afterSelect.length;
                        }
                    }else{

                    }
            })

            },

            //格式化进程状态信息
            formatterProcessStat(row,column,cellValue,index){

                return cellValue==true?'运行中':'无响应';
            },
            //选择CPU
            choiceCPU(){
                this.HardWare.isCPUGraph=true;
                 $('#cpu').css('background','#fff');
                 $('#ram').css('background','#f3f7f8')
                //this.HardWare.isRAMGraph=false;
                // this.HardWare.hasCpuInfo=true;
                setTimeout(()=>{
                    this.drawCPU();
                },0);
                
                console.log("im CPU");
            },

            //选择RAM
            choiceRAM(){
               // this.HardWare.isRAMGraph=true;
               // this.HardWare.hasRAMInfo=true;
               $('#cpu').css('background','#f3f7f8');
               $('#ram').css('background','#fff');
                 this.HardWare.isCPUGraph=false;
                  setTimeout(()=>{
                    this.drawRAM();
                },0);
                  
                console.log("im RAM")
            },
            hiddenCPU(){
              this.HardWare.isCPUGraph=true;
            },
            hiddenCPU(){
              this.HardWare.isCPUGraph=false;
            },


            drawCPU(){
               
                if(this.HardWare.TimeList.length!=0&&this.HardWare.isCPUGraph){
                     this.Test=echarts.init(document.getElementById("Test"));
                    // if(this.getStore()==true){
                    //    this.option.grid.x2=10;
                    // }
                    // else{
                    //   this.option.grid.x2=45;
                    // }
                    this.option.xAxis[0].data=this.HardWare.TimeList;
                   
                    this.option.series[0].data=this.HardWare.CPUUsageList;
                   this.option.series[0].name="cpu";

                    this.Test.setOption(this.option);
                   
                    
                }else{
                    console.log('err');
                }

            },

            drawRAM(){
                
                if(this.HardWare.TimeList.length!=0&&!this.HardWare.isCPUGraph){
                    this.Test2=echarts.init(document.getElementById("Test2"));
                    // if(this.getStore()){
                    //    this.option.grid.x2=10;
                    // }
                    // else{
                    //   this.option.grid.x2=45;
                    // }
                    this.option.xAxis[0].data=this.HardWare.TimeList;
                   
                    this.option.series[0].data=this.HardWare.AvailMemList;
                    this.option.series[0].name="ram";
                    this.Test2.setOption(this.option);
                    window.addEventListener('resize', function () {document.getElementById("Test2").resize();});
                    
                }else{
                    console.log('err');
                }

            },


             getCPUUsageList(){

                let params={
                     // agentId: "000040167E677023",
                    agentId:this.device.agentId,
                    type: "System",
                    beginTs: "2018-08-12 09:00:00",
                    endTs: "2018-08-13 10:00:00"
                    }
                    //console.log("siys");
                    
                    //params=util.getOneHourTime(params);
                    console.log('time');
                    //console.log(params);
                    api.getHistoryData(params).then(res=>{
                        //this.CPUUsageList=res.data;
                        console.log(res);
                       if(res.totalCount!=0){
                           res.data= util.getHardwareUSageList(res.data);
                           
                           for(let i=0;i<res.totalCount;i++){
                                this.HardWare.TimeList.push(res.data[i].ts);
                               this.HardWare.CPUUsageList.push(res.data[i].cpuUsage);
                                this.HardWare.AvailMemList.push(res.data[i].availphysMemKB);
                           }
                           // console.log(this.HardWare.TimeList[0]+"time0");
                           // console.log(this.HardWare.TimeList[1]+"time0");
                           // console.log(this.HardWare.TimeList[this.HardWare.TimeList.length-1]+"time0");

                           // this.CPUUsageReal=this.HardWare.CPUUsageList[this.HardWare.CPUUsageList.length-1];


                           //  this.RAMUsageReal=this.HardWare.AvailMemList[this.HardWare.AvailMemList.length-1];
                   
                                this.drawCPU();
                                this.drawRAM();                         
                      }else{
                             console.log("no info");
                             
                      }

                        })
                },

                clearData(){
                  this.HardWare.TimeList=[];
                  this.HardWare.CPUUsageList=[];
                  this.HardWare.AvailMemList=[];
                },


                refreshData(){

                  this.clearData();

                  this.getCPUUsageList();
                  this.getProcessInfoList();
                  console.log(this.HardWare.TimeList.length);
                   this.getRealTimeSystemInfo();
                  this.drawCPU();
                  this.drawRAM();
                },


                //获取cpu，ram实时使用信息
                getRealTimeSystemInfo(){
                  let para={agentId:this.device.agentId,type:'System'}
                  api.getExpandsInfo(para).then(res=>{
                    //console.log(res);

                   
                    if(res.result!=="No Content"){
                       res.data=JSON.parse(res.data);

                      this.CPUUsageReal=res.data[0].value;
                      this.RAMUsageReal=res.data[1].value;
                      if(this.CPUUsageReal>50){
                        this.CPUImg='./static/img/icon2_unusual.png'

                      }
                      if(this.RAMUsageReal>50){
                        this.RAMImg='./static/img/icon_unusual.png'
                      }
                    }else{
                      console.log('no cup ram');


                    }
                  })
                },

                //保存当前路由路径
           setLocation(){
            sessionStorage.setItem('location',JSON.stringify(this.$route.name))
           },

           //获取store
           getStore(){
            let cell=this.$store.state.collapsed;
            console.log("exp "+cell);
         
            if(cell){
                    this.option.grid.x2=10;
                    console.log(this.option.grid.x2);
                    this.option.grid.y2=20;
                    if(this.HardWare.isCPUGraph)
                      this.drawCPU();
                    else
                      this.drawRAM();
                   }

            else{
                    this.option.grid.x2=25;
                    console.log(this.option.grid.x2);
                    this.option.grid.y2=20;
                    if(this.HardWare.isCPUGraph)
                      this.drawCPU();
                    else
                      this.drawRAM();
                   }

             }
            
        },

        mounted(){
            //this.device=JSON.parse(sessionStorage.getItem('device'));
            //this.device.agentId= "0000005056C00008";
            // if(this.timeid2==0){
            //   this.timeid2=window.setInterval(this.getStore,0);
            //  }
             this.device.agentId= "000040167E677023";
            
            this.getProcessInfoList();
            this.getCPUUsageList();
            this.getRealTimeSystemInfo();
             
             if(this.timeid==0){
               this.timeid=window.setInterval(this.refreshData,30000);
             }
              $('#cpu').css('background','#fff');
             
            //this.$store.state.currentPathname="软体管理";
            this.setLocation();
        },
        beforeDestroy(){
          window.clearInterval(this.timeid);
          window.clearInterval(this.timeid2)
        },



        
    }
</script>
<style scoped lang="scss">
*{
    margin:0;
    padding:0;
    border:0;
    font-family:Microsoft YaHei;

}

.softMgmt{

    position: relative;
    border:1px solid #eee;
    height:100%;
    height:99.75%;
   // background-color:green;
    padding:5px;
    
   

    .toobar{
       
        height:11.47%;

        .StatIcon{
            height:100%;
            
            position: relative;
           


            .el-icon-warning{
                font-size:2.8em;
                line-height:50px;
                position: absolute;
                right:30px;
                color:#fd446d;
                height:100%;
            }

            .el-icon-success{
                font-size:3em;
                line-height:50px;
                position: absolute;
                right:25px;
                color:#1ad147;
                height:100%;
            }
        }

        .StatTitle{
            position: relative;
            
            height:100%;
            width:100%;
           
            line-height:50px;
            font-size:15px;
            font-weight:bold;
           
        }

        .StatTitle1{
            position: relative;
            
            height:50px;
            
            line-height:50px;
            font-size:15px;
            font-weight:bold;
            
        }

        
    }

    .CPURAMInfo{
      height:22.94%;
      //background-color:blue;
      margin-bottom:10px;
      .HardIconBox{
                    width:17%;
                    //background-color:#eee;
                   height:100%;
                    float:left;
                    position: relative;


                    .HardItem{
                      width:100%;
                      height:50%;

                      background-color:#f5f7fa;
                      position: relative;
                      padding:5px 0 0 15px;
                      &:hover{
                          background-color:white;
                          cursor: pointer;
                      }

                      

                          .Icon{  
                            float:left;
                            
                           
                            width:24.32%;
                            height:40px;
                            
                           
                            text-align:center;
                            line-height:35px;
                            position: relative;

                              .IconClass{
                                display:inline-block;

                                width:95%;
                                height:95%;
                                 
                              }

                              
                              

                          }

                          .IconName{
                            float:left;
                            width:30.4%;
                            height:40px;
                           //background-color:blue;
                            text-align:center;
                            line-height:40px;
                            font-size:16px;
                            color:#4b5262;
                            font-weight:bolder;

                          }

                          .IconValue{
                              width:36.48%;
                              float:left;
                              //background-color:yellow;
                              height:40px;
                              text-align:left;
                              line-height:40px;
                              font-size:16px;
                              //color:#19d147;
                              font-weight:bolder;
                              span{
                                  font-size:26px;
                                  margin-right:3px;
                                  display:inline-block;
                              }

                          }

                      }    

                    }
                   
                }

                

      .HardGraph{
        width:82%;
        background-color:#fcfcfc;
        height:100%;
        float:left;
        position: relative;

          .CPUGraph{
              position: relative;
              height:100%;
                        
              #Test{
                position:absolute;
                width:100%;
                //background-color:blue;
                            
                top:-10px;
                  }
              }

          .RAMGraph{
              position: relative;
               height:100%;
                        
              #Test2{
                  position:absolute;
                  width:100%;
                            
                top:-10px;
                   }
                }
      }
                  
    }


    .StatTable{
        position: relative;
        height:64%;
        //background-color:red;

        .tableHeadClass{
            text-align:center;
            background-color:#b7c3cd;

            autoScroll{
                height:160px;
            }

            .processDangerClass{
                display:inline-block;
                width:50px;
                height:15px;
                color:white;
                padding:0px;
                background-color:#fd446d;
            }

        }
    }

    .select{
        position: relative;
        cursor: pointer;
       
        .showAll{
            color:#95cdfa;
            padding-left:20px;
            font-size:16px;
            span{
                margin-right:10px;
            }
            

        }
  }

  .noresponsestyle{
  color:yellow;
  } 


  .normalColor{
    color:#19d147;

  } 
  .abnormalColor{
    color:#ed5565;
  }
</style>