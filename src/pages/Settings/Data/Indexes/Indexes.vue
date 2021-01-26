<template>
  <div class="tables-basic">
    <b-row>
      <b-col cols="9">
        <h2 class="page-title">
          <span>Indexes</span>
        </h2>
        <p>
        A repository for data in Splunk Enterprise. Indexes reside in flat files on the Splunk Enterprise instance known as the indexer
        </p>
      </b-col>

      <b-col>
        <!--Nếu yêu cầu 2 button sau thì tạo 2 modal tương ứng.-->
        <div style="float: right; min-width: 100px">
          <b-button
            v-b-modal.new_index
            variant="default"
            style="min-width: 100px"
            >New Index</b-button
          >
          <NewIndex />
        </div>
      </b-col>
    </b-row>

    <v-card style="background-color: transparent">
      <Widget>
        <v-card-title style="height: 70px">
          <b-row>
            <b-col cols="5" xs="auto" lg="auto" md="auto">
              <h6 style="color: white">29 Indexes</h6>
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
          :itemsPerPage="parseInt(itemsPerPage)"
        ></DataTable>
      </Widget>
    </v-card>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import NewIndex from "./NewIndex";
import DataTable from "@/components/DataTables/DataTable";

export default {
  name: "Tables",
  components: { DataTable, Widget, NewIndex },

  data() {
    return {
      // Categories
      Categories: [
        { text: "Category: All" },
        { text: "Application" },
        { text: "Custom" },
        { text: "Database" },
      ],

      Apps: [
        { text: "App: All" },
        { text: "V-ES" },
        { text: "Enterprise Security" },
        { text: "Application" },
      ],

      page: 1,
      totalRecords: 20,
      itemsPerPage: "10 per page",
      search: "",
      selected: [],

      pageItems: [
        { value: 5, text: "5 per page" },
        { value: 10, text: "10 per page" },
        { value: 15, text: "15 per page" },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Action", value: "action" },
        { text: "Type", value: "type" },
        { text: "Event Count", value: "event_count" },
        { text: "Current Size", value: "current_size" },
      ],
      records: [
        {
          name: "Name",
          category: "Structured",
          app: "V-ES",
        },
      ],
    };
  },
  methods: {
    changeItem: function (refName, item) {
      if (refName != "Page") {
        this.$refs[refName].text = item;
      } else {
        this.itemsPerPage = item;
      }
    },
  },
};
</script>
