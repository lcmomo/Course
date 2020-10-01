<template>
   <div>
     <el-row class="container">
       <el-col :span="24"class="header" style="">
          <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
            <div class="logoIcn">
              <img :src="logoImg" alt="">
            </div><span class="logoName">{{collapsed?'':sysName}}</span>
          </el-col>
           <el-col :span="1">
             <div class="tools" @click.prevent="collapse">
                <span class="icon-bar"></span>
                <span class="triangle_border_left">
                  
                </span>
                <span class="icon-bar icon-bar-middle"></span>
                <span class="icon-bar"></span>
      
             </div>
         </el-col>

         <el-col :span="13">
           <!-- <div><strong class="title">{{$route.name}}</strong></div> -->
           <el-breadcrumb separator="|" class="breadcrumb-inner" v-if="!changeBread">
              <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="item.path" class="breadcrumb-item":to="{ path:item.path}"
              v-if="index!=$route.matched.length-1" >
                <span style="color:#fff;" >{{ item.name }}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
            <el-breadcrumb separator="|" class="breadcrumb-inner" v-if="changeBread">
              <el-breadcrumb-item v-for="(item,index) in $store.state.breadListState" :key="item.path" class="breadcrumb-item":to="{ path:item.path}"
             >
                <span style="color:#fff;" >{{ item.name }}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>

         </el-col>
         <el-col :span="2" style="padding-right:0px">
           <div class="badg" >
           <i class="el-icon-bell"></i><el-badge is-dot class="item" v-show="this.warnMessage"></el-badge ></div>
         </el-col>
         <el-col :span="3" >
           <div class="userInfo">
             <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" alt="用户头像" /> 
                  {{sysUserName}}<i class="el-icon-arrow-down el-icon--right" style="font-weight:bolder;display:inline-block;
                   padding-left:5px;" ></i>
                </span>
                  <el-dropdown-menu slot="dropdown" class="dropdown">
                    <el-dropdown-item style="width:120px;padding-left:20px">我的消息</el-dropdown-item>
                    <el-dropdown-item style="width:120px;padding-left:20px">设置</el-dropdown-item>
                    <el-dropdown-item style="width:120px;padding-left:20px" @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
           </div>
         </el-col>
       </el-col>
       <el-col :span="24" class="main">
          <aside :class="collapsed?'aside-collapse-width':'aside-width'">
             <!--导航菜单    -->
             <!--  <el-menu id="nav-menu" :default-active="$router.path" 
              background-color="#25334a" text-color="#eee" 
              class="el-menu-vertical-demo" @open="handleopen"
               @close="handleclose" @select="handleselect"
                       unique-opened router :collapse="collapsed"
                       :collapse-transition="false">
                <template v-for="(item,index) in $router.options.routes" v-if="!item.hideen">
                  <el-menu-item :index="item.path" :key="item.path" class="el-menu-item" ><i :class="item.iconCls"></i><span slot="title" >{{item.name}}</span>
                  </el-menu-item>
                </template>
              </el-menu> -->
               <!--  <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                  <el-submenu :index="index+''" v-if="item.leaf">
                    <template slot="title"><i :class="item.iconCls"></i> {{item.name}}</template>
                    &lt;!&ndash;<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>&ndash;&gt;
                  </el-submenu>
                  <el-menu-item v-if="!item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                </template> -->
              <!--  -->

                  <el-menu :default-active="$route.path" class="el-menu-vertical-demo"  text-color="#eee" @open="handleopen" @close="handleclose" @select="handleselect" 
               unique-opened router :collapse="collapsed"
               id="nav-menu"
               :collapse-transition="false" style="border:0px">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                      <el-submenu :index="index+''" v-if="!item.leaf">
                        <template slot="title">{{collapsed=='true'?'':item.name}}</template>
                        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="child.hidden">{{collapsed?'':child.name}}</el-menu-item>
                      </el-submenu>
                      <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"
                      ><i :class="item.iconCls" style="display:inline-block;width:60px;heigtht:20px;font-size:25px;color:#fff;" :style="{fontSize:item.children[0].name=='系统设置'?'18px':'25px'}"></i>{{collapsed?'':item.children[0].name}}</el-menu-item>
                    </template>
            
                  </el-menu> 
          </aside>
          <section :class="collapsed?'section-collapse':''">
            <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              
                <router-view></router-view>

            </transition>
          </el-col>

          <el-col :sapn='24'>
         <footer class="footerInfo">
           <span>Version 1.0.1&copy; 2016-2018 Advantech Corp. All rights reserved</span>
         </footer>
       </el-col>
          </section>
       </el-col>
       
       
     </el-row>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
      name: "Home",
      data(){
          return{
            sysName:'WISE-PaaS/SIOT',
            collapsed:false,
            sysUserName:'Liliuchao',
            sysUserAvatar:'',
            warnMessage:true,
             breadlist: '', // 路由集合
             changeBread:false,
             Bread:[],
             logoImg:'./static/img/logo.png'
          }
      },
      methods:{
        onSubmit() {
          console.log('submit!');
        },
        handleopen() {
          //console.log('handleopen');
        },
        handleclose() {
          //console.log('handleclose');
        },
        handleselect(key, keyPath){

        },
        collapse:function(){
        this.collapsed=!this.collapsed;
        this.$store.state.collapsed=this.collapsed;
        this.$PubSub.publish('COLLAPSECHANGE',{msg:'折叠改变',collapsed:this.collapsed})
      },


     

            ...mapGetters(['getBread']),



      },

      created() {

        this.sysUserAvatar='./static/img/admin.png';
        this.Bread=this.$store.state.breadListState;
        this.$PubSub.subscribe("BreadChange",(event,data)=>{
        this.changeBread=data.changeBread;
        console.log(data.msg);


        })
       // this.getBreadcrumb()
      },
      // https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532594137861&di=f2c7138aec8d67012ebb59b054852f79&imgtype=0&src=http%3A%2F%2Fimage.bubuko.com%2Finfo%2F201806%2F20180613132703477855.png

       watch: {
            // $route () {
            //     this.getBreadcrumb();
            // }

      // getBread(){
      //     this.changeBread=true;
      //     console.log("bre");
      //   }
        
},
mounted(){
  console.log(this.getBread);

    }
}
</script>

