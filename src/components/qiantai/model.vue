<template>
  <div class="row">
    <el-row>
      <el-col :span="4"><img :src="this.imgSrc" style="width:30px;">电影</el-col>
      <el-col :span="8">
        <div class="tab">
          <span v-for="(item,index) in tab" :key="index" v-on:click="clickTab(item.mark)">{{item.content}}</span>
        </div>
      </el-col>
    </el-row>
    <div class="tabmain" v-for="(item,index) in this.data" :key="index" v-on:click="clickList(message,item._id)">
      <div><img :src="item.file" style="width:100%;height:130px;"></div>
      <div class="tabmainT">{{item.name}}</div>
      <div class="tabmainicon">
        <span><img src="static/image/qt_sort/watch.png">{{item.watch}}</span>
        <span><img src="static/image/qt_sort/collect.png">{{item.collect}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tab: [{
            mark: 'id',
            content: '按综合排序'
          },
          {
            mark: 'watch',
            content: '按查看排序'
          },
          {
            mark: 'collect',
            content: '按收藏排序'
          }
        ],
        data: [],
        imgSrc: '',
      }
    },
    props: ['message'],
    mounted: function () {
      this.getData()
    },
    methods: {
      getData: function (sort) {
        var _this = this;
        var params = {
          limit: 8,
          offset: 0,
          name: '',
          model: this.message,
          sort: sort
        }
        this.$http.post('/api/model/query', params).then((response) => {
          if (response) {
            var result = response.body.body.rows
            for (var i = 0; i < result.length; i++) {
              _this.data.push(result[i])
            }
          }
        })
        this.imgSrc = 'static/image/qt_sort/' + this.message + '.png'
      },
      //点击排序
      clickTab: function (mark) {
        this.data = [];
        this.getData(mark)
      },
      clickList: function (cate, id) {
        console.log(cate)
        this.$router.push({
          path: '/home/detail',
          query: {
            cate: cate,
            id: id
          }
        })
      }
    }

  }

</script>

<style>
  .tab span {
    float: left;
    border-left: 1px solid #ccc;
    padding: 0px 10px 0px 10px;
    cursor: pointer;
  }

  .tab span:hover {
    color: #1296db
  }

  .tabmain {
    width: 160px;
    float: left;
    margin: 0px 11px 0px 0px;
  }

  .tabmainT {
    height: 30px;
    line-height: 30px
  }

  .tabmainicon {
    height: 30px;
    text-align: left
  }

  .tabmainicon span img {
    width: 16px;
    margin: 0px 10px
  }

</style>
