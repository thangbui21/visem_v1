<template>
  <div>
    <div>
      <b-row class="small_height">
        <b-col cols="3">
          <h1 style="font-size:24px;">
            <b>Account Settings</b>
          </h1>
        </b-col>
      </b-row>
      <b-row class="small_height">
        <b-col><v-divider :dark="true"></v-divider></b-col>       
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="7">
          <Widget style="min-width:500px;">
            <b-row class="small_height">
              <b-col cols="2">
                <h3 style="font-size:20px;"><b>Personal</b></h3>
              </b-col>
            </b-row>

            <b-row class="larger_height">
              <b-col cols="3"><p style="float:right;color:white">Name</p></b-col>
              <b-col>
                <v-text-field
                  :dark="true"
                  outlined
                  dense
                  placeholder=""
                  :value="user.name"
                  type="text"
                ></v-text-field>
              </b-col>
            </b-row>
            <b-row class="larger_height">
              <b-col cols="3"><p style="float:right;color:white">Full name</p></b-col>
              <b-col>
                <v-text-field
                  :dark="true"
                  outlined
                  dense
                  placeholder=""
                  :value="user.fullname"
                  type="text"
                ></v-text-field>
              </b-col>
            </b-row>
            <b-row class="larger_height">
              <b-col cols="3"><p style="float:right;color:white">Email address</p></b-col>
              <b-col>
                <v-text-field
                  :dark="true"
                  outlined
                  dense
                  :value="user.email"
                  placeholder=""
                  type="text"
                ></v-text-field>
              </b-col>
            </b-row>
            <b-row class="larger_height">
              <b-col cols="3"><p style="float:right;color:white">Old password</p></b-col>
              <b-col>
                <v-text-field
                  :dark="true"
                  outlined
                  dense
                  placeholder="Old password"
                  type="text"
                ></v-text-field>
              </b-col>
            </b-row>
            <b-row class="larger_height">
              <b-col cols="3"><p style="float:right;color:white">Set password</p></b-col>
              <b-col>
                <v-text-field
                  :dark="true"
                  outlined
                  dense
                  placeholder="New password"
                  type="text"
                ></v-text-field>
              </b-col>
            </b-row>
            <b-row class="larger_height">
              <b-col cols="3">
                <p style="float:right;color:white">Confirm password</p>
              </b-col>
              <b-col>
                <v-text-field
                  :dark="true"
                  outlined
                  dense
                  placeholder="Confirm new password"
                  type="text"
                ></v-text-field>
              </b-col>
            </b-row>
            
            <b-row>
              <b-col></b-col>
              <b-col cols="10">
                 <v-btn small dark style="margin-left:86%;min-width:14%;background:rgb(71, 77, 132);">Save</v-btn>
              </b-col>
            </b-row>
          
          </Widget>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";

export default {
  name: "UserManagement",
  components: {
    Widget
  },
  data() {
    return {
      user:{
        name: '',
        email: '',
        fullname: ''
      }
    }
  },
  methods: {
    getInfoUser: function(){
      let user = JSON.parse(window.localStorage.getItem('user'));
      this.user = user.data;
    },
    saveInfoUser: function(){

    }
  },
  created() {
    this.getInfoUser();
  }
};
</script>

<style>
.small_height {
  height: 40px;
}

.larger_height{
  height: 60px;
}
</style>
