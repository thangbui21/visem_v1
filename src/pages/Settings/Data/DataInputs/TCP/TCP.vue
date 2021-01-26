<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h1 style="font-size: 24px"><b>TCP</b></h1>
      </b-col>
      <b-col>
        <div style="float: right">
          <b-button variant="default" href="/setting/data/inputs/new_tcp_udp"
            >New TCP</b-button
          >
        </div>
      </b-col>
    </b-row>

    <v-card style="background-color: transparent">
      <Widget>
        <v-card-title>
          <b-row class="justify-content-md-center">
            <b-col lg="6" sm="6" xs="12">
              <v-text-field
                style="width: 40%; min-width: 200px; color: #a6a9c3"
                :dark="true"
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="filter"
                outlined
                dense
              ></v-text-field>
            </b-col>
            <b-col lg="6" sm="6" xs="12">
              <div style="float: right">
                <b-dropdown
                  style="width: 20%; color: #a6a9c3"
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
  components: {
    Widget,
    DataTable,
  },
  data() {
    return {
      page: 1,
      totalRecords: 20,

      itemsPerPage: "10 per page",
      search: "",

      pageItems: [
        {
          value: 5,
          text: "5 per page",
        },
        {
          value: 10,
          text: "10 per page",
        },
        {
          value: 15,
          text: "15 per page",
        },
      ],
      headers: [
        {
          text: "TCP port",
          value: "tcp_port",
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