<style scoped lang="scss" >
  $color-primary:#20a0ff;
  *{
    margin:0;
    padding: 0;
    border:0;
    font-family:Microsoft YaHei;
  }
  .container{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height:100%;
    padding:0;
    

    .header{
      
      height:60px;
     position: relative;
      height:100%;
      line-height: 60px;
      background:url('../../../static/img/menu_choose.jpg')no-repeat;
      background-color:#42b1f9;

     
      color:#fff;
      .logo{
        height:60px;
        line-height:60px;
        width:17.04%;

        font-size:19px;
        border-right: 1px;
        border-color:rgba(238,241,146,0.3);
        border-right-style: solid;
        color:#fff;
        
        background-color:#20304a;
        text-align:right;
        padding-right:10px;
        .logoIcn{
          display:inline-block;
          width:64px;
          height:60px;
          //background-color:red;
          position: relative;
          float:left;
          img{
            width:50px;
            height:50px;
            left:6px;
            top:5px;
            position: absolute;
          }
        }
        .logoName{
          display:inline-block;
          color:#fff;
          height:60px;
          line-height:60px;
          width:70%;
          text-align:left;
        }

      }

      .logo-width{
        width:16.9%;
      }
      .logo-collapse-width{
        width:64px;
      }

      .tools{
        padding: 15px;
       // background-color:red;
        width:60px;
        height:60px;
        line-height: 60px;
        cursor: pointer;
        border-right:1px solid rgba(255,255,255,0.2);
        float:left;
        position: relative;
        .icon-bar{
          display:block;
          width:100%;
          height:4px;
          background-color:#fff;
          margin:4px auto;
        }
        .icon-bar-middle{
          width:80%;
          margin-left:5px;
        }


        
           .triangle_border_left{
            display:block;
            width:0;
            height:0;
            border-width:5px 5px 5px 0;
            border-style:solid;
            border-color:transparent #fff transparent transparent;
            position:absolute;
            top:24px;
            left:13px;
        }
        
        
      }
     
      .breadcrumb-inner{

        float:left;

        .breadcrumb-item{
          padding:20px 0px 20px 10px;
          font-size:16px;
          line-height:20px;
          color:#fff !important;
           .is-link{
              color:#fff;
            }
        
        }


      }

      .badg{
        width:60px;
        height:60px;
        margin-left:60px;
        float:left;
        text-align:center;
        border-left:1px solid rgba(255,255,255,0.2);
        border-right:1px solid rgba(255,255,255,0.2);
        position: absolute;
        top:0;
        right:182px;

        .el-icon-bell{
          font-size:26px;
          vertical-align:middle;
          color:#fff;
        }
        .item{
          position:absolute;
          top:-5px;
          left:35px;
        }
      }

      .userInfo {
        width:180px;
        text-align: right;
       
        padding-right: 35px;
        float: left;
        position: absolute;
        top:0;
        right:0;

        margin-left:2px;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          font-weight:bold;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
        
      }
    }

    .main{
      display: flex;
      position: absolute;
      top:60px;
      bottom:0px;
      overflow: hidden;
      background-color: #f6f9fe;
      height:100%;
      aside{
          /*flex: 0 0 230px;*/
          width:16.9%;
          height:100%;
          float:left;
          //background-color:#25334a;
          background:url('../../../static/img/menu.jpg');

          .el-menu-vertical-demo{
              background:url('../../../static/img/menu.jpg');

              .el-menu{
                  border-right:0px !important;

                  .el-menu-item{
                      padding-left:20px!important;
                      text-align:left;
                      height:56px;
                      line-height:56px;
                      width:16.7%;

                      }

                      
                   
                      font-size:16px;

                    }
   
          } 
           .is-active{
              background-color:#1e2d4a;
              background:url('../../../static/img/menu_choose.jpg');
              color:#fff;

          }

          .el-menu-item:hover{
                        background-color:#222;
                      }



          }

         .aside-width{
          width:16.9%;
         background:url('../../../static/img/menu.jpg');
        }

        .aside-collapse-width{
        width:65px;
        over-flow:hidden!important;
        background:url('../../../static/img/menu.jpg');
      }
       

      section{
        width:83%;
        float:left;

      }
      .section-collapse{
        width:100%;
        height:100%;
      }

      .content-wrapper{
        /*background-color:#fff;*/
        height:93%;
      }

      .footerInfo{
        height:13%;
        padding:20px 0 0 60px;
        color:#777;
        //font-weight:bold;
        font-size:14px;




      }
    }
  }


 
</style >
