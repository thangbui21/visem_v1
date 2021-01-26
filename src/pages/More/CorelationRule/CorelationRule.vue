<template>
  <div>
    <b-row>
      <b-col cols="3">
        <h1 style="font-size: 24px"><b>Content Management</b></h1>
      </b-col>
      <b-col style="margin-left: 130px; padding-left: 72px">
        <div style="float: right">
          <!-- <Button v-b-modal.new-cr label="Create New Content"> </Button><CR /> -->
          <Button
            href="/rules/new_content"
            style="text-decoration: none"
            label="Create New Content"
          >
          </Button>
        </div>
      </b-col>
    </b-row>

    <v-card style="background-color: transparent">
      <Widget>
        <v-card-title>
          <b-row class="justify-content-md-center">
            <b-col cols="1" md="auto" style="border-color: white">
              <b-dropdown
                id="1"
                style="border-color: white; width: 100%; color: #a6a9c3"
                text="Type: Save search"
                ref="Type"
                variant="default"
                size="sm"
              >
                <b-dropdown-item
                  v-for="item in types"
                  :key="item.text"
                  v-on:click="changeItem('Type', item.text)"
                  >{{ item.text }}</b-dropdown-item
                >
              </b-dropdown>
            </b-col>

            <b-col cols="4">
              <v-text-field
                height="5"
                :dark="true"
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="Search"
                outlined
                dense
              ></v-text-field>
            </b-col>
            <b-col></b-col>
          </b-row>

          <b-row>
            <b-col></b-col>
            <b-col cols="5">
              <b-pagination
                style="float-right"
                size="sm"
                v-model="page"
                :total-rows="totalRecords"
                :per-page="itemsPerPage"
              ></b-pagination>
            </b-col>
            <b-col cols="2">
              <b-dropdown
                id="3"
                style="width: 100%; color: #a6a9c3"
                :text="itemsPerPage"
                ref="Page"
                variant="default"
                size="sm"
              >
                <b-dropdown-item
                  v-for="pageItem in pageItems"
                  :key="pageItem.text"
                  v-on:click="changeItem('Page', pageItem.text)"
                  >{{ pageItem.text }}</b-dropdown-item
                >
              </b-dropdown>
            </b-col>
          </b-row>
        </v-card-title>

        <DataTable
          :_search="search"
          :headers="headers"
          :records="records"
          :single_select="singleSelect"
          :single_expand="singleExpand"
          :show_expand="true"
          :show_select="true"
          itemKey="iterator"
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
import Button from "../../../components/Button/Button";

export default {
  components: { Widget, DataTable, Button },
  data() {
    return {
      page: 1,
      totalRecords: 22,
      expanded: [],
      itemsPerPage: "10 per page",
      search: "",
      singleExpand: true,
      singleSelect: false,
      selected: null,
      options: [
        { value: "A", text: "Option A (from options prop)" },
        { value: "B", text: "Option B (from options prop)" },
      ],
      //selected: [],

      types: [
        { text: "Save search", value: "save" },
        { text: "Not save search", value: "not save" },
      ],
      status: [
        { text: "Enable", value: "enable" },
        { text: "Disable", value: "disable" },
      ],

      pageItems: [
        { value: 5, text: "5 per page" },
        { value: 10, text: "10 per page" },
        { value: 15, text: "15 per page" },
      ],

      headers: [
        { text: "", value: "data-table-expand" },
        { text: "Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Next Scheduled Time", value: "time" },
        { text: "Actions", value: "action" },
      ],

      records: [
        {
          iterator: 0,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 1,
          name: "Access 2",
          type: "Not save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 2,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 3,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 5,
          name: "Access 4",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 6,
          name: "Access 1",
          type: "Not save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 7,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 8,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 9,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 10,
          name: "Access 1",
          type: "Not save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 11,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 12,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 13,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 14,
          name: "Access 1",
          type: "Not save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 15,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 16,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 17,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 18,
          name: "Access 1",
          type: "Not save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 19,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 20,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        {
          iterator: 21,
          name: "Access 1",
          type: "Save search",
          time: "20-12",
          action: "edit",
        },
        
      ],
    };
  },
  methods: {
    createNewContent: function () {},
    changeItem: function (refName, item) {
      if (refName != "Page") {
        // var val = this.$refs[refName].text.split(":");
        //this.search = item;
        this.$refs[refName].text = refName + ": " + item;
      } else {
        this.itemsPerPage = item;
      }
    },
  },
};
</script>

<style>
.first {
  height: 20px !important;
}
</style>