<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import csvPath from "./datat.csv";
import Highcharts from "highcharts";
import dataModule from "highcharts/modules/data";
dataModule(Highcharts);

export default {
  components: {
    highcharts: Chart,
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: "column",
        },
        data: {
         
          csvURL: csvPath,
        },
        title: {
          text: "Fruit Consumption",
        },
        yAxis: {
          title: {
            text: "Units",
          },
        },
      },
    };
  },
}
