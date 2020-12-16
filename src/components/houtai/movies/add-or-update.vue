<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
      label-width="100px">
      <el-form-item label="电影名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="spring bean名称, 如: testTask"></el-input>
      </el-form-item>
      <el-form-item label="人物" prop="author">
        <el-input v-model="dataForm.author" placeholder="人物"></el-input>
      </el-form-item>
      <el-form-item label="上传人" prop="upauthor">
        <el-input v-model="dataForm.upauthor" placeholder="上传人"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="des">
        <el-input v-model="dataForm.des" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="上传" prop="des">
        <label class="custom-file-upload">
          <input type="file" accept="image/png,image/jpg,image/jpeg,image/gif" name="myupload" id="uploadInput"
            v-on:change="uploadImage()" />
        </label>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          author: '',
          upauthor: '',
          des: '',
        },
        dataRule: {
          name: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          cronExpression: [{
            required: true,
            message: 'cron表达式不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      init (id) {
        console.log(id)
        this.id = id || 0
        this.visible = true
        if(this.id){
        }else{
          this.dataForm={
            code: "",
            description: "",
            name: "",
          }
          this.$nextTick(()=>{
            this.$refs['dataForm'].clearValidate()
          })
        }
      },
      uploadImage() {
        var formData = new FormData();
        var myfile = document.getElementById('uploadInput').files[0];
        formData.append('fabricImage', myfile);
        this.$http.post('/api/movies/files/upload', formData).then(response => {
          console.log('succeed');
          if (response && response.status == 200) {
            console.log(response.body)
            this.fileName = response.body
            console.log(result)
          }
        }).catch(err => {
          console.log(err)
        });
      },
      dataFormSubmit: function () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var data = this.dataForm
            this.$http.post('/api/movies/add', data).then((res) => {
              if (res) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      },
    }
  }

</script>
