<template>
  <div>
    <div>
      <b-row>
        <b-col cols="3">
          <h1 style="font-size: 24px">
            <b>Users</b>
          </h1>
        </b-col>
        <b-col cols="7"></b-col>
        <b-col cols="2" style>
          <b-button
            id="newUserbtn"
            variant="default"
            lg="auto"
            style="float: right"
            @click="toggleUserModal(null, 'create')"
          >
            <b>New User</b>
          </b-button>
        </b-col>
      </b-row>
      <v-card style="background-color: transparent">
        <Widget>
          <v-card-title>
            <b-row>
              <b-col cols="2" lg="auto" md="auto" sm="auto"></b-col>
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
            </b-row>
          </v-card-title>
          <DataTable
            :_search="search"
            :headers="headers"
            :records="records"
            :single_select="singleSelect"
            :single_expand="singleExpand"
            :show_expand="false"
            :show_select="false"
            @toggle="toggleUserModal"
          >
          </DataTable>
        </Widget>
      </v-card>
    </div>

    <div>
      <b-modal
        ref="user_modal"
        id="user_modal"
        size="lg"
        v-bind:title="modal_title"
      >
        <v-divider :dark="true"></v-divider>
        <div v-if="!isDeleteUser">
          <b-row v-if="isCreateUser" class="style_height">
            <b-col cols="3">
              <p style="float: right">Name</p>
            </b-col>
            <b-col cols="9">
              <v-text-field
                :dark="true"
                outlined
                dense
                v-model="user.name"
                id="name"
              ></v-text-field>
            </b-col>
          </b-row>
          <b-row class="style_height">
            <b-col cols="3">
              <p style="float: right">Email</p>
            </b-col>
            <b-col cols="9">
              <v-text-field
                :dark="true"
                outlined
                dense
                v-model="user.email"
                placeholder="optional"
                id="email"
                type="email"
              ></v-text-field>
            </b-col>
          </b-row>
          <b-row class="style_height">
            <b-col cols="3">
              <p style="float: right">Full Name</p>
            </b-col>
            <b-col cols="9">
              <v-text-field
                :dark="true"
                outlined
                dense
                placeholder="optional"
                v-model="user.fullname"
                id="fullname"
              ></v-text-field>
            </b-col>
          </b-row>
          <b-row class="style_height" v-if="isCreateUser">
            <b-col cols="3">
              <p style="float: right">Set password</p>
            </b-col>
            <b-col cols="9">
              <v-text-field
                :dark="true"
                outlined
                dense
                placeholder="New password"
                type="password"
                v-model="user.password"
                id="password"
              ></v-text-field>
            </b-col>
          </b-row>
          <b-row class="style_height" v-if="isCreateUser">
            <b-col cols="3">
              <p style="float: right">Confirm password</p>
            </b-col>
            <b-col cols="9">
              <v-text-field
                :dark="true"
                outlined
                dense
                placeholder="Confirm new password"
                type="password"
                v-model="user.confirm_pass"
                id="confirm_pass"
              ></v-text-field>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="3">
              <p style="float: right">Assign roles</p>
            </b-col>
            <b-col cols="3" lg="auto">
              <v-checkbox
                :dark="true"
                label="user"
                value="user"
                :disabled="disabled_user"
                @click="role_user"
                ref="role_user"
              ></v-checkbox>
            </b-col>
            <b-col cols="3" lg="auto" style="margin-left: 50px">
              <v-checkbox
                :dark="true"
                label="superuser"
                value="superuser"
                :disabled="disabled_superuser"
                @click="role_superuser"
                ref="role_superuser"
              ></v-checkbox>
            </b-col>
            <b-col cols="3" lg="auto" style="margin-left: 50px">
              <v-checkbox
                :dark="true"
                label="admin"
                value="admin"
                :disabled="disabled_admin"
                @click="role_admin"
                ref="role_admin"
              ></v-checkbox>
            </b-col>
          </b-row>

        </div>
        <div v-if="isDeleteUser">
          <p>
            Are you sure you want to delete the user named {{ this.user.name }}
          </p>
        </div>
        <v-divider :dark="true"></v-divider>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="default" @click="cancel()"
            >Cancel</b-button
          >
          <b-button
            size="sm"
            variant="default"
            @click="save"
            v-if="!isDeleteUser"
            >Save</b-button
          >
          <b-button
            size="sm"
            variant="default"
            @click="delete_user"
            v-if="isDeleteUser"
            >Delete</b-button
          >
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import DataTable from "@/components/DataTables/DataTable";
import RESTService from "../../../../services/rest.service";

class NewUser {
  constructor(name, email, fullname, password, role) {
    this.name = name;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.role = role;
  }
}

