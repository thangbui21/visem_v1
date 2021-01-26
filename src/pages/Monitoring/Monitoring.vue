<template>
  <div>
    <div ref="dashboard" v-if="!isEdit">
      <b-row>
        <b-col>
          <h2 class="page-title">
            <span>Firewalls</span>
          </h2>
        </b-col>

        <b-col>
          <div style="float: right">
            <Button
            style="margin-right: 5px"
              v-if="!isEdit"
              @event-click="edit_chart"
              label="Edit"
            ></Button>
            <Button
              v-if="!isEdit"
              @event-click="PDF"
              label="Export PDF"
            ></Button>
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
          <SingleVal
            :title="item.title"
            :value="item.value"
            :trend="item.trend"
            :status="item.status"
          ></SingleVal>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" lg="4">
          <Widget
            ><AreaChart
              :title="charts.title"
              :height="charts.height"
              :lineWidth="charts.lineWidth"
              :series="charts.series"
          /></Widget>
        </b-col>
        <b-col xs="6" lg="4">
          <Widget
            ><AreaChart
              :title="charts1.title"
              :height="charts1.height"
              :lineWidth="charts1.lineWidth"
              :series="charts1.series"
          /></Widget>
        </b-col>
        <b-col xs="6" lg="4">
          <Widget
            ><AreaChart
              :title="charts2.title"
              :height="charts2.height"
              :lineWidth="charts2.lineWidth"
              :series="charts2.series"
          /></Widget>
        </b-col>
      </b-row>
      <!--style="height: 400px; margin-top: 40px"-->
      <b-row v-for="(row, index) in dataLayout.charts" v-bind:key="index">
        <b-col
          class="smallrange"
          xs="6"
          v-bind:lg="calColumnSize(row.length)"
          v-for="(col, index) in row"
          v-bind:key="index"
        >
          <div v-if="!isEdit">
            <Widget :title="col.name">
              <!--
              <AreaChart
                :chartData="col.data"
                ref="printchart"
                id="exportchart"
              ></AreaChart>
              -->
            </Widget>
          </div>
          <div v-if="isEdit">
            <Widget>
              <vue-json-editor
                v-model="dataLayout"
                :show-btns="true"
                :expandedOnStart="true"
                @json-change="onJsonChange"
              ></vue-json-editor>
            </Widget>
          </div>
          <div>{{ chartData }}</div>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6" xs="6"
          ><Widget :title="'Top Countries by Blocked Connections'"
            ><SimpleTable /></Widget
        ></b-col>
        <b-col lg="6" xs="6"
          ><Widget :title="'Top Sources by Blocked Connections'"
            ><BarChart
              :title="barchart.title"
              :legend="barchart.legend"
              :categories="barchart.categories"
              :series="barchart.series"
              :colors="barchart.colors"
            /></Widget
        ></b-col>
      </b-row>
    </div>
    <div v-if="isEdit">
      <b-row>
        <b-col>
          <h1 class="page-title">Edit Dashboard</h1>
        </b-col>

        <b-col>
          <div style="float: right">
            <b-button
              style="min-width: 100px"
              variant="default"
              @click="edit_chart"
              >Cancel</b-button
            >
            <b-button
              style="margin-left: 10px; min-width: 100px"
              variant="default"
              @click="save_chart"
              >Save</b-button
            >
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Widget>
            <vue-json-editor v-model="dataLayout"></vue-json-editor>
          </Widget>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
//import Chart from "../Dashboard/Chart";
//import autoTable from 'jspdf-autotable'
import RESTService from "../../services/rest.service";
import jsPDF from "jspdf";
import Axios from "axios";
import Widget from "@/components/Widget/Widget";
import "jspdf-autotable";
import vueJsonEditor from "vue-json-editor";

import SimpleTable from "../../components/SimpleTable/SimpleTable";
import AreaChart from "../../components/BaseChart/AreaChart";
import SingleVal from "../../components/SingleValue/SingleValue.vue";
import BarChart from "../../components/ChartVisualize/BarChart";
import Button from "../../components/Button/Button.vue";


