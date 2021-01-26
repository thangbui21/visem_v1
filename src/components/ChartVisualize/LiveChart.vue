<template>
    <div v-if="isSingleValue"></div>
    <div v-else-if="isTableChart"></div>
    <div v-else>
        <highcharts :options="chartData"></highcharts>
    </div>
</template>

<script>
import Highcharts from "highcharts";
import { Chart } from "highcharts-vue";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import RESTService from "../../services/rest.service";

exporting(Highcharts);
exportData(Highcharts);

export default {
    name: 'LiveChart',
    props: {
        'chartData': {
            type: Object,
            default: function() {
                return{
                chart: {
                    type: 'line',
                    height: 350,
                    backgroundColor: 'transparent'
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer'
                    }
                },
                xAxis: {
                    categories: [],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        enabled: false
                    },
                    gridLineColor: '#040620'
                },
                title: {
                    text: undefined
                },
                credits: {
                    enabled: false
                },
                series: []
            }
            }
        },
        'QueryString': String,
        'TimeRefresh': Number
    },
    components: {
        highcharts: Chart
    },
    data() {
        return {
            xAxis: {
                categories: [],
                crosshair: true
            },
            initCategories: [],
            initSeries: [],
            series: []
            /*ChartOptions: {
                chart: {
                    type: 'column',
                    height: 350,
                    backgroundColor: 'transparent',
                    events: {
                        load: function() {
                            var series = this.series[0];
                            alert(JSON.stringify(series));
                        }
                    }
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer'
                    }
                },
                xAxis: {
                    categories: [],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        enabled: false
                    },
                    gridLineColor: '#040620'
                },
                title: {
                    text: undefined
                },
                credits: {
                    enabled: false
                },
                series: []
            }*/
        }
    },
    methods: {
        UpdateChartData: function(){
            this.$set(this.chartData,"xAxis",this.xAxis);
            this.$set(this.chartData,"series",this.series);
        },
        FeedData: function(){
            if(this.chartData.chart.type === "area"){
              alert(this.chartData.chart.type);   
            }
        },
        InitChartData: function(){
            //alert(JSON.stringify(this.ChartOptions.xAxis.categories));
            //alert(JSON.stringify(this.ChartOptions.series));
            this.xAxis.categories = this.chartData.xAxis.categories;
            this.series = this.chartData.series;
        },
        FetchChartData: function(){
            let data = {
                search: this.QueryString,
                earliest: '*',
                lastest: '*',
            };

            var interval0 = setInterval(()=>{
                this.initCategories = [];
                this.initSeries = [];
                RESTService.post("/services/search/jobs",data).then(
                (response)=>{
                    let sid = response.data.sid;
                    let interval = setInterval(()=>{
                    RESTService.get("/services/search/jobs/"+sid+"/results").then(
                        (response)=>{
                        if(response.data.state=="finalized"){
                            let results = response.data.data.results;
                            let keys = Object.keys(results[0]);
                            this.initCategories.push(keys[1]);
                            for(let result of results) {
                                this.initSeries.push({name: result[keys[1]], data: [result[keys[0]]]});
                            }
                            this.xAxis.categories = this.initCategories;
                            this.series = this.initSeries;
                            //alert(this.xAxis.categories);
                            //alert(this.series);
                            this.UpdateChartData();
                            //this.ChartOptions.xAxis.categories = this.categories;
                            //this.ChartOptions.series = this.series;
                            clearInterval(interval);
                        }
                        }
                    ).catch(()=>{clearInterval(interval)})
                    },1000)
                }
                );
                if(this.$route.path!='/app/dashboard'){
                    clearInterval(interval0);
                }
            },this.TimeRefresh);
        }
    },
    created() {
        this.InitChartData();
        //this.UpdateChartData();
        //this.FetchChartData();
    },
    mounted() {
        this.FetchChartData();
    }
}

</script>

<style></style>