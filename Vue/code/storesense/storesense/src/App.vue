<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
                <keep-alive>
      <router-view></router-view>
      </keep-alive>
     <!-- <Home/> -->
   
    </transition>
    <!--<router-view/>-->
  </div>
</template>

<script>
import Home from "./views/home/Home";
export default {
  name: 'App',
  components: {Home},
  methods:{

  },
      created(){
    window.addEventListener('popstate',()=>{
      sessionStorge.setItem('location',null);
    },false);

  },

}
</script>

<style lang="scss" scoped>
 /*
 #app {
 // font-family: Microsoft YaHei,'Avenir', Helvetica, Arial, sans-serif;
 font-family:Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;margin-top: 60px;
  background-color: aliceblue;
  height:100%;
}
*{
  padding:0px;
  margin:0px;
  border:0px;
}
*/
*{
 font-family:Microsoft YaHei;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
