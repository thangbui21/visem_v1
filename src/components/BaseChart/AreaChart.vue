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
  },

  components: {
    highcharts: Chart,
  },

  data() {
    return {
      chartOptions: {
        color: ["#4FA484"],
        chart: {
          type: "area",
          backgroundColor: "transparent",
          //plotBorderWidth: 0.5,
          //borderColor: '#EBBA95',
          //marginLeft: 80
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

        // legend: {
        //   enabled: false,
        // },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          symbolHeight: 20,
          symbolWidth: 20,
          symbolRadius: 0,
          itemStyle: {
            color: "#b4b5bf",
          },
        },
        xAxis: {
          type: "datetime",
          allowDecimals: false,
          labels: {
            style: {
              color: "#b4b5bf",
            },
            // formatter: function () {
            //   return this.value;
            // },
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
          pointFormat: "{series.name} : <b>{point.y:,.0f}</b>",
        },
        plotOptions: {
          series: {
            lineWidth: this.lineWidth,
          },
          area: {
            pointStart: 0,

            marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
        },

        series: this.series,
      },
      charts: [
        [
          {

            data: {

              color: ["#4FA484"],
              chart: {
                type: "area",
                backgroundColor: "transparent",
              },

              title: {
                text: "Network Traffic by Action (Logarithmic Scale)",
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

              legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
                symbolHeight: 20,
                symbolWidth: 20,
                symbolRadius: 0,
                itemStyle: {
                  color: "#b4b5bf",
                },
              },

              xAxis: {
                type: "datetime",
                allowDecimals: false,
                labels: {
                  style: {
                    color: "#b4b5bf",
                  },
                },
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
                pointFormat: "{series.name} : <b>{point.y:,.0f}</b>",
              },
              
              plotOptions: {
                series: {
                  lineWidth: 1,
                },
                area: {
                  pointStart: 0,

                  marker: {
                    enabled: false,
                    symbol: "circle",
                    radius: 2,
                    states: {
                      hover: {
                        enabled: true,
                      },
                    },
                  },

                },
              },

              series: [
                {
                  color: "#4FA484",
                  name: "tcp:",
                  data: (() => {
                    return [
                      ["2020-11-30 17:00:00", 1387],
                      ["2020-11-30 17:30:00", 1539],
                      ["2020-11-30 18:00:00", 1412],
                      ["2020-11-30 18:30:00", 1431],
                      ["2020-11-30 19:00:00", 1404],
                      ["2020-11-30 19:30:00", 1384],
                      ["2020-11-30 20:00:00", 1404],
                      ["2020-11-30 20:30:00", 1419],
                      ["2020-11-30 21:00:00", 1410],
                      ["2020-11-30 21:30:00", 1380],
                      ["2020-11-30 22:00:00", 1387],
                      ["2020-11-30 22:30:00", 1386],
                      ["2020-11-30 23:00:00", 1430],
                      ["2020-11-30 23:30:00", 1399],
                      ["2020-12-01 00:00:00", 1391],
                      ["2020-12-01 00:30:00", 1436],
                      ["2020-12-01 01:00:00", 1418],
                      ["2020-12-01 01:30:00", 1415],
                      ["2020-12-01 02:00:00", 1428],
                      ["2020-12-01 02:30:00", 1397],
                    ].map(function (point) {
                      return [Date.parse(point[0]), point[1]];
                    });
                  })(),
                },
                {
                  color: "#EDD051",
                  name: "udp:",
                  data: (() => {
                    return [
                      ["2020-11-30 17:00:00", 1],
                      ["2020-11-30 17:30:00", 1],
                      ["2020-11-30 18:00:00", 0],
                      ["2020-11-30 18:30:00", 0],
                      ["2020-11-30 19:00:00", 5],
                      ["2020-11-30 19:30:00", 0],
                      ["2020-11-30 20:00:00", 4],
                      ["2020-11-30 20:30:00", 0],
                      ["2020-11-30 21:00:00", 1],
                      ["2020-11-30 21:30:00", 0],
                      ["2020-11-30 22:00:00", 0],
                      ["2020-11-30 22:30:00", 3],
                      ["2020-11-30 23:00:00", 0],
                      ["2020-11-30 23:30:00", 0],
                      ["2020-12-01 00:00:00", 0],
                      ["2020-12-01 00:30:00", 2],
                      ["2020-12-01 01:00:00", 0],
                      ["2020-12-01 01:30:00", 1],
                      ["2020-12-01 02:00:00", 1],
                      ["2020-12-01 02:30:00", 0],
                    ].map(function (point) {
                      return [Date.parse(point[0]), point[1]];
                    });
                  })(),
                },
              ],
            },
          },
        ],
      ],
    };
  },
};
</script>
