import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from  '../views/home/Home'
import AllScan from '../views/allscan/AllScan'

import Devicemanage from  '../views/devicemanage/devicemanage'

import deviceDetail from '../views/devicemanage/deviceDetail'
import expandMgmt from '../views/devicemanage/details/expandsMgmt'
import SoftMgmt from '../views/devicemanage/details/softMgmt'
import sysInfo from '../views/devicemanage/details/sysInfo'
import TempMgmt from '../views/devicemanage/details/tempMgmt.vue'
import Smart from '../views/devicemanage/details/smart'
import baseInfo from '../views/devicemanage/details/baseinfo.vue'

import ExceptEvent from '../views/exceptevent/ExceptEvent'
import Statistical from '../views/statistical/StatisticalAnalysis'
import SysSetting from '../views/syssetting/SysSetting'
Vue.use(Router)

const router= new Router({
  //mode: 'history',
  // routes: [
  //     // {
  //     //   path: '/',
  //     //   name: 'Home',
  //     //   component: Home
  //     // },
  //   {
  //     path:'/allscan',
  //     component:AllScan,
  //     name:"总览",
  //     iconCls:'el-icon-menu',
  //     leaf:true,//只有一个节点,
  //      // children:[
  //      //    // {path:'/allscan',component:AllScan,name=}
  //      // ]
  //   },
  //   {
  //     path:'/statistical',
  //     component:Statistical,
  //     name:"分析统计",
  //     iconCls:'el-icon-message',
  //     leaf:true,//只有一个节点,
  //      // children:[
  //      //   // {path:'/allscan',}
  //      // ]
  //   },

  //   {
  //     path:'/exceptevent',
  //     component:ExceptEvent,
  //     iconCls:'el-icon-message',
  //     name:"异常事件",
  //     leaf:true,//只有一个节点,
  //      // children:[
  //      //   // {path:'/allscan',}
  //      // ]
  //   },
  //   {
  //     path:'/devicemanage',
  //     component:Devicemanage,
  //     iconCls:'el-icon-menu',
  //     name:"设备管理",
  //     leaf:true,//只有一个节点,
  //     hideen:false,
  //        // children:[
  //        //   {
  //        //    path:'/devicedetails',
  //        //    component:deviceDetail,
  //        //    iconCls:'el-icon-menu',
  //        //    name:"设备详情",
  //        //    leaf:true,//只有一个节点,
  //        //    hideen:true,

  //        //     children:[
  //        //       {
  //        //           path:'/devicedetails/expandmgmt',
  //        //           component:expandMgmt,
  //        //           name:"外设管理",
  //        //           hideen:false,
                    
  //        //         },
  //        //         {
  //        //           path:'/devicedetails/softmgmt',
  //        //           component:SoftMgmt,
  //        //           name:"软体监控",
                    
  //        //         },
  //        //         {
  //        //           path:'/devicedetails/sysInfo',
  //        //           component:sysInfo,
  //        //           name:"系统运行资讯",
                    
  //        //         },
  //        //         {
  //        //           path:'/devicedetails/tempmgmt',
  //        //           component:TempMgmt,
  //        //           name:"温度管理",
                    
  //        //         },
  //        //     ]
  //        //  },
  //        // ]
  //   },

  //   {
  //       path:'/devicemanage/devicedetails/',
  //       component:deviceDetail,
  //       iconCls:'el-icon-menu',
  //       name:"设备详情",
  //       leaf:true,//只有一个节点,
  //       hideen:true,
  //       //redirect:'/devicedetails/expandmgmt/',

  //        children:[
  //          {
  //              path:'/devicemanage/devicedetails/expandmgmt/',
  //              component:expandMgmt,
  //              name:"外设管理",
                
  //            },
  //            {
  //              path:'/devicemanage/devicedetails/softmgmt',
  //              component:SoftMgmt,
  //              name:"软体监控",
                
  //            },
  //            {
  //              path:'/devicemanage/devicedetails/sysInfo',
  //              component:sysInfo,
  //              name:"系统运行资讯",
                
  //            },
  //            {
  //              path:'/devicemanage/devicedetails/tempmgmt',
  //              component:TempMgmt,
  //              name:"温度管理",
                
  //            },
  //        ]
  //   },

  //   {
  //     path:'/smart',
  //     component:Smart,
  //     name:'S.M.A.R.T资讯',
  //     leaf:true,
  //     hideen:true,
  //   },
  //   {
  //     path:'/baseinfo',
  //     component:baseInfo,
  //     name:'基础资讯',
  //     leaf:true,
  //     hideen:true,
  //   },

  //   {
  //     path:'/syssetting',
  //     component:SysSetting,
  //     iconCls:'el-icon-message',
  //     name:"系统设置",
  //     leaf:true,//只有一个节点,
  //      // children:[
  //      //   // {path:'/allscan',}
  //      // ]
  //   },

  // ]




   routes: [
  //     {
  //       path: '/',
  //       name: 'Home',
  //       component: AllScan
  //     },

    {
      path:'/',
      redirect:'/devicemanage',
      component:Home,
      name:"",
      iconCls:'iconfont icon-zonglan',
      leaf:true,//只有一个节点,
        children:[
            {path:'/allscan',component:AllScan,name:"总览"}
        ]
    },
    {
      path:'/',
      component:Home,
      name:"",
      iconCls:'iconfont icon-tongjifenxi',
      leaf:true,//只有一个节点,
        children:[
            {path:'/statistical',component:Statistical,name:"统计分析"}
        ]
    },
    {
      path:'/',
      component:Home,
      iconCls:'icon iconfont icon-yichangshijianliebiaocopy',
      name:"",
      leaf:true,//只有一个节点,
        children:[
           {path:'/exceptevent',component:ExceptEvent,name:"异常事件"}
        ]
    },
    {
      path:'/devicemanage',
      component:Home,
      redirect:'/devicemanage',
      iconCls:'iconfont icon-shebeiguanli',
      name:"设备管理",
      leaf:true,//只有一个节点,
       children:[
         {path:'/devicemanage',component:Devicemanage,name:"设备管理"},
         
         {
             path:'/devicemanage/devicedetails',
             components:{default:deviceDetail,
                          smart:Smart,
                          baseinfo:baseInfo,},
             name:"设备详情",
             

             children:[
             {
               path:'/devicemanage/devicedetails/expandmgmt/',
               component:expandMgmt,
               name:"外设管理",
                
             },
             {
               path:'/devicemanage/devicedetails/softmgmt',
               component:SoftMgmt,
               name:"软体监控",
                
             },
             {
               path:'/devicemanage/devicedetails/sysInfo',
               component:sysInfo,
               name:"运行资讯",
                
             },
             {
               path:'/devicemanage/devicedetails/tempmgmt',
               component:TempMgmt,
               name:"温度管理",
                
             },


           ] 


          },

           {
            path:'/devicemanage/devicedetails/smart',
            component:Smart,
            name:'S.M.A.R.T资讯',
            leaf:true,
            hideen:true,
            },

             {
              path:'/devicemanage/devicedetails/baseinfo',
              component:baseInfo,
              name:'基础资讯',
              leaf:true,
              hideen:true,
            },
       ],


    },


    {
      path:'/',
      component:Home,
      iconCls:'icon iconfont icon-icon-test-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy-copy',
      name:"",
      leaf:true,//只有一个节点,
       children:[
         {path:'/syssetting',component:SysSetting,name:"系统设置"}
       ]
    },




  ]
})

export default router;
