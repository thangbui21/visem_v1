<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :dark="true"
    :search="_search"
    :expanded="expanded"
    :single-select="single_select"
    :single-expand="single_expand"
    :page.sync="page"
    :items-per-page="itemsPerPage"
    :item-key="itemKey"
    hide-default-footer
    :show-select="show_select"
    :show-expand="show_expand"
    class="elevation-1"
    style="background-color: transparent"
    :item="_item"
    loading
  >
    <template v-slot:item.log="{ item }">
      <a :href="item.log">View log events</a>
    </template>
    <template v-slot:item.icon="{ item }">
      <i :class="item.icon"></i>
    </template>

    <template v-slot:item.action="{ item }">
      <b-button
        variant="default"
        class="mr-xs"
        size="sm"
        @click="editRecord(item, headers)"
        >Edit</b-button
      >
      <b-button
        variant="default"
        class="mr-xs"
        size="sm"
        @click="deleteRecord(item)"
        >Delete</b-button
      >
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" v-if="item['_raw']">
        <div
          style="
            margin-left: 20%;
            margin-bottom: 4%;
            margin-top: 1%;
            width: 70%;
          "
        >
          <b-row>
            <b-col>
              <b-pagination
                v-model="page"
                :total-rows="
                  getTotalRecord(Object.keys(records[item.iterator]).length - 1)
                "
                :per-page="10"
              ></b-pagination>
            </b-col>
          </b-row>
          <v-data-table
            :headers="[
              { text: 'key', value: 'key' },
              { text: 'value', value: 'value' },
            ]"
            :items="get_record(records[item.iterator].iterator)"
            :dark="true"
            :search="_search"
            :expanded="expanded"
            :single-select="single_select"
            :single-expand="single_expand"
            :page="page"
            :item-key="itemKey"
            hide-default-footer
            :show-select="show_select"
            :show-expand="false"
            class="elevation-1"
            style="background-color: transparent"
            :item="_item"
            dense
          >
          </v-data-table>
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "DataTable",
  props: [
    "itemKey",
    "headers",
    "page",
    "itemsPerPage",
    "records",
    "single_select",
    "single_expand",
    "_search",
    "show_select",
    "show_expand",
    "_item",
    "expanded",
    "link",
  ],
  computed: {},
  data() {},
  methods: {
    get_record: function (i) {
      var arr = [];
      for (var key in this.records[i]) {
        var x = {};
        x["key"] = key;
        x["value"] = this.records[i][key];
        arr.push(x);
      }
      return arr;
    },
    editRecord: function (item) {
      this.$emit("toggle", item, "edit");
    },
    deleteRecord: function (item) {
      this.$emit("toggle", item, "delete");
    },
    getTotalRecord: function (i) {
      return i;
    },
  },
};
</script>

<style>
</style>