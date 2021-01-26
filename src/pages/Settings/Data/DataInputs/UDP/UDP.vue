<template>
  <div>
    <b-row>
      <b-col>
        <h2 class="page-title">
          <span><strong>UDP</strong></span>
        </h2></b-col
      >
      <b-col>
        <div style="float: right">
          <b-button variant="default" href="#">New UDP</b-button>
        </div>
      </b-col>
    </b-row>

    <v-card style="background-color: transparent">
      <Widget style="min-width: 500px">
        <v-card-title>
          <b-row class="justify-content-md-center">
            <b-col cols="2.5">
              
                <v-text-field
                  style="width: 100%; min-width: 200px; color: #a6a9c3"
                  :dark="true"
                  v-model="search"
                  append-icon="mdi-magnify"
                  placeholder="Filter"
                  outlined
                  dense
                ></v-text-field>
              
            </b-col>

            <b-col></b-col>
            <b-col>
              <div style="float: right">
                <b-dropdown
                  style=";color: #a6a9c3"
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
        <DataTable
          :_search="search"
          :headers="headers"
          :records="records"
          itemKey="name"
          :page="page"
          :itemsPerPage="parseInt(itemsPerPage)"
          :expanded="expanded"
        >
        </DataTable>
      </Widget>
    </v-card>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import DataTable from "@/components/DataTables/DataTable";

export default {
  components: { Widget, DataTable },
  data() {
    return {
      page: 1,
      totalRecords: 20,

      itemsPerPage: "10 per page",
      search: "",

      pageItems: [
        { value: 5, text: "5 per page" },
        { value: 10, text: "10 per page" },
        { value: 15, text: "15 per page" },
      ],
      headers: [
        {
          text: "UDP port",
          value: "udp_port",
        },
        {
          text: "Host Restriction",
          value: "host_restriction",
        },
        {
          text: "Source type",
          value: "source_type",
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Actions",
          value: "actions",
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

