<template>
  <div>
    <div id="tree"></div>
  </div>
</template>
<script>
import tree from '@/assets/tree/js/bootstrap-treeview.min.js'
export default {
  data() {
    return {
    }
  },
  mounted: function() {
    //获取左边导航的数据并且渲染成结构树
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      this.$http.get('/api/category/showlist').then((response) => {
        if (response.status == 200) {
          var result = response.body;
          var tree = [];
          for (var i = 0; i < result.length; i++) {
            var json = {
              'text': result[i].title
            }
            tree.push(json);
          }
          //渲染结构树
          $('#tree').treeview({
            data: tree,         // 数据源
            onNodeSelected: function(event, data) {
              var menuMark = sw(data.text);
              _this.$router.push({ name: 'Hello', params: { id: menuMark } })
              _this.$emit('menuMessage', menuMark)
            }
          });
          //根据浏览器中地址渲染一次菜单的选中转态
          var Mark=swRever(_this.$route.params.id);
          for(var i=0;i<$("#tree li").length;i++){
            if($("#tree li").eq(i).text()==Mark){
              $("#tree li").eq(i).css({color:"#FFFFFF",background:"#428bca"})
            }
          }
          function sw(text) {
            var menuMark;
            switch (text) {
              case '电影':
                menuMark = 'movies';
                break;
              case '电视剧':
                menuMark = 'tev';
                break;
              case '动漫':
                menuMark = 'comic';
                break;
              case '生活':
                menuMark = 'life';
                break;
              case '新闻':
                menuMark = 'news';
                break;
              case '统计':
                menuMark = 'sum';
                break;
            }
            return menuMark
          }
          function swRever(text) {
            var menuName;
            switch (text) {
              case 'movies':
                menuName = '电影';
                break;
              case 'tev':
                menuName = '电视剧';
                break;
              case 'comic':
                menuName = '动漫';
                break;
              case 'life':
                menuName = '生活';
                break;
              case 'news':
                menuName = '新闻';
                break;
              case 'sum':
                menuName = '统计';
                break;
            }
            return menuName
          }
        }
      })
    },

  }
}
</script>
<style scoped>
@import '/assets/tree/css/bootstrap-treeview.css';
</style>
