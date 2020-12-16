<template>
  <div class="mod-schedule">
    {{ $store.state.name }}
    
  </div>
</template>

<script>
  import AddOrUpdate from './add-or-update'
  export default {
    data() {
      return {
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
        this.$store.commit('setSid','movies')
        console.log(this.$store.getters.fullinfo)
      },
     
    }
  }

</script>
