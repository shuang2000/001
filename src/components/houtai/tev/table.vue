  <template>
    <div>
        <table id="table"></table>
    </div>
</template>
 
 <script>
export default {
    props:['message'],
    data: function() {
        return {
            name:'',
        }
    },
    watch:{
        'message':function(val){
            this.name=val;
            this.table();
        }
    },
    mounted:function(){
        this.table();
    },
    methods: {
        table: function() {
            var _this = this;
            function queryParams(params){
                return {
                    limit:params.limit,
                    offset:params.offset,
                    name:_this.name,
                    model:_this.$route.params.id
                }
            }
            $('#table').bootstrapTable('refresh');  
            $('#table').bootstrapTable({
                sortName: "",
                sortOrder: "",
                method: 'post',
                striped: true,
                pagination: true,
                sidePagination: 'server',
                pageNumber: 1,
                pageSize: 10,
                search: false,
                idField: "_id",//标志选项的id
                dataType: 'json',
                url: '/api/model/query?',
                maintainSelected: true,
                queryParams: queryParams,
                responseHandler: function(res) {
                    return res.body;
                },
                columns: [{
                    field: 'checkStatus',
                    checkbox: true,
                }, {
                    field: 'name',
                    title: '电影名字',
                    sortable: true,
                    formatter: function(value, row) {
                        var html = "<div v-on:click='clickframe' data-id=" + row._id + " style='cursor:pointer;'>" + value + "</div>"
                        return html
                    }
                }, {
                    field: 'author',
                    title: '作者',
                    sortable: true,
                    formatter: function(value, row) {
                        return value
                    }
                }, {
                    field: 'upauthor',
                    title: '上传人',
                    sortable: true,
                    formatter: function(value, row) {
                        return value
                    }
                }, {
                    field: 'time',
                    title: '上传时间',
                    sortable: true,
                    formatter: function(value, row) {
                        return value
                    }
                }, {
                    field: 'watch',
                    title: '观看人数',
                    sortable: true,
                    formatter: function(value, row) {
                        return value
                    }
                }, {
                    field: 'collect',
                    title: '收藏人数',
                    sortable: true,
                    formatter: function(value, row) {
                        return value
                    }
                }, {
                    field: 'des',
                    title: '描述',
                    sortable: true,
                    formatter: function(value, row) {
                        return value
                    }
                }],
                onClickRow: function(row, $element) {
                    _this.$router.push({ name: 'Detail', query: { id: row._id, cate: 'tev' } })
                }
            })
        },
    }
}
</script>
 
 <style>

</style>
 

 