export default {
  name: "User",
  components: {
    Widget,
    DataTable,
  },
  data() {
    return {
      modal_title: "Create User",
      isCreateUser: true,
      isDeleteUser: false,
      user: new NewUser("", "", "", "", ""),
      singleExpand: true,
      singleSelect: false,
      search: "",
      disabled_admin: false,
      disabled_user: false,
      disabled_superuser: false,
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Actions",
          value: "action",
        },
        {
          text: "Full name",
          value: "fullname",
        },
        {
          text: "Email address",
          value: "email",
        },
        {
          text: "Roles",
          value: "role",
        },
      ],
      records: [],
      roles: [],
    };
  },
  methods: {
    
    toggleUserModal: function (user, action) {
      this.$refs["user_modal"].toggle("#newUserbtn");
      this.isDeleteUser = false;
      this.disabled_admin = false;
      this.disabled_user = false;
      this.disabled_superuser = false;
      if (action == "edit") {
        this.isCreateUser = false;
        this.user.email = user.email;
        this.user.fullname = user.fullname;
        this.user.name = user.name;
        this.modal_title = "Edit User: " + this.user.name;
      } else if (action == "create") {
        this.isCreateUser = true;
        this.modal_title = "Create User";
        this.create_new_user();
      } else {
        this.modal_title = "Delete User";
        this.user.name = user.name;
        this.isCreateUser = false;
        this.isDeleteUser = true;
      }
    },

    create_new_user: function () {
      this.user.name = "";
      this.user.email = "";
      this.user.fullname = "";
      this.user.password = "";
      this.user.confirm_pass = "";
    },
    get_user: function () {
      RESTService.get("/services/_ui/searchportal/users").then((response) => {
        for (var i of response.data.data) {
          var x = {
            name: i.name,
            email: i.email,
            role: i.role,
            fullname: i.fullname,
          };
          this.records.push(x);
        }
      });
    },
    post_user: function (data) {
      RESTService.post("/services/_ui/searchportal/users", data).then(
        (response) => {
          if (response.status == 200) {
            this.records = [];
            this.get_user();
          }
        }
      );
    },
    put_user: function (username, data) {
      RESTService.put(
        "/services/_ui/searchportal/users/" + username,
        data
      ).then((response) => {
        if (response.status == 200) {
          this.records = [];
          this.get_user();
        }
      });
    },
    delete_user: function () {
      this.$refs["user_modal"].hide();
      RESTService.delete(
        "/services/_ui/searchportal/users/" + this.user.name
      ).then((response) => {
        if (response.status == 200) {
          this.records = [];
          this.get_user();
        }
      });
    },
    get_role: function () {
      RESTService.get("/services/_ui/searchportal/roles").then((response) => {
        for (var i of response.data.data) {
          this.roles.push(i.name);
        }
      });
    },
    save: function () {
      if (this.isCreateUser) {
        if (
          this.user.name == "" ||
          this.user.password == "" ||
          this.user.confirm_pass == "" ||
          this.user.password != this.user.confirm_pass ||
          this.user.role == ""
        ) {
          alert("error");
        } else {
          this.$refs["user_modal"].hide();
          let data = {
            name: this.user.name,
            email: this.user.email,
            fullname: this.user.fullname,
            password: this.user.password,
            role: this.user.role,
          };
          this.post_user(data);
        }
      } else {
        this.$refs["user_modal"].hide();
        let data = {
          fullname: this.user.fullname,
          email: this.user.email,
          role: this.user.role,
        };
        this.put_user(this.user.name, data);
      }
    },
    role_admin: function () {
      if (this.user.role == "") {
        this.user.role = "admin";
      } else {
        this.user.role = "";
      }
      if (!this.disabled_user) {
        this.disabled_user = true;
      } else {
        this.disabled_user = false;
      }
      if (!this.disabled_superuser) {
        this.disabled_superuser = true;
      } else {
        this.disabled_superuser = false;
      }
    },
    role_user: function () {
      if (this.user.role == "") {
        this.user.role = "user";
      } else {
        this.user.role = "";
      }
      if (!this.disabled_admin) {
        this.disabled_admin = true;
      } else {
        this.disabled_admin = false;
      }
      if (!this.disabled_superuser) {
        this.disabled_superuser = true;
      } else {
        this.disabled_superuser = false;
      }
    },
    role_superuser: function () {
      if (this.user.role == "") {
        this.user.role = "superuser";
      } else {
        this.user.role = "";
      }
      if (!this.disabled_user) {
        this.disabled_user = true;
      } else {
        this.disabled_user = false;
      }
      if (!this.disabled_admin) {
        this.disabled_admin = true;
      } else {
        this.disabled_admin = false;
      }
    },
    check_input: function () {},
    },
  created() {
    this.get_user();
    this.get_role();
    this.create_new_user();
  },
};
</script>

<style>
  .style_height{
    height: 50px;
  }
</style>
