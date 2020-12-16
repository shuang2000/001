// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueresource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.js'
import store from './store'
/*引入下面三行*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(vueresource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
