
export default {

    //格式化电源状态列表
    formatter:function(oldlist){
        var newList=[];
        for(let i=0;i<oldlist.length;i++){
            var obj={en:'',zh:''};
            if('shutdown'==oldlist[i]){
                obj.en=oldlist[i];
                obj.zh='关机';
                newList.push(obj);
            }
            else if('restart'==oldlist[i]){
                obj.en=oldlist[i];
                obj.zh='重新启动';
                newList.push(obj);
            }
            else if('wol'==oldlist[i]){
                obj.en=oldlist[i];
                obj.zh='待机';
                newList.push(obj);
            }
            else if('hibernate'==oldlist[i]){
                obj.en=oldlist[i];
                obj.zh='睡眠';
                newList.push(obj);
            }
            else if('suspend'==oldlist[i]){
                obj.en=oldlist[i];
                obj.zh='暂停';
                newList.push(obj);
            }

        }
        return newList;
    },

//显示器请求返回信息处理
    handleScreenData(screenList){
        let total=screenList.length;
        let abnomal=0,nomal=0;
        var result=[];
        for(let i=0;i<screenList.length;i++){
            if(screenList[i].mode=='0'){
                abnomal++;
            }else if(screenList[i].mode=='1'){
                nomal++;
            }


        }
        result[0]=total;
        result[1]=abnomal;
        result[2]=nomal;
        return result;


    },
    //获取一小时前数据的日期格式化

    getOneHourTime(para){
        let bt=new Date(new Date().getTime()-1*60*60*1000);
        let et=new Date();
        // para.beginTs= new Date(+new Date(bt)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
        // para.endTs=new Date(+new Date(et)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')

        para.beginTs= new Date(+new Date(bt)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
        para.endTs=new Date(+new Date(et)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
       return para;
    },

    //获取一天前数据的日期格式化
    getOneDayTime(para){
        let bt=new Date(new Date().getTime()-24*60*60*1000);
        let et=new Date();
        // para.beginTs= new Date(+new Date(bt)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
        // para.endTs=new Date(+new Date(et)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        para.beginTs= new Date(+new Date(bt)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
        para.endTs=new Date(+new Date(et)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
       return para;
    },


//时间格式化为两位数
  formatterTime(src){
   return src.toString().length==1?0+src.toString():src.toString();

},

    //时间戳格式化为时间字符
     getdate(ts){
        var result='';
        let t=new Date(ts);
        //result=t.getFullYear()+"-"+(t.getMonth()+1)+'-'+t.getDate()+' '+(t.getHours())+':'+t.getMinutes()+':'+t.getSeconds();
         //result=t.getFullYear()+"-"+(t.getMonth()+1)+'-'+t.getDate()+' '+(t.getHours()-8)+':'+t.getMinutes()+':'+t.getSeconds();
        // result=t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
          let hour=this.formatterTime((t.getHours()-8>=0?t.getHours()-8:0));
          let min=this.formatterTime(t.getMinutes());
          let sec=this.formatterTime(t.getSeconds());
          result=hour+':'+min+':'+sec;
        return result;

    },

    //数组中时间处理
    timestampToTime(list){
        for (let i=0;i<list.length;i++) {
            list[i].ts=this.getdate(list[i].ts);
            if(list[i].status=='1'){
                list[i].status='插入';
            }
            if(list[i].status=='2'){
                list[i].status='拔出';

            }
        };
        list=Array.reverse(list);
        return list;
    },
    //提取进程数量信息
    getProcessInfo(list){
        var results=[];
        var result=[],result2=[];
          if(list.every(item=>{
            item.IsActive==true;
        })){

             result.forEach(item=>{
            item.showBtn=false;
        })
            results[0]=result;
            results[1]=result2;
            return results;
          }else{



       
         result=list.filter((item)=>{
            return item.IsActive==false;
        })
        result2=list.filter((item)=>{
            return item.IsActive!==false;
        });
      
        result.forEach(item=>{
            item.showBtn=false;
        })
        result2.forEach(item=>{
            item.showBtn=false;
        })

        results[0]=result;
        results[1]=result2;
        return results;
    }

    },


//提取CPU和内存使用率
    getHardwareUSageList(list){
        list.forEach(item=>{
            item.ts=this.getdate(item.ts);
            item.availphysMemKB=Math.floor((1-parseInt(item.availPhysMemKB)/parseInt(item.totalPhysMemKB))*100);
        
        })

         return list;

    },

    //提取硬盘温度信息
    getHDDTempList(list){
        list.forEach(item=>{
            item.ts=this.getdate(item.ts);
                   
               

        })

         return list;  

    },


   changeProcess(value) {
    var num = value * 3.6;
    if(num < 180) {
        $('.right').css('transform', 'rotate(' + num + 'deg)');
    } else {
        $('.right').css('transform', 'rotate(180deg)');
        $('.left').css('transform', 'rotate(' + (num-180) + 'deg)');
    }
}


}