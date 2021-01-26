<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  name: "barchart",
  components: {
    highcharts: Chart,
  },
  props: {
    title: String,
    series: Array,
    partsdata: {
      type: Array,
    },
    categories: Array,
    legend: Array,
    pointWidth: String,
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          backgroundColor: "transparent",
        },
        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            pointWidth: this.pointWidth,
            borderColor: "",
          },
        },
        title: {
          text: this.title,
          align: "left",
          x: 10,
          style: {
            color: "#b4b5bf",
          },
        },
        xAxis: {
          labels: {
            style: {
              color: "#b4b5bf",
            },
            series: {
              stacking: "normal",
            },
          },
          categories: this.categories,
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
            style: {
              color: "#b4b5bf",
            },
          },
          gridLineColor: "#040620",
        },
        legend: this.legend,
        series: this.series,
      },
    };
  },
};
</script>