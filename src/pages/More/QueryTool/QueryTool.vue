<template>
  <section>
    <b-row>
      <b-col>
        <h1 class="page-title">
          <span class="fw-semi-bold">{{$t("content.query")}}</span>
        </h1>
      </b-col>
      <b-col>
        <div class="float-right">
          <b-dropdown v-if="isShow" variant="inverse" class="mr-xs" size="sm" :text="$t('button.save_as')" right>
            <b-dropdown-item>Report</b-dropdown-item>
            <b-dropdown-item>Dashboard Panel</b-dropdown-item>
            <b-dropdown-item>Alert</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item>Event Type</b-dropdown-item>
          </b-dropdown>
          <b-button v-on:click="closeBtn" variant="default" class="mr-xs" size="sm">{{ $t('button.'+status) }}</b-button>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table style="border-spacing:0px;">
          <tbody>
            <tr>
              <td width="100%">
                <div style="color:rgb(224, 225, 230);width:100%;" contenteditable="true" ref="search" id="search" v-on:keyup.enter="search_query" v-on:keyup="HighlightKeyword($event)"></div>
              </td>
              <!--<td style="vertical-align: top;">            
                <b-btn variant="default" style="border-radius:0" :text="$t('button.save_as')">
                  <div style="padding-left: 30px; padding-top: 20px;padding-bottom: 20px;padding-right: 30px;">
                    <table style="width:800px">
                      <thead>
                        <tr>
                          <th scope="col">REAL-TIME</th>
                          <th scope="col">RELATIVE</th>
                          <th scope="col"></th>
                          <th scope="col">OTHER</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">
                            <a href="#">30 second window</a>
                          </td>
                          <td>
                            <a href="#">Today</a>
                          </td>
                          <td>
                            <a href="#">Last 15 minutes</a>
                          </td>
                          <td>
                            <a href="#">All time</a>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <a href="#">1 minitue window</a>
                          </td>
                          <td>
                            <a href="#">Week to date</a>
                          </td>
                          <td>
                            <a href="#">Last 60 minutes</a>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <a href="#">30 minutes window</a>
                          </td>
                          <td>
                            <a href="#">Today</a>
                          </td>
                          <td>
                            <a href="#">Today</a>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <a href="#">30 second window</a>
                          </td>
                          <td>
                            <a href="#">Today</a>
                          </td>
                          <td>
                            <a href="#">Today</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-btn>
              </td>-->
              <td style="vertical-align: top;">
                <b-btn variant="default" @click="search_query(data_query)" style="border-radius:0">
                  <i class="la la-search" />
                </b-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
        
    </b-row>
    <b-row>
      <b-col>
        <b-alert variant="danger" dismissible v-model="queryError" fade>
          {{ msgError }}
        </b-alert>
      </b-col>
    </b-row>
  <b-row>
  
