import Vue        from 'vue'
import Vuex       from 'vuex'
import actions    from './actions'
import mutations  from './mutations'
//import mutations  from './mutations'
import getters    from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    collapsed:false,
    breadListState:[
      {name:'设备管理',path:'/devicemanage'},
      {name:"",path:'/devicemanage/devicedetails'},
      {name:'',path:'/devicemanage/devicedetails/smart'}
    ],
    deviceDetailPath:null,
      changeNav:false,
   
    },
  getters,
 mutations: {
    breadListStateAdd(state,obj){
      state.breadListState.push(obj);
    },
    breadListStateRemove(state,num){
      state.breadListState=state.breadListState.slice(0,num);
    },
    CHANGEBREAD(state,name){
        state.breadListState[1].name=name.first;
        state.breadListState[2].name=name.second;
       //state.breadListStatep[2].path=name.path;
    }
  },

  actions
})
export default store
