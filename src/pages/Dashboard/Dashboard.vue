<template>
  <div>
    <div ref="dashboard" v-if="!isEdit">
      <b-row>
        <b-col>
          <h1 class="page-title">{{ this.dataTitle }}</h1>
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
          lg="2"
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
        <b-col lg="6" xs="6">
          <Widget
            ><LineChart
              :title="charts.title"
              :height="charts.height"
              :lineWidth="charts.lineWidth"
              :series="charts.series"
              :legend="charts.legend"
          /></Widget>
        </b-col>
        <b-col lg="6" xs="6"
          ><Widget
            ><BarChart
              :title="barchart.title"
              :legend="barchart.legend"
              :categories="barchart.categories"
              :series="barchart.series"
              :pointWidth="barchart.pointWidth" /></Widget
        ></b-col>
      </b-row>
      <b-row>
        <b-col lg="12" xs="6">
          <Widget :title="'Top 10 Severity Intrusion Alerts by time'">
            <b-table
              striped
              class="b-table"
              :items="tabletop10.items"
              :fields="tabletop10.fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              responsive="sm"
            ></b-table>
          </Widget>
        </b-col>
      </b-row>
      
      <!--style="height: 400px; margin-top: 40px" -->
      <b-row v-for="(row, index) in dataLayout.charts" v-bind:key="index">
        <b-col
          xs="6"
          v-bind:lg="calColumnSize(row.length)"
          v-for="(col, index) in row"
          v-bind:key="index"
        >
          <div v-if="!isEdit">
            <Widget :title="col.name">
              <!--<Chart
                :chartData="col.data"
                ref="printchart"
                id="exportchart"
              ></Chart>-->
              <BaseChart
                :chartData="col.data"
                ref="printchart"
                id="exportchart"
              />
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
    </div>
    <div v-if="isEdit">
      <b-row>
        <b-col>
          <h1 class="page-title">Edit Dashboard</h1>
        </b-col>

        <b-col>
          <div style="float: right">
            <Button @event-click="edit_chart" label="Cancel"></Button>
            <Button label="Save" @event-click="save_chart"></Button>
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
    <!--
    <div>
        <b-row>
          <b-col xs="6"><WorldMap /></b-col>
          <b-col xs="6"><AttackMap /></b-col>
        </b-row>
    </div>
    -->
  </div>
</template>
<script>
//import Chart from "./Chart";
//import LiveChart from "../../components/ChartViz/LiveChart";
import RESTService from "../../services/rest.service";
import jsPDF from "jspdf";
//import autoTable from 'jspdf-autotable'
import Axios from "axios";
import Widget from "@/components/Widget/Widget";
import "jspdf-autotable";
import vueJsonEditor from "vue-json-editor";

//Highchart lib
//import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
exporting(Highcharts);
exportData(Highcharts);

import LineChart from "../../components/BaseChart/LineChart";
import SingleValue from "../../components/SingleValue/SingleValue.vue";
import Button from "../../components/Button/Button.vue";
//import WorldMap from "./WorldMap"


import BarChart from "../../components/ChartVisualize/BarChart";
import BaseChart from "../../components/BaseChart/BaseChart"


