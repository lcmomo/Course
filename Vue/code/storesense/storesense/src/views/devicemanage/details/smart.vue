<template>
    <el-row class="smartContainer">
       <template>
          <el-table
            :data="tableData2"
            
            stripe
            highlight-current-row
            :header-cell-style="tableHeadClass"
            :cell-style="{height:'20px'}"
            border
            height="530px"
            max-height="530px"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="name"
              width=""
              header-align="center"
              align="center">
            </el-table-column>
            <el-table-column
              prop="type"
              label="type"
              width="180"
              header-align="center"
              align="center">
            </el-table-column>
            <el-table-column
              prop="flags"
              label="flags"
              header-align="center"
              align="center"
              width="175">
            </el-table-column>
            <el-table-column
              prop="worst"
              label="worst"
              width="175"
              header-align="center"
              align="center">
            </el-table-column>
            <el-table-column
              prop="value"
              label="value"
              width="175"
              header-align="center"
              align="center">
            </el-table-column>
            <el-table-column
              prop="vendorData"
              label="vendorData"
              header-align="center"
              align="center"
              width="">
            </el-table-column>
          </el-table>
</template>
    </el-row>
</template>
<script>
    export default{
        name:"smart",
            data(){
                return {
                    device:null,
                    tableData: [{
                      date: '2016-05-02',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                      date: '2016-05-04',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                      date: '2016-05-03',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1516 弄'
                    }],




                    tableData2:[
                      {
                        name:'HardwareECCRecovered',
                        type:195,
                        flags:6656,
                        worst:1,
                        value:1,
                        vendorData:'00005985315'
                      },
                      {
                        name:'Temperature',
                        type:194,
                        flags:8704,
                        worst:14,
                        value:39,
                        vendorData:'00E000000027'
                      },
                      {
                        name:'SeekErrorRate',
                        type:7,
                        flags:3840,
                        worst:60,
                        value:79,
                        vendorData:'000005F877EB'
                      },

                      {
                        name:'ReadErrorRate',
                        type:1,
                        flags:3840,
                        worst:63,
                        value:79,
                        vendorData:'000005985315'
                      },
                      {
                        name:'HardwareECCRecovered',
                        type:195,
                        flags:6656,
                        worst:1,
                        value:1,
                        vendorData:'00005985315'
                      },
                      {
                        name:'Temperature',
                        type:194,
                        flags:8704,
                        worst:14,
                        value:39,
                        vendorData:'00E000000027'
                      },
                      {
                        name:'SeekErrorRate',
                        type:7,
                        flags:3840,
                        worst:60,
                        value:79,
                        vendorData:'000005F877EB'
                      },

                      {
                        name:'ReadErrorRate',
                        type:1,
                        flags:3840,
                        worst:63,
                        value:79,
                        vendorData:'000005985315'
                      },
                      {
                        name:'HardwareECCRecovered',
                        type:195,
                        flags:6656,
                        worst:1,
                        value:1,
                        vendorData:'00005985315'
                      },
                      {
                        name:'Temperature',
                        type:194,
                        flags:8704,
                        worst:14,
                        value:39,
                        vendorData:'00E000000027'
                      },
                      {
                        name:'SeekErrorRate',
                        type:7,
                        flags:3840,
                        worst:60,
                        value:79,
                        vendorData:'000005F877EB'
                      },

                      {
                        name:'ReadErrorRate',
                        type:1,
                        flags:3840,
                        worst:63,
                        value:79,
                        vendorData:'000005985315'
                      },





                    ]


                }

            },
            methods:{
              //表头样式
              tableHeadClass({ row, column, rowIndex, columnIndex }){
                  if (rowIndex == 0) {
                      return 'background-color:#58616d;color:#fff;border:1px soild #fff;'
                  } else {
                      return 'height:20px;'
                  }

              },
              //单元格样式
              tableCellClass({ row, column, rowIndex, columnIndex }){
                return 'height:20px'
              }

            },
            mounted(){
                 this.device=JSON.parse(sessionStorage.getItem('device'));
                 //console.log(this.$route.matched)
                 
            },

             beforeDestroy(){
          this.$PubSub.publish("BreadChange",{msg:' 导航改变',changeBread:false})
        }
        
    }
</script>

<style lang="scss" scoped>
*{
  font-family:Microsoft YaHei;
}
.smartContainer{
    position: relative;
    padding:10px;
    margin:5px;
   // background-color:red;
    border:1px solid #eee;
    width:100%;
    height:550px;

}
    
</style>