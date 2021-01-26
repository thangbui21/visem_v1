<template>
  <b-navbar toggleable="md" class="app-header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
      <b-nav-item href="/setting/usermanagement"
      ><strong>{{ currentUser }}</strong></b-nav-item>
      <!--<v-btn icon small style="margin-top:6px;margin-" @click="changeLang"><img v-if="$i18n.locale==='en'" src="../../assets/flags/vietnam.png" width="20" height="20" /><img v-else src="../../assets/flags/united-kingdom.png" width="20" height="20" /></v-btn>-->
      <b-nav-item-dropdown
        class="d-md-down-none"
        no-caret
        right
        menu-class="dropdown-menu-messages"
      >
        <template slot="button-content">
          <i class="la la-comment px-2" />
        </template>

        <div
          style="
            max-height: 400px;
            overflow-y: auto;
            overflow-x: hidden;
            width: 370px;
          "
        >
          <table
            width="360"
            v-for="(row, index) in allMessage"
            v-bind:key="index"
          >
            <tr>
              <td style="width: 10%">
                <v-btn icon
                  ><v-icon style="color: white"
                    >fa fa-info-circle</v-icon
                  ></v-btn
                >
              </td>
              <td style="word-break: break-all; width: 85%">
                {{ row.content }}
                {{ row.id }}
              </td>
              <td style="width: 5%">
                <v-btn icon @click="dismiss(index)"
                  ><v-icon style="color: white">fa fa-times</v-icon></v-btn
                >
              </td>
            </tr>
            <tr>
              <br />
            </tr>
          </table>
        </div>
        <b-dropdown-item-button class="text-center">
          <span class="mx-auto">
            See all messages
            <i class="fa fa-arrow-right ml-1"></i>
          </span>
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
      <b-nav-item class="divider d-md-down-none"></b-nav-item>

      <!--Setting-->
      <v-btn icon small style="margin-top:6px;" @click="changeLang"><img v-if="$i18n.locale==='en'" src="../../assets/flags/vietnam.png" width="20" height="20" /><img v-else src="../../assets/flags/united-kingdom.png" width="20" height="20" /></v-btn>
      <b-nav-item-dropdown no-caret right menu-class="dropdown-menu-settings">
        <template slot="button-content">
          <i class="la la-cog px-2" />
        </template>
        <div
          style="
            padding-left: 40px;
            padding-top: 20px;
            padding-bottom: 20px;
            padding-right: 30px;
          "
        >
          <b-row style="width: 500px">
            <b-col lg="6" xs="6" sm="6" md="6">
              <div>
                <b-row>
                  <h6>{{ $t('sidebar.knowledge') }}</h6>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/report_alerts"
                    >{{ $t('sidebar.report_and_alerts') }}
                  </router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/data_models">{{ $t('sidebar.data_models') }}</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/event_types">{{ $t('sidebar.event_types') }}</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/tags">{{ $t('sidebar.tags') }}</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/fields">{{ $t('sidebar.fields') }}</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/lookups">{{ $t('sidebar.lookups') }}</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/ui">{{ $t('sidebar.user_interface') }}</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/alert_actions">{{ $t('sidebar.alert_action') }}</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/knowledge/advanced_search"
                  ></router-link>
                </b-row>
                <b-row>
                  <router-link href="/setting/knowledge/all_config"></router-link>
                </b-row>
              </div>

              <div style="padding-top: 20px; padding-bottom: 20px">
                <b-row>
                  <h6>{{ $t('sidebar.system') }}</h6>
                </b-row>
                <b-row>
                  <router-link to="/setting/system/server_settings">Server settings</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/system/server_controls">Server controls</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/system/system/health">Health report manager</router-link>
                </b-row>
              </div>
            </b-col>

            <b-col lg="6" xs="6" sm="6" md="6">
              <div>
                <b-row>
                  <h6>DATA</h6>
                </b-row>
                <b-row>
                  <router-link to="/setting/data/inputs">Data input</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/data/indexes">Indexes</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/data/source_types">Source types</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/forward_receive">Forwarding and receving</router-link>
                </b-row>
              </div>

              <div style="padding-top: 20px; padding-bottom: 20px">
                <b-row>
                  <h6>DISTRIBUTED</h6>
                </b-row>
                <b-row>
                  <router-link to="/setting/distributed">Indexing clustering</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/forwarder_management">Forwarder management</router-link>
                </b-row>
              </div>

              <div style="padding-top: 20px; padding-bottom: 20px">
                <b-row>
                  <h6>USER</h6>
                </b-row>
                <b-row>
                  <router-link to="/setting/user">User</router-link>
                </b-row>
                <b-row>
                  <router-link to="/setting/roles">Roles</router-link>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-nav-item-dropdown>
      

      <b-nav-item class="d-md-down-none" @click="logout">
        <i class="la la-power-off px-2" />
      </b-nav-item>
      <b-nav-item class="d-md-none" @click="switchSidebarMethod">
        <i class="la la-navicon px-2" />
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RESTService from "../../services/rest.service";
export default {
  name: "Header",
  components: {},
  data() {
    return {
      showNavbarAlert: true,
      allMessage: [],
    };
  },
  computed: {
    // Lấy Username from localstorage.
    currentUser() {
      var username = localStorage.getItem("user");
      var x = JSON.parse(username);
      var fullname = x.data.fullname;
      return fullname;
    },
    ...mapState("layout", {
      sidebarClose: (state) => state.sidebarClose,
      sidebarStatic: (state) => state.sidebarStatic,
    }),
  },

  methods: {
    getNotifications() {
      this.allMessage = [];
      RESTService.get("/services/_ui/searchportal/notifications").then(
        (response) => {
          for (var message in response.data.data) {
            this.allMessage.push(response.data.data[message]);
          }
        }
      );
      // Tự động gọi lại
      
    },

    //Call API return message
    startInterval: function () {
      setInterval(() => {
        this.getNotifications();
      }, 150000);
    },



    dismiss: function (index) {
      var messageId = this.allMessage[index].id;
      alert(this.allMessage[index].id);
      RESTService.delete(
        "/services/_ui/searchportal/notifications/" + messageId
      );
      this.getNotifications();
      //this.allMessage.splice(index, 1);
    },

    ...mapActions("layout", [
      "toggleSidebar",
      "toggleChat",
      "switchSidebar",
      "changeSidebarActive",
    ]),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split("/");
        paths.pop();
        this.changeSidebarActive(paths.join("/"));
      }
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    changeLang() {
      if(this.$i18n.locale === "vi"){
        this.$i18n.locale = "en";
      }else{
        this.$i18n.locale = "vi";
      }
      localStorage.setItem("language",this.$i18n.locale); 
    },
  },
  created() {
    //localStorage.setItem("language",this.$i18n.locale); 
    this.startInterval();
    this.getNotifications();
    this.$i18n.locale = localStorage.getItem("language");
  },
};
</script>

<style src="./Header.scss" lang="scss" />