export default {
  name: "Dashboard",
  components: {
    //Chart,
    //LiveChart,
    Widget,
    vueJsonEditor,
    Button,
    SingleValue,
    LineChart,
    BarChart,
    BaseChart,
  },

  props: ["propId"],

  data() {
    return {
      singleValues: [
        {
          title: "",
          value: 0,
          trend: "Incidents",
          status: "background: #8bbc21",
        },
        {
          title: "",
          value: 0,
          trend: "Alerts",
          status: "background: #8bbc21",
        },
        // {
        //   title: "",
        //   value: 0,
        //   trend: "Attacker Source",
        //   status: "background: #8bbc21",
        // },
        {
          title: "",
          value: 0,
          trend: "Malware Events",
          status: "background: #8bbc21",
        },
        {
          title: "",
          value: 2,
          trend: "User Login",
          status: "background: #f28f43",
        },
        {
          title: "",
          value: 5,
          trend: "Host/Device",
          status: "background: #77a1e5",
        },
        {
          title: "",
          value: 1,
          trend: "Site Failure",
          status: "background: #f28f43",
        },
      ],

      barchart: {
        pointWidth: "30",
        title: "Alerts by Severity",
        legend: {
          reversed: true,
          symbolHeight: 15,
          symbolWidth: 15,
          symbolRadius: 0,
          itemStyle: {
            color: "#b4b5bf",
          },
        },
        categories: [""],
        series: [
          {
            color: "#D25B3B",
            name: "critical",
            data: [85],
          },
          {
            color: "#FF8800",
            name: "high",
            data: [348],
          },
          {
            color: "#F8EE77",
            name: "low",
            data: [26],
          },
          {
            color: "#F0BE1B",
            name: "medium",
            data: [24],
          },
        ],
      },

      charts: {
        title: "Intrusion Alerts over Time",
        lineWidth: 2,
        height: 300,
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          symbolHeight: 100,
          borderWidth: 0,
          itemStyle: {
            color: "#b4b5bf",
          },
        },
      
        series: [
          //Add multiple line
          {
            marker: {
              enabled: false,
            },
            color: "#AF575A",
            name: "critical",
            data: (() => {
              return [
                ["2020-12-01 06:00:00", 1, 2],
                ["2020-12-01 06:30:00", 1],
                ["2020-12-01 07:00:00", 2],
                ["2020-12-01 07:30:00", 1],
                ["2020-12-01 08:00:00", 0],
                ["2020-12-01 08:30:00", 1],
                ["2020-12-01 09:00:00", 0],
                ["2020-12-01 09:30:00", 0],
                ["2020-12-01 10:00:00", 0],
                ["2020-12-01 10:30:00", 0],
                ["2020-12-01 11:00:00", 1],
                ["2020-12-01 11:30:00", 5],
                ["2020-12-01 12:00:00", 1],
                ["2020-12-01 12:30:00", 1],
                ["2020-12-01 13:00:00", 1],
                ["2020-12-01 13:30:00", 0],
                ["2020-12-01 14:00:00", 0],
                ["2020-12-01 14:30:00", 1],
                ["2020-12-01 15:00:00", 1],
                ["2020-12-01 15:30:00", 1],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1], point[2]];
              });
            })(),
          },
          {
            marker: {
              enabled: false,
            },
            color: "#4FA484",
            name: "high",
            data: (() => {
              return [
                ["2020-12-01 06:00:00", 17],
                ["2020-12-01 06:30:00", 29],
                ["2020-12-01 07:00:00", 14],
                ["2020-12-01 07:30:00", 21],
                ["2020-12-01 08:00:00", 10],
                ["2020-12-01 08:30:00", 0],
                ["2020-12-01 09:00:00", 28],
                ["2020-12-01 09:30:00", 14],
                ["2020-12-01 10:00:00", 13],
                ["2020-12-01 10:30:00", 13],
                ["2020-12-01 11:00:00", 43],
                ["2020-12-01 11:30:00", 21],
                ["2020-12-01 12:00:00", 13],
                ["2020-12-01 12:30:00", 35],
                ["2020-12-01 13:00:00", 27],
                ["2020-12-01 13:30:00", 0],
                ["2020-12-01 14:00:00", 27],
                ["2020-12-01 14:30:00", 14],
                ["2020-12-01 15:00:00", 7],
                ["2020-12-01 15:30:00", 14],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
          {
            marker: {
              enabled: false,
            },
            color: "#EDD051",
            name: "low",
            data: (() => {
              return [
                ["2020-12-01 06:00:00", 0],
                ["2020-12-01 06:30:00", 0],
                ["2020-12-01 07:00:00", 0],
                ["2020-12-01 07:30:00", 0],
                ["2020-12-01 08:00:00", 0],
                ["2020-12-01 08:30:00", 0],
                ["2020-12-01 09:00:00", 4],
                ["2020-12-01 09:30:00", 0],
                ["2020-12-01 10:00:00", 0],
                ["2020-12-01 10:30:00", 0],
                ["2020-12-01 11:00:00", 1],
                ["2020-12-01 11:30:00", 0],
                ["2020-12-01 12:00:00", 0],
                ["2020-12-01 12:30:00", 0],
                ["2020-12-01 13:00:00", 0],
                ["2020-12-01 13:30:00", 0],
                ["2020-12-01 14:00:00", 0],
                ["2020-12-01 14:30:00", 0],
                ["2020-12-01 15:00:00", 0],
                ["2020-12-01 15:30:00", 0],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
          {
            marker: {
              enabled: false,
            },
            color: "#3A3E6B",
            name: "medium",
            data: (() => {
              return [
                ["2020-12-01 06:00:00", 4],
                ["2020-12-01 06:30:00", 3],
                ["2020-12-01 07:00:00", 2],
                ["2020-12-01 07:30:00", 20],
                ["2020-12-01 08:00:00", 11],
                ["2020-12-01 08:30:00", 7],
                ["2020-12-01 09:00:00", 1],
                ["2020-12-01 09:30:00", 6],
                ["2020-12-01 10:00:00", 0],
                ["2020-12-01 10:30:00", 0],
                ["2020-12-01 11:00:00", 0],
                ["2020-12-01 11:30:00", 0],
                ["2020-12-01 12:00:00", 0],
                ["2020-12-01 12:30:00", 1],
                ["2020-12-01 13:00:00", 3],
                ["2020-12-01 13:30:00", 2],
                ["2020-12-01 14:00:00", 1],
                ["2020-12-01 14:30:00", 0],
                ["2020-12-01 15:00:00", 0],
                ["2020-12-01 15:30:00", 0],
              ].map(function (point) {
                return [Date.parse(point[0]), point[1]];
              });
            })(),
          },
        ],
      },

      tabletop10: {
        sortBy: "age",
        sortDesc: false,
        fields: [
          { key: "#",},
          { key: "src", sortable: true },
          { key: "dest", sortable: true },
          { key: "dest_port", sortable: true },
          { key: "attack", sortable: true },
          { key: "severity", sortable: true },
          { key: "vendor_product", sortable: true },
          { key: "time", sortable: true },
        ],
        items: [
          {
            '#': "1",
            src: "172.16.10.226",
            dest: "",
            dest_port: "",
            attack: "scan_port",
            severity: "high",
            vendor_product: "Fortinet Firewall",
            time: "2020-12-02",

            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "2",
            src: "",
            dest: "VIC-webBanantoan",
            dest_port: "",
            attack: "Host With High Number Of Listening Ports",
            severity: "low",
            vendor_product: "",
            time: "2020-12-02 10:53:50",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "3",
            src: "139.59.0.9",
            dest: "192.168.2.12",
            dest_port: "80",
            attack: "Apache.Struts.2.OGNL.Script.Injection",
            severity: "critical",
            vendor_product: "Fortinet Firewall",
            time: "2020-12-02 10:53:18",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "4",
            src: "130.61.242.43",
            dest: "",
            dest_port: "",
            attack: "Abnormally High Number of HTTP Method Events By Src",
            severity: "low",
            vendor_product: "",
            time: "2020-12-02 10:51:40",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "5",
            src: "130.61.242.43",
            dest: "",
            dest_port: "",
            attack: "Abnormally High Number of HTTP Method Events By Src",
            severity: "low",
            vendor_product: "",
            time: "2020-12-02 10:46:06",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "6",
            src: "192.168.50.96	",
            dest: "",
            dest_port: "",
            attack: "scan_port",
            severity: "high",
            vendor_product: "Fortinet Firewall",
            time: "2020-12-02 10:16:54",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "7",
            src: "",
            dest: "VIC-webBanantoan",
            dest_port: "",
            attack: "Host With High Number Of Listening Ports",
            severity: "low",
            vendor_product: "",
            time: "2020-12-02 10:14:32",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "8",
            src: "	139.59.0.9",
            dest: "192.168.2.12",
            dest_port: "80",
            attack: "ThinkPHP.Controller.Parameter.Remote.Code.Execution",
            severity: "	critical",
            vendor_product: "Fortinet Firewall",
            time: "	2020-12-02 10:14:00",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "9",
            src: "130.61.242.43",
            dest: "",
            dest_port: "",
            attack: "Abnormally High Number of HTTP Method Events By Src",
            severity: "low",
            vendor_product: "",
            time: "2020-12-02 10:12:22",
            _cellVariants: {
              severity: "dark",
            },
          },
          {
            '#': "10",
            src: "130.61.242.43",
            dest: "",
            dest_port: "",
            attack: "Abnormally High Number of HTTP Method Events By Src",
            severity: "low",
            vendor_product: "",
            time: "2020-12-02 10:09:02",
            _cellVariants: {
              severity: "dark",
            },
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
    getMaxHeight: function(){

    },
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
      alert(charts.length);
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
      // for (var i = 0; i < this.singleValues.length; i++) {
      //   alert(this.singleValues[i].value);
      // }
      for (var s = 0; s < this.singleValues.length; s++) {
        var title = "" + this.singleValues[s].title;
        var value = "" + this.singleValues[s].value;
        var description = "" + this.singleValues[s].trend;

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
        doc.rect(35, 20, 135, 50);
        doc.addPage();
      }

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
        "/services/_ui/searchportal/dashboards/" + this.propId
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
      RESTService.put("/services/_ui/searchportal/dashboards/dashboard", {
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

