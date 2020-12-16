<template>
    <div class="row">
        <div id="container" style="min-width:400px;height:400px"></div>
    </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import highexports from 'highcharts/js/modules/exporting.js';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
highexports(Highcharts);


export default {
    data() {
        return {
            data:[],
        }
    },
    mounted: function() {
        this.getData();
    },
    methods: {
        //获取每个功能数据
        getData: function() {
            var _this = this;
            var arr = [['movies'], ['tev'], ['comic'], ['life'], ['news']];
            var a=[];
            Arr(a).then(function(value){
                for(var i=0;i<arr.length;i++){
                    arr[i].push(value[i].num)
                }
                _this.charts(arr);
            })
            function Arr(a){
                return new Promise(function(reslove,reject){
                    var b=[];
                    for (var i = 0; i < arr.length; i++) {
                        var params = {
                            model: arr[i][0]
                        }
                        _this.$http.post('/api/model/query', params).then((response) => {
                            if (response && response.status == 200) {
                                a.push({num:response.body.body.total})
                                b.push({num:response.body.body.total})
                            }
                            return a;
                        })
                    }
                    setTimeout(function(){
                         if(a!==[]){
                            reslove(a)
                        }
                    },1000)
                   
                })
            }     
        },
        //渲染图标
        charts: function(data) {
            var chart = new Highcharts.Chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '每个功能里面的数量'
                },
                subtitle: {
                    text: '实时显示每个功能对应的数据(可能会有2秒的延迟)'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '数量（个）'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '功能数据总量: <b>{point.y:.1f} 个</b>'
                },
                series: [{
                    name: '总数据',
                    data: data,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });

        }
    }

}
</script>

<style>

</style>
