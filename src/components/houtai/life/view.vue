<!--
这个模块有几个功能组成：
1.展示信息
2.根据名字搜索特定的名字
3.点击进入详情页面
4.在详情页面收藏
5.每次进入到详情页面的时候，需要记录一个标志
6.添加（里面有上传图片和视频）
7.删除信息
-->
<template>
    <div class="row">
        <div class="col-sm-12" style="text-align:left;margin:20px 10px;">
            <input type="text" class="form-control" placeholder="搜索电影" name="title" v-on:keyup.enter="search()" style="width:auto;display:inline">
            <select class="form-control" style="width:auto;display:inline;">
                <option>按时间</option>
                <option>按观看人数</option>
                <option>按收藏人数</option>
            </select>
            <button type="button" class="btn btn-primary" v-on:click="search()" >搜索</button>
            <router-link to="/comic/add"><button type="button" class="btn btn-danger" >添加</button></router-link>
            <button type="button" class="btn btn-warning" v-on:click="remove()">删除</button>
        </div>
        <div class="col-sm-12">
            <tableView v-bind:message="mymessage"></tableView>
        </div>
    </div>
</template>

<script>
import table from './table.vue'
export default {
    data(){
        return{
            mymessage:''
        }
    },
    components:{
        'tableView':table
    },
    methods:{
        add:function(){

        },
        //搜索
        search:function(){
            let title=$("input[name=title]").val();
            console.log(title)
            this.mymessage=title;
        },
        remove:function(){
            var _this=this;
            var idArr=[];
            for(var i=0;i<$("table tr[class=selected]").length;i++){
                idArr.push($("table tr[class=selected]").eq(i).attr("id"));
            }
            let params={
                idArr:idArr,
                model:_this.$route.params.id
            }
            console.log(params)
            this.$http.post('/api/model/delete',params).then((response)=>{
                console.log(response)
            })
        },
    }
}
</script>

<style>

</style>
