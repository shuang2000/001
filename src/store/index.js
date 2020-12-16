import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        name:'helloVueX'
    },
    mutations: {
        // 更新sid
        setSid: function(state, payload){
          state.name = payload;
        },
        
    },
    
    //对state中的成员加工后传递给外界
    getters: {
        fullinfo(state,getters){
            return state.name+'岁'
        }
    },
})

export default store