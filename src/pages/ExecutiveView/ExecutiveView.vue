<template>
  <div>
    <b-row>
      <b-col>
        <!-- <h1 class="page-title">{{ this.dataTitle }}</h1> -->
        <h1 class="page-title"><strong>Executive view</strong></h1>
      </b-col>
      <b-col>
        <div style="float: right">
          <Button
            v-if="!isEdit"
            @event-click="edit_chart"
            label="Edit"
            style="margin-right: 5px"
          ></Button>
          <Button v-if="!isEdit" @event-click="PDF" label="Export PDF"></Button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        lg="3"
        xs="6"
        v-for="(item, index) in singleValues"
        v-bind:key="index"
      >
        <SingleValue
          :title="item.title"
          :value="item.value"
          :trend="item.trend"
          :status="item.status"
        ></SingleValue>
      </b-col>
    </b-row>

    <b-row>
      <b-col xs="6" lg="6">
        <Widget
          ><LineChart
            :title="charts.title"
            :height="charts.height"
            :lineWidth="charts.lineWidth"
            :series="charts.series"
            :legend="charts.legend"
        /></Widget>
      </b-col>
      <b-col xs="6" lg="6">
        <Widget
          ><LineChart
            :title="charts1.title"
            :height="charts1.height"
            :lineWidth="charts1.lineWidth"
            :series="charts1.series"
            :legend="charts1.legend"
        /></Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="6"
        ><Widget title="Attack Origins"><BubbleMap /></Widget
      ></b-col>
    </b-row>
  </div>
</template>

<script>
import BubbleMap from "../../components/ChartVisualize/BubbleMap";
import SingleValue from "../../components/SingleValue/SingleValue.vue";
import Widget from "../../components/Widget/Widget";
import Button from "../../components/Button/Button.vue";
import LineChart from "../../components/BaseChart/LineChart";

export default {
  name: "executive-view",
  props: [],
  components: {
    BubbleMap,
    SingleValue,
    Widget,
    LineChart,
    Button,
  },
  data() {
    return {
      singleValues: [
        {
          title: "Attacks Stopped (Last 24 Hours)",
          value: 769,
          trend: "Down",
          status: "background: #f28f43",
        },
        {
          title: "Malware Blocked (Last 24 Hours)",
          value: 0,
          trend: "Equal",
          status: "background: #8bbc21",
        },
        {
          title: "Users Protected",
          value: 2,
          trend: "User",
          status: "background: #77a1e5",
        },
        {
          title: "Devices Protected",
          value: 53,
          trend: "Devices",
          status: "background: #77a1e5",
        },
      ],
      charts: {
        title: "User Trend over 30 days",
        lineWidth: 6,
        height: 300,
        legend: {
          enabled: false,
        },

        series: [
          {
            marker: {
              enabled: false,
            },
            color: "#4FA484",
            name: "user:",
            data: (() => {
              return [
                ["2020-11-01", 1],
                ["2020-11-02", 1],
                ["2020-11-03", 1],
                ["2020-11-04", 1],
                ["2020-11-05", 1],
                ["2020-11-06", 1],
                ["2020-11-07", 1],
                ["2020-11-08", 1],
                ["2020-11-09", 1],
                ["2020-11-10", 1],
                ["2020-11-11", 1],
                ["2020-11-12", 1],
                ["2020-11-13", 1],
                ["2020-11-14", 1],
                ["2020-11-15", 1],
                ["2020-11-16", 1],
                ["2020-11-17", 1],
                ["2020-11-18", 1],
                ["2020-11-19", 1],
                ["2020-11-20", 1],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
        ],
      },
      charts1: {
        title: "Network Traffic Volume Trend over 30 Days",
        lineWidth: 6,
        height: 300,
        legend: {
          enabled: false,
        },

        series: [
          {
            marker: {
              enabled: false,
            },
            color: "#EC9960",
            name: "volume:",
            legend: {
              enabled: false,
            },
            data: (() => {
              return [
                ["2020-11-01", 100.64],
                ["2020-11-02", 314.96],
                ["2020-11-03", 294.6],
                ["2020-11-04", 288.65],
                ["2020-11-05", 283.46],
                ["2020-11-06", 264.34],
                ["2020-11-07", 102.09],
                ["2020-11-08", 94.9],
                ["2020-11-09", 316.22],
                ["2020-11-10", 268.33],
                ["2020-11-11", 267.16],
                ["2020-11-12", 257.99],
                ["2020-11-13", 246.3],
                ["2020-11-14", 77.42],
                ["2020-11-15", 77.27],
                ["2020-11-16", 290.97],
                ["2020-11-17", 366.25],
                ["2020-11-18", 309.53],
                ["2020-11-19", 281.08],
                ["2020-11-20", 272.14],
                ["2020-11-21", 93.99],
                ["2020-11-22", 91.46],
                ["2020-11-23", 333.68],
                ["2020-11-24", 285.93],
                ["2020-11-25", 312.61],
                ["2020-11-26", 293.85],
                ["2020-11-27", 282.02],
                ["2020-11-28", 94.15],
                ["2020-11-29", 81.72],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
        ],
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>