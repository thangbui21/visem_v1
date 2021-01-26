<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
        <h2 class="page-title">
          <span>Alert Actions</span>
        </h2>
      </b-col>
      <b-col>
        <!--
        <div>
          <b-button v-b-modal.modal2 variant="default" style="float: right;">Browse more</b-button>
          <CreateReport />
        </div>
        -->
      </b-col>
    </b-row>

    <v-card style="background-color:transparent;">
      <Widget>
        <v-card-title>
          <b-row class="justify-content-md-center">
          <!--
            <b-col cols="3" md="auto" stylee="border-color:white">
              <b-dropdown
                style="border-color:white;width:100%;color:#a6a9c3;"
                text="Type: All"
                ref="Type"
                variant="default"
              >
                <b-dropdown-item
                  v-for="item in items"
                  :key="item.text"
                  v-on:click="changeItem('Type',item.text)"
                >{{ item.text }}</b-dropdown-item>
              </b-dropdown>
            </b-col>

            <b-col cols="3" md="auto">
              <b-dropdown
                style="border-color:white;width:100%;color:#a6a9c3;"
                text="App: V-SIEM"
                ref="App"
                variant="default"
              >
                <b-dropdown-item
                  v-for="app in apps"
                  :key="app.text"
                  v-on:click="changeItem('App',app.text)"
                >{{ app.text }}</b-dropdown-item>
              </b-dropdown>
            </b-col>

            <b-col cols="1" md="auto">
              <b-dropdown
                style="border-color:white;width:100%;color:#a6a9c3;"
                text="Filter by Owner: v-admin"
                ref="Status"
                variant="default"
              >
                <b-dropdown-item
                  v-for="owner in owners"
                  :key="owner.text"
                  v-on:click="changeItem('Status',owner.text)"
                >{{ owner.text }}</b-dropdown-item>
              </b-dropdown>
            </b-col>
          -->
            <b-col cols="3">
              <v-text-field
                :dark="true"
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="filter"
                outlined
                dense
              ></v-text-field>
            </b-col>


            <b-col cols="2">
              <b-dropdown
                style="width:100%;color:#a6a9c3;"
                :text="itemsPerPage"
                ref="Page"
                variant="default"
              >
                <b-dropdown-item
                  v-for="pageItem in pageItems"
                  :key="pageItem.text"
                  v-on:click="changeItem('Page',pageItem.text)"
                >{{ pageItem.text }}</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
          <b-col>
            <b-pagination v-model="page" :total-rows="totalRecords" :per-page="itemsPerPage"></b-pagination>
          </b-col>
          <b-row></b-row>
        </v-card-title>
        <DataTable
          :_search="search"
          :headers="headers"
          :records="records"
          :single_select="singleSelect"
          :single_expand="singleExpand"
          :show_expand="true"
          :show_select="true"
          :page="page"
          :itemsPerPage="parseInt(itemsPerPage)"
          :expanded="expanded"
        ></DataTable>
      </Widget>
    </v-card>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
//import CreateReport from "../Modal/CreateReport";
import DataTable from "@/components/DataTables/DataTable";

export default {
  name: "Tables",
  components: { DataTable, Widget },

  data() {
    return {
      page: 1,
      totalRecords: 20,
      expanded: [],
      itemsPerPage: "10 per page",
      search: "",
      singleExpand: true,
      singleSelect: false,
      selected: [],
      items: [{ text: "All" }, { text: "Reports" }, { text: "Alerts" }],
      apps: [
        { text: "V-SIEM 1" },
        { text: "VISEM APP 2" },
        { text: "VISEM APP 3" },
      ],
      owners: [{ text: "admin" }, { text: "mentor" }, { text: "user" }],
      pageItems: [
        { value: 5, text: "5 per page" },
        { value: 10, text: "10 per page" },
        { value: 15, text: "15 per page" },
      ],
      headers: [
        { text: "", value: "data-table-expand" },
        { text: "Name", value: "name" },
        { text: "Type", value: "fat" },
        { text: "App", value: "carbs" },
        { text: "Next Scheduled Time", value: "protein" },
        { text: "Actions", value: "iron" },
      ],
      records: [
        {
          name: "Frozen Yogurt1",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich1",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair1",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake1",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread1",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
      ],
    };
  },
  methods: {
    changeItem: function (refName, item) {
      if (refName != "Page") {
        this.$refs[refName].text = refName + ": " + item;
      } else {
        this.itemsPerPage = item;
      }
    },
  },
};
</script>
