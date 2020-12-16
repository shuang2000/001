<template>
<div class="row">
    <div class="col-sm-1" >
        <router-link to="/houtai/login">
        <img src="static/image/logo.png" title="登录管理员" style="width:40px;height:40px;">
        </router-link>
    </div>
    <div class="col-sm-2" v-on:click="activeMenu(item.mark)" style="cursor:pointer;" v-for="(item,index) in dataMenu" :key="index" v-bind:dataMenu="item.mark">
        <p style="height:20px;"><img :src="item.src" style="height:100%"/></p>
        <p>{{item.menu}}</p>
    </div>
    <div class="col-sm-1" >
        <router-link to="/houtai/login">
        <img src="static/image/logo.png" title="登录管理员" style="width:40px;height:40px;">
        </router-link>
    </div>
</div>  
</template>

<script>
export default {
    data(){
        return{
            dataMenu:[
                {mark:'movies',menu:'电影',src:'static/image/movies.png'},
                {mark:'tev',menu:'电视剧',src:'static/image/tev.png'},
                {mark:'comic',menu:'动漫',src:'static/image/comic.png'},
                {mark:'news',menu:'新闻',src:'static/image/news.png'},
                {mark:'life',menu:'生活',src:'static/image/life.png'},
            ],

        }
    },
    mounted:function(){

    },
    methods:{
        activeMenu:function(mark){
            console.log(mark)
            this.$router.push('/home/'+mark)
        },
    }

}
</script>

<style>

</style>
