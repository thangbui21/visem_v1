<template>
    <div v-if="isSingleValueChart">
        <SingleValue :options="chartOptions"></SingleValue>
    </div>
    <div v-else-if="isTableChart">

    </div>
    <div v-else>
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>

    import { Chart } from "highcharts-vue";
    import SingleValue from "../SingleValue/SingleValue.vue";
    export default {
        name: "ChartViz",
        props: ["chartOptions"],
        components: {highcharts: Chart, SingleValue},
        computed: {
            isSingleValueChart: function(){
                if(this.chartOptions.chart.type==="single value"){
                    return true;
                }
                return false;
            },
            isTableChart: function(){
                return false;
            }
        }
    }
</script>

<style></style>