</b-row>

    <b-row>
      <b-col>
        <div class="float-left">
          <b-dropdown variant="default" class="mr-xs" size="sm" :text="$t('content.no_event_example')" right>
            <b-dropdown-item>1:10</b-dropdown-item>
            <b-dropdown-item>1:10</b-dropdown-item>
            <b-dropdown-item>1:10</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item>Custom</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
      <b-col>
        <div class="float-right">
          <b-dropdown variant="default" class="mr-xs" size="sm" :text="$t('button.verbose_mode')" right>
            <b-dropdown-item>1:10</b-dropdown-item>
            <b-dropdown-item>1:10</b-dropdown-item>
            <b-dropdown-item>1:10</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item>Custom</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
    <div v-if="isSearch"><b-row>
      <b-col>
      <b-tabs >
        <b-tab title="Events" @click="changeTabs('events')" :disabled="disabledEvents">
          <b-row>
            <b-col>
              <b-pagination
              v-model="page"
              :total-rows="totalRecords"
              :per-page="itemsPerPage"
             ></b-pagination>
            </b-col>
            <b-col cols="0.5" style="text-align:right;">
              <v-btn text small @click="showField" v-if="isShowField"><v-icon style="color:white;margin-right:0px;" >fa fa-angle-double-right</v-icon></v-btn>
              <v-btn text small @click="showField" v-if="!isShowField"><v-icon style="color:white;margin-right:0px;" >fa fa-angle-double-left</v-icon></v-btn>
            </b-col>
          </b-row>
        <DataTable
          itemKey="iterator"
          :_search="search"
          :headers="headers"
          :records="records"
          :single_select="singleSelect"
          :single_expand="singleExpand"
          :show_expand=true
          :show_select=false
          :page="page"
          :itemsPerPage="parseInt(itemsPerPage)"
          :expanded="expanded"
        >
        </DataTable></b-tab>
        <b-tab @click="changeTabs('statistic')" title="Statistics" :disabled="disabledStatistic">
          <b-row>
            <b-col>
              <b-pagination
              v-model="page"
              :total-rows="totalRecords"
              :per-page="itemsPerPage"
             ></b-pagination>
            </b-col>
          </b-row>
        <DataTable
          itemKey="iterator"
          :_search="search"
          :headers="StatisticHeaders"
          :records="StatisticRecords"
          :single_select="singleSelect"
          :single_expand="singleExpand"
          :show_expand=false
          :show_select=false
          :page="page"
          :itemsPerPage="parseInt(itemsPerPage)"
          :expanded="expanded"
        >
        </DataTable></b-tab>
        <b-tab @click="changeTabs('visualization')" title="Visualization" :disabled="disabledVisualization">
            <b-row>
              <b-col>
                <b-button variant="default" size="sm" id="showCharts">{{ NameChartChoosed }}</b-button>
              </b-col>
            </b-row>
            <b-row v-if="ShowChart">
              <b-col>
                <ChartVisualize :chartOptions="chartOptions"></ChartVisualize>
              </b-col>
            </b-row>
        </b-tab> 
      </b-tabs>
    </b-col>
    <b-col cols="2" v-if="isShowField&&isEventTabs" style="margin-top:45px;">
      <Widget>
        <v-list dense dark style="background-color:transparent;">
          <v-subheader><b>Seleted Field</b></v-subheader>
          <v-list-item v-for="(item,i) in field" :key="i" @click="selectField(item)">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </Widget>
    </b-col>
    </b-row>
    <b-popover variant="default" target="showCharts" :show.sync="ShowMenuChart" placement="bottom" style="">
      <template v-slot:title><div style="text-align:center;">Data Visualization</div></template>
      <b-row style="margin-top:5px;height:50px;">
        <b-col cols="auto" style="padding-right:0px;"><b-button id="area"  @click="ChooseChart($event)" class="styleChart" ><img style="height:100%;width:100%" src="../../../assets/charts/area.png" /></b-button></b-col>
        <b-col cols="auto" style="padding-left:5px;padding-right:5px;"><b-button id="bar" class="styleChart" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/bar.png" /></b-button></b-col>
        <b-col cols="auto" style="padding-left:0px;"><b-button class="styleChart" id="column" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/column.png" /></b-button></b-col>
      </b-row>
      <b-row style="margin-top:5px;height:50px;">
        <b-col cols="auto" style="padding-right:0px;"><b-button class="styleChart" id="fillerGauge" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/fillerGauge.png" /></b-button></b-col>
        <b-col cols="auto" style="padding-left:5px;padding-right:5px;"><b-button class="styleChart" id="line" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/line.png" /></b-button></b-col>
        <b-col cols="auto" style="padding-left:0px;"><b-button class="styleChart" id="markerGauge" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/markerGauge.png" /></b-button></b-col>
      </b-row>
      <b-row style="margin-top:5px;height:50px;">
        <b-col cols="auto" style="padding-right:0px;"><b-button class="styleChart" id="pie" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/pie.png" /></b-button></b-col>
        <b-col cols="auto" style="padding-left:5px;padding-right:5px;"><b-button class="styleChart" id="radialGauge" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/radialGauge.png" /></b-button></b-col>
        <b-col cols="auto" style="padding-left:0px;"><b-button class="styleChart" id="scatter" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/scatter.png" /></b-button></b-col>
      </b-row>
      <b-row style="margin-top:5px;height:50px;">
        <b-col cols="auto" style="padding-right:0px;"><b-button class="styleChart" id="single value" @click="ChooseChart($event)"><img style="height:100%;width:100%" src="../../../assets/charts/singlevalue.png" /></b-button></b-col>
      </b-row>
    </b-popover>
    </div>
  </section>
</template>

<script>
//import SingleVal from "../../../components/SingleValue/SingleValue.vue";
import DataTable from "@/components/DataTables/DataTable";
import RESTService from "../../../services/rest.service";
import Widget from "@/components/Widget/Widget";
import ChartVisualize from "@/components/ChartVisualize/ChartVisualize";
//import { uniqueKey } from 'highcharts';

