<template>
    <div class="row">
        <div class="col-sm-12" style="text-align:left;margin:20px 10px;">
            <input type="text" class="form-control" placeholder="搜索电视剧名字" style="width:auto;display:inline">
            <select class="form-control" style="width:auto;display:inline;">
                <option>按时间</option>
                <option>按观看人数</option>
                <option>按收藏人数</option>
            </select>
            <button type="button" class="btn btn-primary">搜索</button>
            <router-link to="/tev/add"><button type="button" class="btn btn-danger" >添加</button></router-link>
            <button type="button" class="btn btn-warning">删除</button>
        </div>
        <div class="col-sm-12">
            <tableView></tableView>
        </div>
    </div>
</template>

<script>
import table from './table.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        'tableView':table
    },
    methods:{
        add:function(){

        }
    }
}
</script>

<style>

</style>
