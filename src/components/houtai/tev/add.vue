<template>
    <!-- 电影：名字 作者 上传人 上传时间 文件（图片或者视频） 观看人数 收藏人数 描述 -->
    <div>
        <form style="width:700px;height:700px;margin:20px auto">
            <div class="form-group">
                <label for="exampleInputName">电视剧的名字</label>
                <input type="text" class="form-control" name="name" placeholder="名字">
            </div>
            <div class="form-group">
                <label for="exampleInputauthor">主演</label>
                <input type="text" class="form-control" name="author" placeholder="主演">
            </div>
            <div class="form-group">
                <label for="exampleInputauthor">上传人</label>
                <input type="text" class="form-control" name="upauthor" placeholder="上传人">
            </div>
            <div class="form-group">
                <label for="exampleInputauthor">描述</label>
                <textarea type="text" class="form-control" name="des" placeholder="描述"></textarea>
            </div>
            <div>
                <label class="custom-file-upload">
                <input type="file" 
                        accept="image/png,image/jpg,image/jpeg,image/gif" 
                        name="myupload" id="uploadInput" v-on:change="uploadImage()"/>
                </label>
                <!-- <label class="custom-file-submit" name="">
                    <button v-on:click="uploadImage()">提交文件</button>
                </label>  -->
            </div>
            <button type="button" class="btn btn-default" v-on:click="submit()">提交</button>
        </form>
        <div class="screen" style="display:none;">
            <div style="background:rgba(0,0,0,.5);width:100%;height:100%;position:absolute;left:0px;top:0px;z-index:2"></div>
            <div class="tip"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            fileName:''
        }
    },
    methods:{
        uploadImage(){
            var formData = new FormData();
            var myfile = document.getElementById('uploadInput').files[0];
            formData.append('fabricImage', myfile);
            this.$http.post('/api/tev/files/upload', formData).then(response=>{
                console.log('succeed'); 
                if(response&&response.status==200){
                    console.log(response.body)
                    this.fileName=response.body
                    console.log(result) 
                } 
            }).catch(err=>{
                console.log(err)
            });
        },
        submit:function(){
            var _this=this;
            var name=$("input[name=name]").val();
            var author=$("input[name=author]").val();
            var upauthor=$("input[name=upauthor]").val();
            var des=$("input[name=des]").val();
            var data={
                name:name,
                author:author,
                upauthor:upauthor,
                des:des,
                file:this.fileName
            }
            
            this.$http.post('/api/tev/add',data).then((response)=>{
                if(response&&response.status==200){
                    $(".tip").html("您的添加信息已经提交成功，过2秒后页面自动跳转到电影首页，您可以在那儿查看添加的数据")
                    $(".screen").show();
                    setTimeout(function(){
                        $(".screen").hide();
                        _this.$router.push('/hello/tev')
                    },2000)
                }
            })
        }
    }
}
</script>

<style>
.tip{
    width:400px;
    height:300px;
    text-align:center;
    word-wrap: break-word;
    padding:106px 10px;
    font-size:20px;
    background:rgba(51,204,204,.5);
    position:absolute;
    z-index:3;
    top:20%;
    left:50%;
    margin-left:-200px;
    border-radius:10px;color:#fff;
}
</style>