export default {
  components: {
    DataTable, Widget, ChartVisualize
  },
  name: "Search",
  data () {
    
    return {
      //KeyWords: ["INDEX", "AGGS", "GROUP", "BY"],
      chartOptions: {
        chart: {
          type: 'column',
          height: 350,
          backgroundColor: "transparent"
        },
        exporting:{
          enabled: false
        },
        plotOptions: {},
        xAxis:{
          categories:[],
          crosshair: true
        },
        yAxis:{
          min: 0,
          title: {
            enabled: false
          },
          gridLineColor: "#040620",
        },
        title:{
          text: undefined
        },
        credits: {
          enabled: false
        },
        series: []
      },
      ShowMenuChart: false,
      ShowChart: false,
      NameChartChoosed: 'Chart',
      disabledEvents: false,
      disabledStatistic: true,
      disabledVisualization: true,
      msgError: '',
      queryError: false,
      isSearch: false,
      isShowField: false,
      isShow: true,
      field: [],
      isEventTabs:true,
      status: 'close',
      page: 1,
      totalRecords: 0,
      expanded: [],
      itemsPerPage: '10 per page',
      search: '',
      singleExpand: true,
      singleSelect: false,
      selected: [],
      data_query: {
        search: '',
        earliest: '*',
        lastest: '*',
      },
      items: [
        {text: 'All'},
        {text: 'Reports'},
        {text: 'Alerts'},
      ],
      apps: [
        {text: 'V-SIEM 1'},
        {text: 'VISEM APP 2'},
        {text: 'VISEM APP 3'}
      ],
            owners: [
        {text: 'admin'},
        {text: 'mentor'},
        {text: 'user'}
      ],
      pageItems: [
        {value: 5, text: '5 per page'},
        {value: 10, text: '10 per page'},
        {value: 15, text: '15 per page'}
      ],
      headers: [
          { text: '', value: 'data-table-expand'},
          { text: 'Time', value: '@timestamp' },
          { text: 'Event', value: '_raw' },
      ],
      StatisticHeaders: [],
      EventRecords: [],
      StatisticRecords: []
    }
  
  },
  
  methods: {
    HighlightKeyword: function(event){
      const keywords = ["INDEX", "AGGS", "GROUP", "BY", "AS", "SUM", "SEARCH"];
      //const suggestwords = ["SEARCH", "AGGS GROUP", "AGGS DATE_HISTOGRAM", "AGGS HISTOGRAM", "AGGS IP_RANGE", "AGGS SUM", "AGGS MAX", "AGGS MIN", "AGGS AVG", "AGGS COUNT_CARDI", "AGGS MEDIAN", "SUM", "AVG", "SORT", "SELECT BUCKET"];
      var search = document.getElementById("search");
      if(event.keyCode == 32 || event.keyCode == 220 || event.keyCode == 13){
        var newHTML = "";
        let text = this.$refs['search'].innerText.replace(/[\s]+/g, " ").trim().split(" ");
        text.forEach(function(e){
          if (keywords.indexOf(e.trim().toUpperCase()) > -1){
            newHTML += "<span style='color:rgb(0, 188, 212)'>" + e + "&nbsp;</span>";
          }else if(e.trim() === "|"){
            e = "<br>|";
            newHTML += "<span style='color:rgb(224, 225, 230)'>" + e + "&nbsp;</span>";
            //newHTML += "<span style='color:rgb(224, 225, 230)'></span>";     
          }
          else{
            newHTML += "<span style='color:rgb(224, 225, 230)'>" + e + "&nbsp;</span>";
          }
        });
        search.focus();
        this.$refs['search'].innerHTML = newHTML;
        var range = document.createRange();
        var selection = window.getSelection();
        let len = search.childNodes.length;
        let LastChild = search.childNodes[len-1];
        if(LastChild.innerHTML === "<br>|&nbsp;"){
          range.setStart(LastChild,2);
        }else{
          range.setStart(LastChild, 1);
        }
        
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
      changeItem: function(refName,item){
      if(refName != 'Page'){
      this.$refs[refName].text = refName+': '+item;
      }else{
        this.itemsPerPage = item;
      }
    },
    dismissAlert: function(){
      this.queryError = false;
      return true;
    },
    selectField: function(field){
      this.data_query.search+=" "+field+"=";
    },
    changeTabs: function(tab){
      if(tab=="events"){
        this.isEventTabs = true;
      }
      else{
        this.isEventTabs = false;
      }
    },
    showField: function(){
      if(this.isShowField){
        this.isShowField = false;
      }
      else{
        this.isShowField = true;
      }
    },
    search_query: function(){
      var data = {
        search: this.$refs['search'].innerText.replace(/[\s]+/g, " ").trim(),
        earliest: '*',
        lastest: '*'
      };
      this.dismissAlert();
      var isStatistic = false;
      this.disabledEvents = false;
      this.disabledStatistic = true;
      this.disabledVisualization = true;
      this.isEventTabs = true;
      if(data.search.trim().includes("AGGS")){
        isStatistic = true;
        this.disabledEvents = true;
        this.disabledStatistic = false;
        this.disabledVisualization = false;
        this.isEventTabs = false;
      }
      this.isSearch=false;
      this.records = [];
      this.field= [];
      
      RESTService.post("/services/search/jobs",data).then(
        (response)=>{
          var sid = response.data.sid;
          var interval= setInterval(()=>{
            RESTService.get("/services/search/jobs/"+sid+"/results").then(
              (response)=>{
                if(response.data.state=="finalized"){
                  this.totalRecords = response.data.total;
                  if(!isStatistic){
                    for(var [i,val] of response.data.data.results.entries()){
                      this.field = Object.keys(val);
                      var x={};
                      for(var k of this.field){
                        x[k]=val[k];
                      }
                      x['iterator']=i;
                      this.records.push(x);
                    }
                      clearInterval(interval);
                      this.isSearch = true;
                  }else{
                      this.StatisticHeaders=[];
                      this.StatisticRecords=[];
                      var data = response.data.data.results;
                      if(response.data.total==1){
                        data = [data];
                      }
                      var headers = Object.keys(data[0]);
                      for(let i of headers){
                        this.StatisticHeaders.push({text: i, value: i})
                      }
                      for(let val of data){
                        let x={};
                        for(let k of headers){
                          x[k]=val[k];
                        }
                        //x['iterator']=i;
                        this.StatisticRecords.push(x);
                      }
                      this.isSearch = true;
                      clearInterval(interval);
                  }
                }
              }
              ).catch((error)=>{
                  this.queryError = true;
                  this.msgError = error.response.data.error.error.type;
                  //alert('ahihi'+error);
                  clearInterval(interval);
                });
            },1000)
          }).catch(function(){
        });
    },

    closeBtn: function(){
      if(this.isShow){
        this.isShow = false
        this.status = 'open';
      }else{
        this.isShow = true
        this.status = 'close';
      }
    },

    ChooseChart: function(event){
      this.ShowMenuChart = false;
      this.ShowChart = true;
      let id = event.currentTarget.id;
      this.NameChartChoosed = id+' chart';
      this.chartOptions.chart.type=id;
      let keys = Object.keys(this.StatisticRecords[0]);
      if(id=="pie"){
        this.chartOptions.plotOptions = {
          pie: {
              allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        }
        let data=[{
          name:'',
          colorByPoint: true,
          data:[]
        }];
        for(let i of this.StatisticRecords){
          let x = {name:i[keys[1]], y:i[keys[0]]};
          data[0].data.push(x);
        }
        this.$set(this.chartOptions,"series",data);
      }
      else if(id=="single value"){
        //let header = this.StatisticHeaders[0].text;
        //alert(JSON.stringify(this.StatisticRecords));
        let data = this.StatisticRecords[0];
        let x = {name:Object.keys(data)[0], data:Object.values(data)[0]};
        this.$set(this.chartOptions,"series",x);
        //alert(JSON.stringify(this.chartOptions));
      }
      else{
        let data = [];
        let xaxis = {
          categories: [keys[1]],
          crosshair: true
        };
        for(let i of this.StatisticRecords){
          let x = {name:i[keys[1]], data:[i[keys[0]]]};
          data.push(x);
        }
        
        this.$set(this.chartOptions,"series",data);
        this.$set(this.chartOptions,"xAxis",xaxis);
        //alert(JSON.stringify(this.chartOptions));
      }  
    },
    
},

mounted() {
  /*var search = document.getElementById("search");
  //var currentFocus;
  const suggestwords = ["SEARCH", "AGGS GROUP", "AGGS DATE_HISTOGRAM", "AGGS HISTOGRAM", "AGGS IP_RANGE", "AGGS SUM", "AGGS MAX", "AGGS MIN", "AGGS AVG", "AGGS COUNT_CARDI", "AGGS MEDIAN", "SUM", "AVG", "SORT", "SELECT BUCKET"];
  search.addEventListener('keyup', function(){
    var a,b,i,val = search.innerText;
    //currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("class", "autocomplete-items");
    search.parentNode.appendChild(a);
    for(i=0;i<suggestwords.length;i++){
      if(suggestwords[i].substring(0,val.length).toUpperCase() == val.toUpperCase()){
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + suggestwords[i].substring(0, val.length) +"</strong>";
        b.innerHTML += suggestwords[i].substring(val.length);
        b.innerHTML += "<input type='hidden' value='" + suggestwords[i] +"'>";
        b.addEventListener('click', function(){
          search.innerHTML = b.getElementByTagName("input")[0].value;
        });
        a.appendChild(b);
      }
    }
  });*/
}

};
</script>

<style>
  #search{
    width: 90%;
    padding: 10px;
    background-color: #444;
    color: white;
    font-size: 14px;
    font-family: monospace;
  }

  .styleChart{
    height: 50px;
    width: 70px;
  }
  .styleColumn{
    padding-left: 0px;
    padding-right: 0px;
  }
  .popover-body{
    height: 260px;
  }

  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    top: 100%;
    left: 0;
    right: 0;
  }

  .autocomplete-active {
    background-color: DodgerBlue !important; 
    color: #ffffff; 
  }

  .autocomplete-items div:hover {
    background-color: #e9e9e9; 
  }

</style>

