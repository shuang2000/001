<template>
  <div class="common-content">
    <div class="row">
      <div class="col-sm-12" style="margin:0px;padding:0px;margin-bottom:20px;">
        <div style="background:#33CCCC;padding:10px;color:#fff;posiiton:relative">
          <!-- <h1>后台管理界面</h1> -->
          <div class="login" title="退出登录" style="position:absolute;right:20px;top:5px;cursor:pointer;" v-on:click="login()">
            <p style="width:50px;height:50px;" v-on:click="clickqiantai()">
              <img src="/static/image/logo.png" title="到前台页面" style="width:100%;border-radius:50%;">
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-2" style="padding:0px;" v-if="show">
        <menuView v-on:menuMessage='menuConMessage'></menuView>
      </div>
      <div class="col-sm-10" v-if="show">
        <keep-alive>
          <component :is="this.menu"></component>
        </keep-alive>
      </div>
    </div>
    <div class="tip" style="display:none;padding:10px;text-align:center;border:1px solid #ccc">您没有登录成功，请登录！<span v-on:click="clickLogin()" style="color:red;cursor:pointer">点击回到登录页面</span></div>
  </div>
</template>

<script>
import menu from './menu.vue'

import movies from './movies/view.vue'
import tev from './tev/view.vue'
import comic from './comic/view.vue'
import life from './life/view.vue'
import news from './news/view.vue'
import sum from './sum/view.vue'

import Vue from 'vue'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      menu: this.$route.params.id,
      show:false,
    }
  },
  components: {
    'menuView': menu,
    movies,
    tev,
    comic,
    life,
    news,
    sum
  },
  mounted:function(){
    this.render();
  },
  methods: {
    //判断一下是否登录了
    render:function(){
      var name=localStorage.getItem('name');
      var pass=localStorage.getItem('pass');
      if(name&&pass){
        this.show=true
      }else{
        $(".tip").css({display:"block"})
        this.$layer.alert("找不到对象！");
      }
    },
    menuView: function() {
      var name = this.$route.params.id;
      return name
    },
    menuConMessage: function(menuMark) {
      this.menu = menuMark
    },
    //回到管理员登录页面
    clickLogin:function(){
      this.$router.push('/houtai/login')
    },
    //回到前台页面
    clickqiantai:function(){
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


/*公共样式*/

.row {
  margin: 0px;
}

.common-content {
  min-width: 900px;
}
</style>
