import axios from 'axios'
import qs from 'qs'

let base="https://api-sserver-wise-paas.wise-paas.com.cn/api/v1.0/";
let itempath='/api/v1.0'
let base1="/api/api/v1.0/"
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 获取设备列表
export const getDeviceList=params=>{
    // console.log("dev");
    // console.log(params);

     return axios.post(`${process.env.API_HOST}${itempath}/device/list`,params);
     
};
//获取一级分类
export const getCategorys=()=>{
    // console.log("get1cate");
      return axios.get(`${process.env.API_HOST}${itempath}/group/list`);
};
//获取二级分类
export const getSubCategory=(params)=>{
    console.log("get2cate");
    console.log(params);
    // return axios.get(`${base}/`,{params:params}).then(res=>res.data);
}
//根据分类筛选设备
export const getDeviceListByCategory=(params)=>{
    console.log("sel");
    console.log(params);
    //return axios.get(`${base}/`,{params:params}).then(res=>res.data);
}
//根据关键字查找
export const getDeviceListByKeywords=(params)=>{
    console.log("key");
    console.log(params);
     return axios.post(`${process.env.API_HOST}${itempath}/device/list`,params);
}

//获取电源状态范围
export const getPowerscope=(params)=>{
    // console.log("power");
    // console.log(params);
     return axios.get(`${process.env.API_HOST}${itempath}/power/scope`,{params:params}).then(res=>res.data);

}

//设置设备电源状态
export const doAction=(params)=>{
    console.log("resetDe");
    console.log(params);
     return axios.post(`${process.env.API_HOST}${itempath}/power/action`,params).then(res=>res.data);
    
}

//获取外设信息
export const getExpandsInfo=(params)=>{
  return axios.get(`${process.env.API_HOST}${itempath}/data/realtime`,{params:params}).then(res=>res.data);
}


// 获取历史数据
export const getHistoryData=(params)=>{
  return axios.post(`${process.env.API_HOST}${itempath}/data/history`,params).then(res=>res.data);
}