<template>
<div>
  <p>{{title}}-{{lifetime}}-{{num*2}}-{{obj.name+obj.age}}</p>
  <button @click='sendMsg'>子组件发送</button>

  <h2>slot</h2>
  <slot name="slot1"></slot>
  <slot name="slot2" text="我是插槽2传递的数据"></slot>
  <slot></slot>
</div>
</template>

<script>
    export default {
        name: "son",
      props:{
        title:[String,Number],
        lifetime:{
          type:String,
          required:true
        },
        num:{
          type:Number,
          required:true,
          default:5
        },
        obj:{
         type:Object,
          default:function () {
            return{
              name:"unknow",
              age:11
            }
          }
        }
      },
      data(){
          return {
            Msg:"I'm son",


          }
      },
      methods:{
          sendMsg(event){
            this.$emit('sendmsg',this.Msg);
          }
      }

    }
</script>

<style scoped>

</style>
