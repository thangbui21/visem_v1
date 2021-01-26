<template>
  <div>
    <highcharts
      :options="chartOptions"
      ref="lineCharts"
      :constructor-type="'chart'"
    ></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  props: {
    title: String,
    height: Number,
    series: Array,
    partsdata: {
      type: Array,
    },
    lineWidth: Number,
    categories: Array,
    legend: Array,
  },

  components: {
    highcharts: Chart,
  },

  data() {
    return {
      chartOptions: {
        color: ["#4FA484"],
        chart: {
          type: "line",
          backgroundColor: "transparent",
        },

        title: {
          text: this.title,
          align: "left",
          x: 20,
          style: {
            color: "#b4b5bf",
          },
        },
        subtitle: {
          text: "",
        },
        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },

        legend: this.legend,

        xAxis: {
          type: "datetime",
          allowDecimals: false,
          labels: {
            style: {
              color: "#b4b5bf",
            },
          },
          categories: this.categories,
        },
        
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            style: {
              color: "#b4b5bf",
            },
          },
          gridLineColor: "#040620",
        },
        tooltip: {
          pointFormat: "{series.name}  <b>{point.y:,.0f}</b>",
        },
        plotOptions: {
          series: {
            lineWidth: this.lineWidth,
          },
          area: {
            pointStart: 0,

            marker: {
              enabled: false,
            },
          },
        },

        series: this.series,
      },
    };
  },
};
</script>
