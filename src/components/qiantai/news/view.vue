<template>
  <div class="mod-schedule">
    
    取store中的state:
    {{ $store.state.name }}
    <br>
    <div>{{ $store.state.name }}</div>
    引入store文件，访问：store.state.name
  </div>
</template>

<script>
import store from '../../../store/index.js'
  export default {
    data() {
      return {
      }
    },
    components: {
      
    },
    computed: {
      count () {
        return store.state.name
      }
    },
    created() {
      this.getDataList()
      console.log(store.state.name)
      console.log(this.$store.state.name)
      console.log(this.$router)
    },
    methods: {
      // 获取数据列表
      getDataList() {
          /*更改store中的state中的name:
          1,store中mutations中写函数，
          2，页面中this.$store.commit
          */
        this.$store.commit('setSid','news')
        console.log(this.$store.getters.fullinfo)
      },
     
    }
  }

</script>
