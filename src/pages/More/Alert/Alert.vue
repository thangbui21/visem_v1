<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
        <h2 class="page-title">
          <span>Alert Actions</span>
        </h2>
        <p>Review and manage alert actions</p>
      </b-col>
    </b-row>

    <v-card style="background-color: transparent">
      <Widget style="">
        <v-card-title style="height: 70px">
          <b-row>
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
          </b-row>
        </v-card-title>
        <DataTable :_search="search" :headers="headers" :records="records">
        </DataTable>
      </Widget>
    </v-card>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import DataTable from "@/components/DataTables/DataTable";

export default {
  name: "Tables",
  components: { DataTable, Widget },

  data() {
    return {
      search: "",
      singleSelect: false,

      headers: [
        { text: "", value: "icon" },
        { text: "Alert action", value: "alert_action" },
        { text: "Sharing", value: "sharing" },
        { text: "Status", value: "status" },
        { text: "Usage", value: "usage" },
        { text: "Log", value: "log" },
      ],
      records: [
        {
          icon: "fa fa-file-text",
          alert_action: "Log Event",
          sharing: "Global",
          status: "Enable",
          usage: "Usage statics",
          log: "/app/dashboard",
        },
        {
          icon: "fa fa-envelope",
          alert_action: "Create V-SIEM message",
          sharing: "Global",
          status: "Enable",
          usage: "Usage statics",
          log: "View log events",
        },
        {
          icon: "fa fa-bell-o",
          alert_action: "Notable",
          sharing: "Global",
          status: "Enable",
          usage: "Usage statics",
          log: "View log events",
        },
        {
          icon: "fa fa-envelope-o",
          alert_action: "Send email",
          sharing: "Global",
          status: "Enable",
          usage: "Usage statics",
          log: "View log events",
        },
        {
          icon: "fa fa-send",
          alert_action: "Telegram Alert Action",
          sharing: "Global",
          status: "Enable",
          usage: "Usage statics",
          log: "View log events",
        },
      ],
    };
  },
  methods: {},
};
</script>
