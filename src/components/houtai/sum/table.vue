 <template>
<div>
    <table id="table"></table>
</div>
 </template>
 
 <script>
 export default {
     data:function(){
         return{}
     },
     mounted:function(){
         this.table()
     },
     methods:{
        //  getData:function(){
        //      this.$http.get('/api/movies/query').then((response)=>{
        //          console.log(response)
        //      })
        //  },
         table:function(){
                $('#table').bootstrapTable({
                    sortName : "",
                    sortOrder : "",
                    method:'get',
                    striped:true,
                    pagination:true,
                    sidePagination:'server',
                    pageNumber:1,
                    pageSize:10,
                    search:false,
                    idField:"_id",//标志选项的id
                    dataType:'json',
                    url: '/api/news/query?',
                    maintainSelected:true,
                    queryParams : function(params) {
                        return params;
                    },
                    responseHandler:function(res){
                    return res.body;
                    },
                    columns: [{
                        field: 'checkStatus',
                        checkbox: true, 
                    },{
                        field: 'id',
                        visible:'false'
                    }, {
                        field: 'name',
                        title: '新闻名字',
                        sortable : true,
                        formatter:function(value,row){
                            return value
                        }
                    }, {
                        field: 'author',
                        title: '作者',
                        sortable : true,
                        formatter:function(value,row){
                            return value
                        }
                    }, {
                        field: 'upauthor',
                        title: '上传人',
                        sortable : true,
                        formatter:function(value,row){
                            return value
                        }
                    }, {
                        field: 'time',
                        title: '上传时间',
                        sortable : true,
                        formatter:function(value,row){
                            return value
                        }
                    }, {
                        field: 'watch',
                        title: '观看人数',
                        sortable : true,
                        formatter:function(value,row){
                            return value
                        }
                    } ,{
                        field: 'collect',
                        title: '收藏人数',
                        sortable : true,
                        formatter:function(value,row){
                            return value
                        }
                    }, {
                        field: 'des',
                        title: '描述',
                        sortable : true,
                        formatter:function(value,row){
                            return value
                        }
                    },  ]
                });
            }
     }
 }
 </script>
 
 <style>
 
 </style>
 