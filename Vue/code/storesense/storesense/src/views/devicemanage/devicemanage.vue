<template>
    <div class="box">
        <el-row class="container" >
            <el-col class="toolbar" :span="24">
                 <label for=""  style="color:#4b5262">设备分组类别
                      <!-- <el-select v-model="category"  collapse-tags style="margin:0 20px;float:right;width:150px;" class="el-input" placeholder="" size="mini" @change="SelectCategory" 
                      >
                          <el-option v-for="item in firstCategory" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select> -->

                        <select v-model="category" class="selectOpt" @change="SelectCategory" >
                          <option v-for="item in firstCategory":value="item.value">{{item.label}}</option >
                        </select>
                        <i class="iconfont icon-down-trangle" @click="changecategory"></i>
                       
                </label>
                   
                <label for="" style="color:#4b5262">子分组类别
                  <!--   <el-select v-model="subcategory"  collapse-tags style="margin-left:20px;float:right;width:150px" placeholder="" size="mini" @change="SelectSubCategory">
                        <el-option v-for="item in subCategory" :key="item.value" :label="item.label" :value="item.value">
                        </el-option >
                    </el-select> -->
                     <select v-model="subcategory" class="selectOpt" @change="SelectSubCategory">
                          <option v-for="item in subCategory":value="item.value" style="border:none">{{item.label}}</option >
                        </select>
                        <i class="iconfont icon-down-trangle" ></i>
                </label>

                <!-- <el-input
                    placeholder=""
                    prefix-icon="el-icon-search"
                    v-model.lazy="keywords" class="search" size="mini" @change="getDeviceListByKeywords"trigger-on-focus placeholder="请输入查找关键字">
                  </el-input> -->
                  <div class="searchBox">
                    <input type="text" v-model="keywords"placeholder="请输入查找关键字" class="search" @change="getDeviceListByKeywords">
                    <i class="iconfont icon-sousuo"></i>
                  </div>
            </el-col>
            <el-col class="toolbar" style="margin:0 15px;":span="24">
                <el-button type="primary" size="medium"  class="remoteButton"><i class="iconfont icon-screenshotjt"></i>远程截图</el-button>
                 <el-button type="primary" size="medium"  class="remoteButton" ><i class="iconfont icon-yuanchengzhuomian"></i>远程桌面</el-button>
                   <!--  <el-dropdown  type="primary" @command="handleClick" size="medium" class="powerButton" >
                      电源管理
                     
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item  v-for="(item,index,key) in powerStatusList" :key="item.en"style="width:115px;padding-left:10px;background-color:#eee" :command="item.en" >{{item.zh}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
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

                  </el-col>
                    <el-col :span="24" class="toolbar" style="margin:0 15px;padding:0;height:64%" >
                      <el-table
                          :data="deviceListT"
                          style="width: 100%;"
                          
                          highlight-current-row
                          @row-click="powerMgmt"
                          
                          :max-height="tableHeight+'px'"
                          :height="tableHeight+'px'"
                          empty-text=" "
                          :row-style="{height:60+'px',padding:0+'px' ,color:'#4b5262'}"
                        :cell-style="{padding:0+'px'}">
                          <el-table-column
                            label="连接状态"
                            width="180px"
                            header-align="center"
                            align="center"
                            sortable>
                           <template slot-scope="scope">
                                <i :class="scope.row.status=='Connected'?'deviceNormal':'deviceAbnormal'"class="iconfont icon-shebeizhuangtai"></i>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="设备名称"
                            width=""
                            align="left"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="type"
                            label="型号"
                           align="left"
                            sortable>
                          </el-table-column>
                          <el-table-column
                            prop="groupName"
                            label="所在分组"
                            align="left"
                            sortable>
                          </el-table-column>
                          <el-table-column
                           
                            label="状态显示"
                            width="240"
                            header-align="left"
                            align="left">
                            <template slot-scope="scope" >
                                <i class="iconfont icon-waishe" style="display:in-line-block;width:50px;text-align:left;font-size:26px" :class="scope.row.status=='Connected'?'deviceNormal':'deviceUnConnect'"></i>
                                <i class="iconfont icon-ruanjian" style="display:in-line-block;width:50px;text-align:left;font-size:26px" :class="scope.row.status=='Connected'?'deviceNormal':'deviceUnConnect'"></i>
                                <i class="iconfont icon-zhuji" style="display:in-line-block;width:50px;text-align:left;font-size:26px" :class="scope.row.status=='Connected'?'deviceNormal':'deviceUnConnect'"></i>
                                <!--  <i class="iconfont icon-icon-test" style="display:in-line-block;width:40px;font-size:30px" :class="scope.row.status=='Connected'?'deviceNormal':'deviceAbnormal'"></i> -->
                                
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="option"
                            label="操作"
                            width="120"
                            align="left"
                            >
                            <template slot-scope="scope">
                                <i class="iconfont icon-gengduo"style="font-size:20px" @click="toDeviceDetail(scope.row)"></i>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-col>

                      <el-col :span="24"class="toolbar pagination" style="margin:0 15px;height:12%">
                        <el-pagination background small 
                         :page-sizes="[10, 20, 50, 100]"
                         @size-change="sizeChange"
                         @current-change="currentChange"
                        layout="jumper,total, prev, pager, next,sizes"  :page-size="sizeNum" :total="total" style="float:right;">
                        </el-pagination>
                      </el-col>
                      
         
        </el-row>
        <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>

    </div>
</template>

<script>
  import api  from '../../api/index';
  import axios from 'axios'
  import util from '../../common/util.js'


    export default {
        name: "devicemanage",
        data(){
            return { 

                tableHeight:window.innerHeight*0.63,//表格高度            
                category:"",//一级选择框绑定数据
                subcategory:"",//二级选择框绑定数据
                powerItemShow:false,//电源列表项是否显示
                powerSelect:'',//电源列表项选中
                showcategory:false,//一级分类项是否显示

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

                  //二级选择框显示数据
                  subCategory:[{
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

                  //电源状态列表
                  powerStatusList:[
                    // {
                    //   no:1,
                    //   statu:'开机'
                    // },
                    // {
                    //   no:2,
                    //   statu:'关机'
                    // },
                    // {
                    //   no:3,
                    //   statu:'重启'
                    // },
                    // {
                    //   no:4,
                    //   statu:"暂停"
                    // },
                    // {
                    //   no:5,
                    //   statu:"wol"
                    // }
                  ],

                  powerStatus:true, //设备电源状态

                  //搜索框关键字
                  keywords:'',

                  page:0,//当前页
                  sizeNum:10,//每页数量
                  total:0,//设备总数
                  //设备成功状态
                  statusSuccess:{
                    color:'#7FFF00',
                    fontSize:30+'px',

                  },
                  //设备失败状态
                  statusFailure:{
                   color:'#ff4500',
                    fontSize:30+'px',
                  },


                  device:null,//设备
                  // 定时器
                  timeid:0,
                  //下拉选择项是否显示
                  showOpt:false,




                  //设备列表
                  //测试
                  deviceListT:[],
                  deviceList:[
                    {
                      status:"Connected",
                      name:"AXA-YINGHUIPC1",
                      type:"IAC-13",
                      groupName:"san",
                      except:[
                        {
                          id:1,
                          sta:'y',
                          
                        },
                        {
                          id:2,
                          sta:'n',
                          
                        },
                        {
                          id:3,
                          sta:'n',
                          
                        },
                        {
                          id:4,
                          sta:'y',
                         
                        },

                      ],
                      option:"false"
                    },

                    {
                      status:"Connect",
                      name:"AXA-YINGHUIPC2",
                      type:"IAC-11",
                      groupName:"er",
                      except:[
                        {
                          id:1,
                          sta:'n',
                          
                        },
                        {
                          id:2,
                          sta:'y',
                          
                        },
                        {
                          id:3,
                          sta:'y',
                          
                        },
                        {
                          id:4,
                          sta:'y',
                         
                        },

                      ],
                      option:"false"
                    },
                    {
                      status:"Connected",
                      name:"AXA-YINGHUIPC3",
                      type:"IAC-12",
                      groupName:"yi",
                      except:[
                        {
                          id:1,
                          sta:'n',
                          
                        },
                        {
                          id:2,
                          sta:'y',
                          
                        },
                        {
                          id:3,
                          sta:'n',
                          
                        },
                        {
                          id:4,
                          sta:'y',
                         
                        },

                      ],
                      option:"false"
                    }
                  ],

                  

            }
            //return
        },//data


    
        methods:{
          //表格高度自适应
          
          
          //电源按钮点击事件
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
            console.log(item)
            console.log("it")
            console.log(index+' index');
            this.powerItemShow=false;

          },
          //分页中当前页改变
          currentChange(val){
            this.page=val-1;
            this.getDeviceList();
          
          },
          //分页中每页显示数量改变
          sizeChange(val){
            this.sizeNum=val;
            this.page=this.page-1;
            this.getDeviceList();

          },
          //显示下拉框
          showOptions(){
            this.showOpt=true;
          },
          hiddenOptions(){
             this.showOpt=false;

          },

          //获取设备列表
          getDeviceList(){
            // let para={pageNum:this.page,pageSize:this.sizeNum}
            this.page=this.page>=0?this.page:0;
            let para={filter:{page:this.page,size:this.sizeNum}}
            //console.log(para);
            api.getDeviceList(para).then((res)=>{
              
              this.deviceListT=res.data.content;
              this.deviceListT.forEach((item)=>{
                item.groupName="1";
              });
              this.total=res.data.totalElements;
              console.log(res.data);


             
             
             console.log(window.innerHeight+' ');

            }).catch(err=>{
              console.log("cuo"+err);
            });

          },
          //获取一级分类
          getCategorys(){
            api.getCategorys().then(res=>{
              console.log("cate1");
              console.log(res);
            })
          },
          //获取子分类
          getSubCategory(parentID){
            let para={id:parentID};

            api.getSubCategory(para);
          },

          //根据类别筛选设备
          getDeviceListByCategory(){
            let para={pageNum:this.page,pageSize:this.sizeNum,categoryID:this.subcategory};
            api.getDeviceListByCategory(para);
          },
          //一级分类被选择，获取二级分类
          SelectCategory(value){ 
            console.log('sel');
            console.log(this.category)

            //this.getSubCategory(this.category);
          },
          //显示一级分类项
          changecategory(){
            this.showcategory=true;
            console.log("show");
          },
          //二级分类被选择，筛选
          SelectSubCategory(){
            this.getDeviceListByCategory();
          },
          //根据关键字查找
          getDeviceListByKeywords(){
            let para={like:{agentId:this.keywords,agentIp:this.keywords,name:this.keywords,type:this.keywords,status:this.keywords,serverId:this.keywords}};
            api.getDeviceListByKeywords(para).then((res)=>{
              
              this.deviceListT=res.data.content;
              this.total=res.data.totalElements;
              console.log(res.data);
            }
              ).catch(err=>{
              console.log(err);
            })
          },

          //获取电源状态范围
          getPowerscope(){
             let para={agentId:this.device.agentId};
            //let para={agentId:"00007427EAE40EF7"};
            
            api.getPowerscope(para).then(res=>{
              if(res.data!=null){
              this.powerStatusList=util.formatter(res.data);
              
              console.log(this.powerStatusList);
             }else{
              console.log('error Power');
             }

            });


          },
          //设置设备电源状态
          doAction(val){
            // let para={agentId:this.device.agentid,action:val};
            let para={agentId:"00007427EAE40EF7",action:val};
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
          //选中设备列表一行时触发事件
          powerMgmt(val){
            //this.currentRow=val;
            //this.device=Object.assign({},this.currentRow);
            this.device=val;
            console.log(this.device);
            this.getPowerscope();
            // this.toDeviceDetail();

          },

          toDeviceDetail(val){

             this.device=val;
            sessionStorage.setItem('device', JSON.stringify(this.device));
            this.$router.push({name:"设备详情",params:{device:this.device }});
             this.$route.matched[1].name=this.device.name
            //console.log(this.$route.matched[1].name);
           
            // this.$router.push({path:'/deviceDetail'})
          },
          

        },
        mounted(){
          
          this.getDeviceList();
          if(!this.timeid){
           this.timeid=window.setInterval(this.getDeviceList,60*1000);
          }
          
          //console.log(this.$route.matched);


          //this.getCategorys();
          // this.getPowerscope();
           window.sessionStorage.setItem('location',null);
        },
       
       
        beforeDestroy(){
          window.clearInterval(this.timeid);

        }

    }//export
</script>

<style scoped lang="scss">
*{
    margin:0;
    padding: 0;
    border:0;
    color:#4b5262;
    text-align:center;
    vertical-align:middle;
    font-family:Microsoft YaHei;

  }
  .box{
    position: relative;
    height:100%;
    width:100%;
  .container{
    position: relative;
    top: 0px;
    padding: 0;
    left: 0px;
   width:100%;
    height:100%;
    /*background-color: green;*/

    .toolbar{
        margin: 15px;
        height:60px;
        width:97.46%;
        overflow:visible;


        
       text-align:left;
        background-color:#fff;
        color:#4b5262;
        padding:0px 10px 0 40px;
        position: relative;
        label{
            vertical-align:middle;
            line-height:26px;
            margin:15px 20px 0 20px;
            color:#4b5262!important;
            position: relative;
            


            .selectOpt{
              width:150px;
              height:26px;
             // border:0.5px solid blue;
              margin:0px 30px 0 30px;
              appearance: none;
              border-radius:5px;
              line-height:26px;
              text-align:center;
              padding-left:40px;
              background-color:#f0f5f8;
                -webkit-appearance: none;
                -moz-appearance: none;
                outline: none;
                option{
                  border-color:#eee;
                }
                

            }

            .icon-down-trangle{
              display:inline-block;
              position: absolute;

              right:40px;
              top:2px;
              font-size:18px;
              color:#c0c4cc;
            }

            
             
        }


        

        .searchBox{
          position: relative;
          top:-27px;

          .search{
              width:200px;
              height:30px;
              float:right;
              line-height:30px;
              
              margin-right:15px;
              background-color:#f0f5f8;
              border-radius:30px;
              outline:none;


          }
          .icon-sousuo{
            position: absolute;
            right:190px;
            top:5px;
            color:#c0c4cc;
          }

        }

        .remoteButton{
            float:right;
              
            width:110px;
            font-size:14px;
            color:#fff;
            font-weight:bold;
            margin:15px;

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

        .powerButton{
            background-color:#409EFF;
            display:inline-block;
            width:110px;
            height:33px;
            border-radius:4px;
            margin-top:15px;
            margin-right:20px;
            line-height:30px;
            float:right;
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
               width:30px;
               text-align:right;

            }
            
        }

        .powerItemList{
          display:inline-block;
          width:110px;
          position: absolute;
          background-color:#fff;
          top:47px;
          right:310px;
          z-index:1;


        }
        .powerItemListItem{
          list-style-type: none;
          color:#4b5262;
          cursor:pointer;
         background-color:#f0f5f8;
          &:hover{
            background-color:#eee;
          }
        }

        

       
      
    }

    .pagination{
      background-color:#fff;
      padding:3em 0 1em 0;
      border-radius:0px;
    }
    el-table-column{
      &:hover{
        background-color:#41a1f9;
      }
    }
   


    .current-row{
      color:red;
    }



   .deviceNormal{
    font-size:30px;
    display:inline-block;
    width:30px;
    color:#19d147;
   }
   .deviceUnConnect{
    font-size:30px;
    display:inline-block;
    width:30px;
    color:#c2c8d4;
    
   }

   .deviceAbnormal{
    font-size:30px;
    display:inline-block;
    width:30px;
    color:#ed5565;
   }


  }

  .el-button{
              height:33px!important;
            }

 }
</style>