export default {
  name: "Monitoring",
  components: {
    Button,
    Widget,
    vueJsonEditor,
    SimpleTable,
    //LineChart,
    SingleVal,
    AreaChart,
    BarChart,
  },

  props: ["propId"],

  data() {
    return {
      singleValues: [
        {
          title: "Blocked Connections",
          value: 70638,
          trend: "",
          status: "background: #f28f43",
        },
        {
          title: "Allowed Connections",
          value: 1380717,
          trend: "",
          status: "background: #a6c96a",
        },
        {
          title: "External Source IPs",
          value: 15909,
          trend: "",
          status: "background: #77a1e5",
        },
        {
          title: "External Destination IPs",
          value: 3178,
          trend: "",
          status: "background: #77a1e5",
        },
      ],

      charts: {
        title: "User Trend over 30 days",
        lineWidth: 1,
        height: 300,

        //categories: ["2020 - 11 - 01"],
        series: [
          {
            color: "#4FA484",
            name: "tcp",
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
          //Add multiple line
          {
            color: "#EDD051",
            name: "udp",
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
      charts1: {
        title: "Network Traffic by Action (Logarithmic Scale)",
      
        height: 300,

        series: [
          {
            color: "#4FA484",
            name: "allowed",
            data: (() => {
              return [
                ["2020-11-30 22:00:00", 27851],
                ["2020-11-30 22:30:00", 27332],
                ["2020-11-30 23:30:00", 26873],
                ["2020-12-01 00:00:00", 26835],
                ["2020-12-01 00:30:00", 26676],
                ["2020-12-01 01:00:00", 26424],
                ["2020-12-01 01:30:00", 26388],
                ["2020-12-01 02:00:00", 26500],
                ["2020-12-01 02:30:00", 26121],
                ["2020-12-01 03:30:00", 26216],
                ["2020-12-01 04:00:00", 26250],
                ["2020-12-01 04:30:00", 26369],
                ["2020-12-01 05:00:00", 26280],
                ["2020-12-01 05:30:00", 26267],
                ["2020-12-01 06:00:00", 26073],
                ["2020-12-01 06:30:00", 26469],
                ["2020-12-01 07:00:00", 26849],
                ["2020-12-01 07:30:00", 29629],
                ["2020-12-01 08:00:00", 29260],
                ["2020-12-01 08:30:00", 30048],
                ["2020-12-01 09:00:00", 29827],
                ["2020-12-01 09:30:00", 32155],
                ["2020-12-01 10:00:00", 31726],
                ["2020-12-01 10:30:00", 30805],
                ["2020-12-01 11:00:00", 29789],
                ["2020-12-01 11:30:00", 28366],
                ["2020-12-01 12:00:00", 27803],
                ["2020-12-01 12:30:00", 28026],
                ["2020-12-01 13:00:00", 27843],
                ["2020-12-01 13:30:00", 29953],
                ["2020-12-01 14:00:00", 30457],
                ["2020-12-01 14:30:00", 28644],
                ["2020-12-01 15:00:00", 27041],
                ["2020-12-01 15:30:00", 27502],
                ["2020-12-01 16:00:00", 28614],
                ["2020-12-01 16:30:00", 29063],
                ["2020-12-01 17:00:00", 26633],
                ["2020-12-01 17:30:00", 25453],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
          //Add multiple line
          {
            color: "#f28f43",
            name: "blocked",
            data: (() => {
              return [
                ["2020-11-30 22:00:00", 1387],
                ["2020-11-30 22:30:00", 1389],
                ["2020-11-30 23:00:00", 1430],
                ["2020-11-30 23:30:00", 1399],
                ["2020-12-01 00:00:00", 1391],
                ["2020-12-01 00:30:00", 1438],
                ["2020-12-01 01:00:00", 1418],
                ["2020-12-01 01:30:00", 1416],
                ["2020-12-01 02:00:00", 1429],
                ["2020-12-01 02:30:00", 1397],
                ["2020-12-01 03:00:00", 1447],
                ["2020-12-01 03:30:00", 1411],
                ["2020-12-01 04:00:00", 1413],
                ["2020-12-01 04:30:00", 1390],
                ["2020-12-01 05:00:00", 1620],
                ["2020-12-01 05:30:00", 1454],
                ["2020-12-01 06:00:00", 1345],
                ["2020-12-01 06:30:00", 1438],
                ["2020-12-01 07:00:00", 1407],
                ["2020-12-01 07:30:00", 1468],
                ["2020-12-01 08:00:00", 1411],
                ["2020-12-01 08:30:00", 1459],
                ["2020-12-01 09:00:00", 1394],
                ["2020-12-01 09:30:00", 1456],
                ["2020-12-01 10:00:00", 1389],
                ["2020-12-01 10:30:00", 1440],
                ["2020-12-01 11:00:00", 1435],
                ["2020-12-01 11:30:00", 1451],
                ["2020-12-01 12:00:00", 1444],
                ["2020-12-01 12:30:00", 1493],
                ["2020-12-01 13:00:00", 1463],
                ["2020-12-01 13:30:00", 1423],
                ["2020-12-01 14:00:00", 1496],
                ["2020-12-01 14:30:00", 1410],
                ["2020-12-01 15:00:00", 1413],
                ["2020-12-01 15:30:00", 1450],
                ["2020-12-01 16:00:00", 1459],
                ["2020-12-01 16:30:00", 1452],
                ["2020-12-01 17:00:00", 1408],
                ["2020-12-01 17:30:00", 1347],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
          {
            color: "#339BB2",
            name: "teardown",
            data: (() => {
              return [
                ["2020-11-30 22:00:00", 66906],
                ["2020-11-30 22:30:00", 66318],
                ["2020-11-30 23:00:00", 64291],
                ["2020-11-30 23:30:00", 60755],
                ["2020-12-01 00:00:00", 59944],
                ["2020-12-01 00:30:00", 58738],
                ["2020-12-01 01:00:00", 59437],
                ["2020-12-01 01:30:00", 58144],
                ["2020-12-01 02:00:00", 58191],
                ["2020-12-01 02:30:00", 58170],
                ["2020-12-01 03:00:00", 56565],
                ["2020-12-01 03:30:00", 57241],
                ["2020-12-01 04:00:00", 59206],
                ["2020-12-01 04:30:00", 60403],
                ["2020-12-01 05:00:00", 59452],
                ["2020-12-01 05:30:00", 60136],
                ["2020-12-01 06:00:00", 59286],
                ["2020-12-01 06:30:00", 63574],
                ["2020-12-01 07:00:00", 99195],
                ["2020-12-01 07:30:00", 189898],
                ["2020-12-01 08:00:00", 233784],
                ["2020-12-01 08:30:00", 231363],
                ["2020-12-01 09:00:00", 234783],
                ["2020-12-01 09:30:00", 227573],
                ["2020-12-01 10:00:00", 211234],
                ["2020-12-01 10:30:00", 187686],
                ["2020-12-01 11:00:00", 99414],
                ["2020-12-01 11:30:00", 72500],
                ["2020-12-01 12:00:00", 70150],
                ["2020-12-01 12:30:00", 73350],
                ["2020-12-01 13:00:00", 108728],
                ["2020-12-01 13:30:00", 202023],
                ["2020-12-01 14:00:00", 209599],
                ["2020-12-01 14:30:00", 210493],
                ["2020-12-01 15:00:00", 205757],
                ["2020-12-01 15:30:00", 217584],
                ["2020-12-01 16:00:00", 206074],
                ["2020-12-01 16:30:00", 173800],
                ["2020-12-01 17:00:00", 99796],
                ["2020-12-01 17:30:00", 75313],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
        ],
      },

      charts2: {
        title: "Traffic by App/Protocol",
        lineWidth: 1,
        height: 300,
        series: [
          {
            color: "#4FA484",
            name: "DNS:",
            data: (() => {
              return [
                ["2020-11-30 22:00:00", 2346],
                ["2020-11-30 22:30:00", 2350],
                ["2020-11-30 23:00:00", 2346],
                ["2020-11-30 23:30:00", 2326],
                ["2020-12-01 00:00:00", 2347],
                ["2020-12-01 00:30:00", 2345],
                ["2020-12-01 01:00:00", 2356],
                ["2020-12-01 01:30:00", 2350],
                ["2020-12-01 02:00:00", 2346],
                ["2020-12-01 02:30:00", 2343],
                ["2020-12-01 03:00:00", 2355],
                ["2020-12-01 03:30:00", 2348],
                ["2020-12-01 04:00:00", 2350],
                ["2020-12-01 04:30:00", 2377],
                ["2020-12-01 05:00:00", 2349],
                ["2020-12-01 05:30:00", 2348],
                ["2020-12-01 06:00:00", 2319],
                ["2020-12-01 06:30:00", 2355],
                ["2020-12-01 07:00:00", 2346],
                ["2020-12-01 07:30:00", 2381],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
          //Add multiple line
          {
            color: "#D7C6B7",
            name: "HTTP",
            data: (() => {
              return [
                ["2020-11-30 22:00:00", 45690],
                ["2020-11-30 22:30:00", 44717],
                ["2020-11-30 23:00:00", 44698],
                ["2020-11-30 23:30:00", 43876],
                ["2020-12-01 00:00:00", 43411],
                ["2020-12-01 00:30:00", 43283],
                ["2020-12-01 01:00:00", 42752],
                ["2020-12-01 01:30:00", 42501],
                ["2020-12-01 02:00:00", 42889],
                ["2020-12-01 02:30:00", 41977],
                ["2020-12-01 03:00:00", 42324],
                ["2020-12-01 03:30:00", 42569],
                ["2020-12-01 04:00:00", 42623],
                ["2020-12-01 04:30:00", 42763],
                ["2020-12-01 05:00:00", 42693],
                ["2020-12-01 05:30:00", 42483],
                ["2020-12-01 06:00:00", 42179],
                ["2020-12-01 06:30:00", 42925],
                ["2020-12-01 07:00:00", 44107],
                ["2020-12-01 07:30:00", 49461],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
          {
            color: "#B6C75A",
            name: "HTTPS",
            data: (() => {
              return [
                ["2020-11-30 22:00:00", 86064],
                ["2020-11-30 22:30:00", 85759],
                ["2020-11-30 23:00:00", 82113],
                ["2020-11-30 23:30:00", 76282],
                ["2020-12-01 00:00:00", 73922],
                ["2020-12-01 00:30:00", 70781],
                ["2020-12-01 01:00:00", 71522],
                ["2020-12-01 01:30:00", 71153],
                ["2020-12-01 02:00:00", 71559],
                ["2020-12-01 02:30:00", 71049],
                ["2020-12-01 03:00:00", 68369],
                ["2020-12-01 03:30:00", 69797],
                ["2020-12-01 04:00:00", 72825],
                ["2020-12-01 04:30:00", 75604],
                ["2020-12-01 05:00:00", 74156],
                ["2020-12-01 05:30:00", 74952],
                ["2020-12-01 06:00:00", 72683],
                ["2020-12-01 06:30:00", 81236],
                ["2020-12-01 07:00:00", 147211],
                ["2020-12-01 07:30:00", 313217],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
        ],
      },

      barchart: {
        colors: ["#D25B3B"],
        title: "",
        legend: {
          enabled: false,
        },
        
        lineWidth: 20,
        categories: [
          "192.168.50.96",
          "192.168.2.10",
          "222.136.150.234",
          "175.16.52.159",
          "182.112.66.158",
          "202.182.97.197",
          "106.120.213.81",
          "39.149.80.25",
          "42.119.228.166",
          "192.99.6.53",
        ],
        series: [
          {
            color: "#EC9960",
            name: "count",
            data: [60574, 384, 360, 225, 207, 140, 129, 78, 74, 70],
          },
        ],
      },
      dataLayout: {},
      dataTitle: "",
      isEdit: false,
    };
  },
  // Viết hàm get API trả về trang dashboard.
  methods: {
    PDF() {
      const toDataURL = (url) =>
        fetch(url)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              })
          );
      var charts = this.$refs.printchart;
      var exportUrl = "https://export.highcharts.com/";
      var doc = new jsPDF();
      var promises = [];
      var ajaxCalls = [];
      var pageHeight = doc.internal.pageSize.getHeight();
      var yDocPos = 0;
      var k = 0;

      var highcharts = [];
      var tables = [];
      var singleValues = [];

      //Splice type chart
      for (var i = 0; i < charts.length; i++) {
        if (charts[i].chartData.chart.type === "table") {
          tables.push(charts[i]);
        } else if (charts[i].chartData.chart.type === "singleval") {
          singleValues.push(charts[i]);
        } else {
          highcharts.push(charts[i]);
        }
      }

      for (var t = 0; t < tables.length; t++) {
        var columns = [];
        var rows = [];

        for (var key in tables[t].chartData) {
          columns.push(key);
          for (var val in tables[t].chartData[key]) {
            rows.push(val);
          }
        }

        doc.autoTable({
          head: [columns],
          body: [rows],
        });
        doc.addPage();
      }

      for (var s = 0; s < singleValues.length; s++) {
        var title = "" + singleValues[s].chartData.chart.type;
        var value = "" + singleValues[s].chartData.chart.height;
        var description = "" + singleValues[s].chartData.title.text;

        doc.setFontSize(16);
        doc.text(title, 30, 20, {
          align: "center",
        });

        doc.setFontSize(90);
        doc.text(value, doc.internal.pageSize.getWidth() / 2, 50, {
          align: "center",
        });

        doc.setFontSize(16);
        doc.text(description, doc.internal.pageSize.getWidth() / 2, 65, {
          align: "center",
        });
        doc.addPage();
      }

      // Dùng server của Highchart render.
      for (var hc = 0; hc < highcharts.length; hc++) {
        var chart = highcharts[hc];
        ajaxCalls[hc] = Axios.post(exportUrl, {
          options: JSON.stringify(chart.chartData),
          type: "image/png",
          async: true,
        });
      }
      Axios.all(ajaxCalls).then((values) => {
        values.forEach((value) => {
          var imgUrl = exportUrl + value.data;
          promises.push(toDataURL(imgUrl));
        });
        Promise.all(promises).then((values) => {
          values.forEach((value, index) => {
            if (yDocPos > pageHeight - 150) {
              doc.addPage();
              yDocPos = 25;
              k = 0;
            } else {
              yDocPos = 25 + k * 140;
            }
            doc.setFontSize(30);
            doc.text(50, yDocPos, "title for Chart" + index);
            yDocPos += 15;
            doc.addImage(value, "PNG", 20, yDocPos);
            k++;
          });
          doc.save("charts.pdf");
        });
      });

      //}
    },

    calColumnSize: function (noCol) {
      return Math.floor(12 / noCol);
    },

    load_dataLayout() {
      RESTService.get(
        "/services/_ui/searchportal/dashboards/" + "monitoring"
      ).then((response) => {
        this.dataLayout = JSON.parse(response.data.data.content);
        this.dataTitle = response.data.data.title;
      });
    },

    edit_chart: function () {
      if (this.isEdit) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
    },

    save_chart: function () {
      var content = JSON.stringify(this.dataLayout);
      RESTService.put("/services/_ui/searchportal/dashboards/monitoring", {
        content: content,
      }).then((response) => {
        alert(response.status);
        this.isEdit = false;
      });
    },
  },
  created() {
    this.load_dataLayout();
  },
};
</script>

<style>
.smallrange {
  padding: 10px 0px 0px 0px;
}
</style>