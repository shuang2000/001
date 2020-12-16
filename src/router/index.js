import Vue from 'vue'
import Router from 'vue-router'
//后台
import Login from '@/components/houtai/login'

import Hello from '@/components/houtai/Hello'

import Addtev from '@/components/houtai/tev/add'

import Detail from '@/components/houtai/detail'
//前台
import home from '@/components/qiantai/home'
import movies from '@/components/qiantai/movies/view'
import tev from '@/components/qiantai/tev/view'
import comic from '@/components/qiantai/comic/view'
import life from '@/components/qiantai/life/view'
import news from '@/components/qiantai/news/view'
import qtdetail from '@/components/qiantai/detail'



Vue.use(Router)
export default new Router({
  routes: [
    //前台
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home/detail',
      name: 'qtdetail',
      component: qtdetail
    },
    
    {
      path:'/home/movies',
      name:'movies',
      component:movies
    },
    {
      path:'/home/tev',
      name:'tev',
      component:tev
    },{
      path:'/home/news',
      name:'news',
      component:news
    },{
      path:'/home/life',
      name:'life',
      component:life
    },{
      path:'/home/comic',
      name:'comic',
      component:comic
    },
    //后台
    {
      path: '/houtai/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello/:id',
      name: 'Hello',
      component: Hello
    },
    
    {
      path:'/tev/add',
      name:'Addtev',
      component:Addtev
    },
    {
      path:'/hello/detail/view',
      name:'Detail',
      component:Detail
    }
  ]
})
