<template>
<div>
<div class="row detail" v-for="(item,index) in this.data" :key="index">
    <div class="col-sm-12 detail_title" style="height:150px;overflow:hidden">
        <img :src="item.file" style="width:100%;">
    </div>
    <div class="col-sm-12" style="margin-top:10px;">
        <div class="row">
            <div class="col-sm-8" >
                <h1>{{item.name}}</h1>
                <div style="height:30px;line-height:30px;text-align:left">
                    <span>作者：{{item.author}}</span>
                    <span style="margin:0px 10px">上传人：{{item.upauthor}}</span>
                    <span>时间：{{item.time}}</span>
                </div>
                <div style="height:30px;line-height:30px;text-align:left">
                    <span><img src="static/image/qt_sort/collect.png" style="width:20px;margin:0px 10px">{{item.collect}}</span>
                    <span><img src="static/image/qt_sort/watch.png"  style="width:20px;margin:0px 10px">{{item.watch}}</span>
                </div>
                <div style="border-top:1px solid #ccc;line-height:25px;font-size:15px;text-indent:30px;text-align:left;padding:10px;text-justify:auto">{{item.des}}</div>
            </div>
        </div>
    </div>
</div> 
</div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
        }
    },
    mounted:function(){
        this.getData();
    },
    methods:{
        getData:function(){
            var id=this.$route.query.id;
            var cate=this.$route.query.cate;
            var params={
                id:id,
                cate:cate
            }
            this.$http.post('/api/model/detail',params).then((response)=>{
                if(response&&response.status==200){
                    this.data.push(response.body[0])
                }
            })
        },
    }
}
</script>

<style>
.detail{width:1000px;margin:5px auto;box-shadow:0px 0px 8px rgba(56,151,250,.4)}
.detail:hover{box-shadow:0px 0px 8px rgba(56,151,250,.8)}
.detail_title{}
.detail_title p{float:left;}

.share .icon span{padding:8px 15px;border-radius:30px;cursor:pointer;border:1px solid #ccc;float:left;margin:10px 5px 0px 0px}
.share .icon span img{margin-right:5px;}
.share .icon span:hover{border:1px solid rgba(56,151,250,1)}
</style>
