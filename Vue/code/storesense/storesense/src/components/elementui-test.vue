<template>
  <div>
    <div>
      <h2>vue中事件处理</h2>
      <button @click="warn('Form cannot be submitted yet.',$event)">Submit</button>
    </div>
    <br>
        <div>
          <h2>父组件向子组件传递</h2>
          <Son :title="msg" :lifetime="lifetime" :num="num" :obj="obj"  @sendmsg="getMsg"/>
          <button @click="changeMsg">修改数据</button>
          <p>receive:{{msg}}</p>
        </div>

    <hr>
    <div>
      <h2> slot</h2>
      <Son>
        <p slot="slot1" class="p1"> 传入1</p>
        <p slot="slot2" slot-scope="props">传入2 <br> {{props.text}}</p>
        <div>默认</div>
      </Son>
    </div>

  </div>

</template>

<script>
  import Son from './son/son'
    export default {
        name: "elementui-test",
     components:{
          Son
      },
      data(){
          return {
            msg:'father',
            lifetime:'dfdfdg',
            num:2,
            obj:{
              name:"li",
              age:13
            }

          }
      },
      methods:{
          warn(message,event){
            if(event)
              event.preventDefault();
            alert(message);

          },
        changeMsg(){
            this.msg="after father";
        },
        getMsg(data){
            this.msg=data;
            console.log(data)
        }
      }

    }


</script>

<style scoped>

</style>
