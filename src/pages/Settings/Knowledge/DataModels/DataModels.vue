<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
        <h2 class="page-title">
          <span>Data Models</span>
        </h2>
      </b-col>
      <b-col>

        <div>
          <b-button v-b-modal.new-data-model variant="default" style="float: right;">New Data Model</b-button>
          <NewDataModel />

          <b-button
            v-b-modal.upload-data-model
            variant="default"
            style="float: right; margin-right: 20px"
          >Upload Data Model</b-button>
          <UploadDataModel />
        </div>
      </b-col>
    </b-row>
    <v-card style="background-color: transparent">
      <Widget>
        <v-card-title style="height: 70px">
          <b-row>
            <b-col cols="5" xs="auto" lg="auto" md="auto">
              
              <b-dropdown
                :text="app"
                ref="App"
                variant="default"
                style="color: white"
              >
                <b-dropdown-item
                  v-for="a in apps"
                  :key="a.text"
                  v-on:click="changeItem('App', a.text)"
                  >{{ a.text }}</b-dropdown-item
                >
              </b-dropdown>

              <!--Application-->
              <b-dropdown
                :text="owner"
                ref="Owner"
                variant="default"
                style="color: white; margin-left: 10px"
              >
                <b-dropdown-item
                  v-for="o in owners"
                  :key="o.text"
                  v-on:click="changeItem('Owner', o.text)"
                >
                  {{ o.text }}
                </b-dropdown-item>

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
import UploadDataModel from "./UploadDataModel";
import NewDataModel from "./NewDataModel";
import DataTable from "@/components/DataTables/DataTable";

export default {
  name: "Tables",
  components: { DataTable, Widget, UploadDataModel, NewDataModel },

  data () {
    return {
      app: 'App: V-SIEM',
      owner: 'Owner: any',
      page: 1,
      totalRecords: 20,
      expanded: [],
      itemsPerPage: '10 per page',
      search: '',
      singleExpand: true,
      singleSelect: false,
      selected: [],
      items: [
        {text: 'All'},
        {text: 'Reports'},
        {text: 'Alerts'},
      ],
      apps: [
        {text: 'V-SIEM'},
        {text: 'VISEM APP 2'},
        {text: 'VISEM APP 3'}
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

      ],
       owners: [
        { text: "any"},
        { text: "thangbv" },
        { text: "daont" },
        { text: "duongbv" },
        
      ],

      //value in modal.

      title: null,
      titleState: null,

      id: null,
      idState: null,



      description: null,


    }
  },
  methods: {


    changeItem: function(refName,item){
      if(refName === 'App'){
      this.app = refName+': '+item;
      }else if(refName === 'Owner'){
        this.owner = refName+ ': '+item;
      }
    }
  }

};
</script>
