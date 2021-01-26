<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>
<script>
import { Chart } from "highcharts-vue";
export default {
  name: "base-chart",
  components: {
    highcharts: Chart,
  },
  props: {
    chartData: Array,
    partsdata: {
      type: Array,
    },
  },
  data() {
    return {
        chartOptions: this.chartData,
    };
  },
};
</script>