<template>
  <div>
    <b-row>
      <b-col cols="3">
        <h1 style="font-size:24px;"><b>Roles</b></h1>
      </b-col>
      <b-col cols="8"></b-col>
      <b-col cols="1" style="padding-left: 22px;">
        <v-btn
          small
          dark
          style="background:rgb(71, 77, 132)"
          @click="$bvModal.show('role_modal')"
        >New Role
        </v-btn>
        <!--<b-button variant="default" lg="auto" v-b-modal.role_modal>New Role</b-button>-->
      </b-col>
    </b-row>
    <v-card style="background-color:transparent;">
      <Widget>
        <v-card-title>
          <b-row>
            <b-col cols="2" lg="auto" md="auto" sm="auto">

            </b-col>
            <b-col cols="3">
              <v-text-field
                :dark=true
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="Search"
                outlined
                dense
              ></v-text-field>
            </b-col>
          </b-row>
        </v-card-title>
        <DataTable
          :_search="search"
          :headers="headers"
          :records="records"
          :single_select="singleSelect"
          :single_expand="singleExpand"
          :show_expand=false
          :show_select=false
        >
        </DataTable>
      </Widget>
    </v-card>
    <b-modal
      ref="role_modal" 
      id="role_modal" 
      size="lg" 
      title="New Role"
    >
      <v-divider :dark="true" style="margin-top:-10px;"></v-divider>
      <b-row class="small_height">
        <b-col><p style="float:right">Name</p></b-col>
        <b-col cols="7">
          <v-text-field
              :dark="true"
              outlined
              dense
              id="role"
              type="text"
          ></v-text-field>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row style="margin-top:10%;">
        <b-col>
          <b-tabs>
            <b-tab title="Inheritance">
              <DataTable2
                :headers="headers_inheritance"
                :items="items_inheritance"
                :dense=true
                :single-select=false
                :show_select=true
                item_key="role_name"
                v-model="inheritance_selected"
              >
              </DataTable2>
            </b-tab>
            <b-tab title="Capabilities">
              <DataTable2
                v-model="capability_seleted"
                :headers="headers_capabilities"
                :items="items_capabilities"
                :dense=true
                :single-select=false
                :show_select=true
                item_key="capability_name"
              >
              </DataTable2>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <v-divider :dark="true"></v-divider>
      <template v-slot:modal-footer="{ cancel }">
          <v-btn small dark style="background:rgb(71, 77, 132)" @click="cancel()">Cancel</v-btn>
          <v-btn small dark style="background:rgb(71, 77, 132)" >Create</v-btn>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import DataTable from "@/components/DataTables/DataTable";
import RESTService from "../../../../services/rest.service";
import DataTable2 from "@/components/DataTables/DataTable2";

export default {
  name: 'Role',
  components: { Widget, DataTable, DataTable2 },
  data () {
    return {
      search: '',
      inheritance_selected: [],
      capability_seleted: [],
      items_inheritance: [],
      singleSelect: true,
      singleExpand: false,
      headers_inheritance: [
        {text: 'Role name', value: 'role_name'},
      ],
      headers_capabilities: [{text: 'Capability Name', value: 'capability_name'}],
      items_capabilities: [
        { capability_name: 'admin_all_objects'},
        { capability_name: 'accelerate_search'},
        { capability_name: 'apps_backup'},
        { capability_name: 'apps_restore'},
        { capability_name: 'change_own_password'}
      ],
      headers: [
          { text: 'Name', value: 'name' },
          { text: 'Actions', value: 'action' },
          { text: 'Permission', value: 'permission' },
          { text: 'Owner', value: 'owner' },
      ],
      records: []
    }
  },
  methods: {
    get_role: function(){
      RESTService.get("/services/_ui/searchportal/roles").then((response)=>{
        for (var i of response.data.data){
          var x = {name: i.name, permission: i.permission, owner: i.owner,}
          this.items_inheritance.push({role_name:i.name});
          this.records.push(x);
        }
      })
    },
    create_role: function(){

    },
  },
  created () {
    this.get_role();
  }
};
</script>
<style>
  .small_height {
  height: 50px;
  }
</style>