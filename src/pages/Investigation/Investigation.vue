<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
        <h2 class="page-title">
          <span>Investigation</span>
        </h2>
      </b-col>
      <b-col>
        <div>
          <b-button v-b-modal.new-inves variant="default" style="float: right"
            >Create New Investigation</b-button
          >
          <NewInvestigation />
        </div>
      </b-col>
    </b-row>

    <v-card style="background-color: transparent">
      <Widget style="">
        <v-card-title style="height: 70px">
          <b-row>
            <b-col cols="5" xs="auto" lg="auto" md="auto">
              <div>
                <!--Chưa có action-->
                <b-button-group style="width: 100%; min-width: 250px">                  <b-button
                    variant="default"
                    :pressed="assignToMe"
                    @click="assignToMe = true"
                    >Investigation Assign to Me</b-button
                  >
                  <!-- @click="assignToMe = false" -->
                  <b-button
                    variant="default"
                    :pressed="!assignToMe"
                   
                    @click="parse_date()"
                    >All Investigations</b-button
                  >
 
                </b-button-group>
              </div></b-col
            >
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
          :single_select="singleSelect"
          
          :show_select="true"
          :page="page"
          :itemsPerPage="parseInt(itemsPerPage)"
         
        ></DataTable>
      </Widget>
    </v-card>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import NewInvestigation from "./NewInvestigation";
import DataTable from "@/components/DataTables/DataTable";

export default {
  name: "Tables",
  components: { DataTable, Widget, NewInvestigation },

  data() {
    return {
      assignToMe: true,

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
        
        { text: "Name", value: "name" },
        { text: "Description", value: "des" },
        { text: "Aaction", value: "action" },
        { text: "Status", value: "status" },
        { text: "Created", value: "created" },
      ],
      records: [
        {
          name: "Frozen Yogurt1",
          des: 159,
          status: "OK",
          created: "Daily",
        }],
    };
  },
  methods: {
    parse_date() {
      var date = "2020-12-01 13:00:00";
      var timestamp = Date.parse(date);
      alert(timestamp)
    },
    saveInvest() {
      alert(JSON.stringify(this.modal))
    },
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
