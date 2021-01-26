<template>
  <div v-if="isSingleValue()">
    <singleval :options="chartData"></singleval>
  </div>
  <div v-else-if="isTable()">
    <tabletop10 :options="chartData" ></tabletop10>
  </div>
  <div v-else>
    <highcharts :options="chartData"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import { Chart } from "highcharts-vue";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
exporting(Highcharts);
exportData(Highcharts);

import SingleVal from "@/components/SingleVal/SingleVal";
import TopValue from "@/components/TopValue/TopValue";

export default {
  name: "Chart",
  props: ["chartData", "propId"],
  components: {
    highcharts: Chart,
    singleval: SingleVal,
    tabletop10: TopValue,
  },
  data() {
    return {
      chartOptions: {},
      singleVal: this.chartData.chart.type,
    };
  },
  methods: {
    isSingleValue() {
      // Check xong.
      if (this.chartData.chart.type === "singleval") {
        return true;
      } else {
        return false;
      }
    },
    isTable() {
      if (this.chartData.chart.type === "table") {
        return true;
      } else {
        return false;
      }
    },

    // updateChartData: function () {
    //   this.$set(this.chartData, "series", [
    //     {
    //       // Lấy được từ API.
    //       name: this.info,

    //       data: [
    //         [Date.UTC(1970, 10, 25), 0],
    //         [Date.UTC(1970, 11, 6), 0.25],
    //       ],
    //     },
    //     {
    //       name: "Winter 2015-2016",
    //       type: "area",
    //       data: [
    //         [Date.UTC(1971, 0, 25), 1.03],
    //         [Date.UTC(1971, 5, 7), 0],
    //       ],
    //     },
    //     {
    //       name: "Winter 2016-2017",
    //       type: "line",
    //       data: [
    //         [Date.UTC(1970, 9, 15), 0],
    //         [Date.UTC(1970, 9, 31), 0.09],
    //         [Date.UTC(1970, 10, 7), 0.17],
    //         [Date.UTC(1970, 10, 10), 0.1],
    //         [Date.UTC(1970, 11, 10), 0.1],
    //         [Date.UTC(1970, 11, 13), 0.1],
    //         [Date.UTC(1970, 11, 16), 0.11],
    //         [Date.UTC(1970, 11, 19), 0.11],
    //         [Date.UTC(1970, 11, 22), 0.08],
    //         [Date.UTC(1970, 11, 25), 0.23],
    //         [Date.UTC(1970, 11, 28), 0.37],
    //         [Date.UTC(1971, 0, 16), 0.68],
    //         [Date.UTC(1971, 0, 19), 0.55],
    //         [Date.UTC(1971, 0, 22), 0.4],
    //         [Date.UTC(1971, 0, 25), 0.4],
    //         [Date.UTC(1971, 0, 28), 0.37],
    //         [Date.UTC(1971, 0, 31), 0.43],
    //         [Date.UTC(1971, 1, 4), 0.42],
    //         [Date.UTC(1971, 1, 7), 0.39],
    //         [Date.UTC(1971, 1, 10), 0.39],
    //         [Date.UTC(1971, 1, 13), 0.39],
    //         [Date.UTC(1971, 1, 16), 0.39],
    //         [Date.UTC(1971, 1, 19), 0.35],
    //         [Date.UTC(1971, 1, 22), 0.45],
    //         [Date.UTC(1971, 1, 25), 0.62],
    //         [Date.UTC(1971, 1, 28), 0.68],
    //         [Date.UTC(1971, 2, 4), 0.68],
    //         [Date.UTC(1971, 2, 7), 0.65],
    //         [Date.UTC(1971, 2, 10), 0.65],
    //         [Date.UTC(1971, 2, 13), 0.75],
    //         [Date.UTC(1971, 2, 16), 0.86],
    //         [Date.UTC(1971, 2, 19), 1.14],
    //         [Date.UTC(1971, 2, 22), 1.2],
    //         [Date.UTC(1971, 2, 25), 1.27],
    //         [Date.UTC(1971, 2, 27), 1.12],
    //         [Date.UTC(1971, 2, 30), 0.98],
    //         [Date.UTC(1971, 3, 3), 0.85],
    //         [Date.UTC(1971, 3, 6), 1.04],
    //         [Date.UTC(1971, 3, 9), 0.92],
    //         [Date.UTC(1971, 3, 12), 0.96],
    //         [Date.UTC(1971, 3, 15), 0.94],
    //         [Date.UTC(1971, 3, 18), 0.99],
    //         [Date.UTC(1971, 3, 21), 0.96],
    //         [Date.UTC(1971, 3, 24), 1.15],
    //         [Date.UTC(1971, 3, 27), 1.18],
    //         [Date.UTC(1971, 3, 30), 1.12],
    //         [Date.UTC(1971, 4, 3), 1.06],
    //         [Date.UTC(1971, 4, 6), 0.96],
    //         [Date.UTC(1971, 4, 9), 0.87],
    //         [Date.UTC(1971, 4, 12), 0.88],
    //         [Date.UTC(1971, 4, 15), 0.79],
    //         [Date.UTC(1971, 4, 18), 0.54],
    //         [Date.UTC(1971, 4, 21), 0.34],
    //         [Date.UTC(1971, 4, 25), 0],
    //       ],
    //     },
    //   ]);
    // },
  },
  // mounted() {
  //   this.title =
  //     "<h5><span class='fw-semi-bold'>" + this.chartData.name + "</span></h5>";
  //   this.updateChartData();
  // },
};
</script>