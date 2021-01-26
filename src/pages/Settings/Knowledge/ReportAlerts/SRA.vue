<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
        <h2 class="page-title">
          <span>Searches, Reports, and Alerts</span>
        </h2>
      </b-col>
      <b-col>
        <div>
          <b-button v-b-modal.modal2 variant="default" style="float: right;">Create Report</b-button>
          <CreateReport />
          <b-button
            v-b-modal.new-alert
            variant="default"
            style="float: right; margin-right: 20px"
          >Create Alert</b-button>
          <CreateAlert />
        </div>
      </b-col>
    </b-row>

       <v-card style="background-color: transparent">
      <Widget>
        <v-card-title style="height: 70px">
          <b-row>
            <b-col cols="3" md="auto" stylee="border-color:white">
              <b-dropdown style="border-color:white;width:100%;color:#a6a9c3;" :text="type" ref="type" variant="default">
                 <b-dropdown-item v-for="item in items" :key=item.text v-on:click="changeItem('type',item.text)">{{ item.text }}</b-dropdown-item>
              </b-dropdown>
            </b-col>
            <b-col cols="3" md="auto">
              <b-dropdown style="border-color:white;width:100%;color:#a6a9c3;" :text="app" ref="app" variant="default">
                 <b-dropdown-item v-for="app in apps" :key=app.text v-on:click="changeItem('app',app.text)">{{ app.text }}</b-dropdown-item>
                  </b-dropdown>
            </b-col>
            <b-col cols="1" md="auto">
              <b-dropdown style="border-color:white;width:100%;color:#a6a9c3;" :text="filter_by_owner" ref="filter_by_owner" variant="default">
                <b-dropdown-item v-for="owner in owners" :key=owner.text v-on:click="changeItem('filter_by_owner',owner.text)">{{ owner.text }}</b-dropdown-item>
              </b-dropdown>
            </b-col>


            <b-col cols="3"
              ><div>
                <v-text-field
                  style="width: 80%; min-width: 200px"
                  :dark="true"
                  v-model="search"
                  append-icon="mdi-magnify"
                  placeholder="filter"
                  outlined
                  dense
                ></v-text-field></div
            ></b-col>

            <b-col>
              <div style="float: right">
                <b-dropdown
                  style="color: #a6a9c3"
                  :text="itemsPerPage"
                  ref="Page"
                  variant="default"
                >
                  <b-dropdown-item
                    v-for="pageItem in pageItems"
                    :key="pageItem.text"
                    v-on:click="changeItem('Page', pageItem.text)"
                    >{{ pageItem.text }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </b-col>
          </b-row>
        </v-card-title>

        <b-row>
          <b-col>
            <div style="float: right; margin-right: 15px">
              <b-pagination
                v-model="page"
                :total-rows="totalRecords"
                :per-page="itemsPerPage"
              ></b-pagination>
            </div>
          </b-col>
        </b-row>

        <DataTable
          :_search="search"
          :headers="headers"
          :records="records"
          :page="page"
          :single_expand="singleExpand"
          :show_expand="true"
          :expanded="expanded"
          :itemsPerPage="parseInt(itemsPerPage)"
        ></DataTable>
      </Widget>
    </v-card>
    

  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import CreateReport from "./CreateReport";
import CreateAlert from "./CreateAlert";
import DataTable from "@/components/DataTables/DataTable";

export default {
  name: "Tables",
  components: { DataTable, Widget, CreateReport, CreateAlert },

  data () {
    
    return {
      page: 1,
      type: 'all',
      app: 'v-siem 1',
      filter_by_owner: 'user',
      totalRecords: 20,
      expanded: [],
      itemsPerPage: '10 per page',
      search: '',
      singleExpand: true,
      singleSelect: false,
      selected: [],

      items: [
        {text: 'all'},
        {text: 'reports'},
        {text: 'alerts'},
      ],

      apps: [
        {text: 'v-siem 1'},
        {text: 'v-siem 2'},
        {text: 'v-siem 3'}
      ],
            owners: [
        {text: 'admin'},
        {text: 'mentor'},
        {text: 'user'}
      ],
            types: [
        {text: 'alert'},
        {text: 'report'},
      ],



      pageItems: [
        {value: 5, text: '5 per page'},
        {value: 10, text: '10 per page'},
        {value: 15, text: '15 per page'}
      ],
      headers: [
          { text: '', value: 'data-table-expand'},
          { text: 'Title', value: 'title' },
          { text: 'Type', value: 'type' },
          { text: 'Action', value: 'action' },
          { text: 'App', value: 'app' },
          { text: 'Owner', value: 'owner' },
          { text: 'Sharing', value: 'sharing' }
      ],
      records: [
          {
            title: 'Alert',
            type: 'data model',
            app: 'V Threat',
            owner: 'thangbv',
            sharing: 'true',
          }   
      ]
    }
  
  },
  
  methods: {

    changeItem: function(refName,item){
      if(refName === 'type'){
        this.type = item;
      }else if(refName === 'app'){
        this.app = item;
      }else if(refName === 'filter_by_owner'){
        this.filter_by_owner = item;
      }
    }
  }

};
</script>

