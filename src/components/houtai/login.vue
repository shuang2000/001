<template>
        <div class="row" style="width:500px;margin:100px auto">
            <form style="width:auto;background:#33CCCC;padding:20px;border-radius:10px;color:#fff">
                <h1>用户登录</h1>
                <p class="tip" style="color:red"></p>
                <div class="form-group">
                    <label for="exampleInputEmail1">用户 (user1,user2,user3,user4)</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="name" name="admin">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">密码(123456)</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="pass">
                </div>
                <button type="button" class="btn btn-default" v-on:click="login()">登录</button>
            </form>
        </div>
   
</template>

<script>
export default {
    data(){
        return{}
    },
    mounted:function(){
        this.clear();
    },
    methods:{
        //清空缓存
        clear(){
            localStorage.clear();
        },
        //登录
        login(){
            var _this=this;
            var admin=$("input[name=admin]").val();
            var pass=$("input[name=pass]").val();
            var params={
                admin:admin,
                pass:pass
            }
            
            this.$http.post('/api/user/login',params).then((response)=>{
                console.log(response)
                if(response&&response.status==200){
                    if(response.body.length==1){
                       localStorage.setItem('name',response.body[0].name);
                       localStorage.setItem('pass',response.body[0].pass);
                        _this.$router.push('/hello/movies')
                    }else{
                        $(".tip").html('登陆名或者密码错误')
                    }
                }else{
                    alert(response.status)
                }
            })
        },
        
    }
}
</script>

<style>

</style>
