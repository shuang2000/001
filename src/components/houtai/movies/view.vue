<template>
  <div class="mod-schedule">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      
      <el-form-item>
        <el-input v-model="dataForm.beanName" placeholder="电影名字" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <!-- <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!-- <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column> -->
      <el-table-column prop="name" header-align="center" align="center" label="电影名字">
      </el-table-column>
      <el-table-column prop="author" header-align="center" align="center" label="作者">
      </el-table-column>
      <el-table-column prop="upauthor" header-align="center" align="center" label="上传人">
      </el-table-column>
      <el-table-column prop="time" header-align="center" align="center" label="上传时间">
      </el-table-column>
      <el-table-column prop="watch" header-align="center" align="center" label="观看人数">
      </el-table-column>
      <el-table-column prop="collect" header-align="center" align="center" label="收藏人数">
      </el-table-column>
      <el-table-column prop="des" header-align="center" align="center" label="描述">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row._id)">详情</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './add-or-update'
  export default {
    data() {
      return {
        dataForm: {
          beanName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
      }
    },
    components: {
      AddOrUpdate
    },
    activated() {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        let data = {
          'offset': this.pageIndex - 1,
          'limit': this.pageSize,
          'name': this.dataForm.beanName
        }
        this.$http.post('/api/movies/query?', data).then((res) => {
          this.dataListLoading = false
          if (res) {
            this.dataList = res.body.body.rows
            this.totalPage = res.body.body.total
            console.log(this.dataList)
          }
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        if (id) {
          this.$router.push({
            name: 'Detail',
            query: {
              id: id,
              cate: 'movies'
            }
          })
        }else{
          this.$nextTick(() => {
            this.$refs.addOrUpdate.init()
        })
        }
        
      },
      // 删除
      deleteHandle(id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item._id
        })
        var psram = {
          idArr: ids,
          // model:''
        }
        console.log(ids)
        this.$confirm(`确定删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/movies/delete', psram).then((res) => {
            console.log(res)
            if (res && res.ok == '1') {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {})
      },
    }
  }

</script>
