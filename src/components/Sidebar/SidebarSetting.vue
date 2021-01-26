<template>
  <b-collapse
    class="sidebar-collapse"
    id="sidebar-collapse"
    :visible="sidebarOpened"
  >
    <nav :class="{ sidebar: true }">
      <header class="logo">
        <router-link to="/app/dashboard">
          <img src="../../assets/signature/logo.png" alt="vncs" width="50" />
          <span class="fw-semi-bold">VSiEM</span>Search
        </router-link>
      </header>
      <!--
      <NavLink
        :activeItem="activeItem"
        header="Back to Overview"
        link="/app/dashboard"
        iconName="flaticon-home"
        index="dashboard"
        isHeader
      />
      -->

      <ul class="nav">
        <h3 class="d-sm-down-none">
          {{ $t('sidebar.settings') }}
          <a class="actionLink">
            <i style="padding-left: 10px" class="fa fa-cogs" />
          </a>
        </h3>
        <!-- Tìm hiểu lại thông tin Navlink :activeItem="false": Disable Navbar-->
        <NavLink
          :activeItem="activeItem"
          :header="$t('sidebar.knowledge')"
          link="/setting/knowledge"
          iconName="fa fa-exchange"
          index="knowledge"
          :childrenLinks="[
            {
              header: $t('sidebar.report_and_alerts'),
              link_: '/setting/knowledge/report_alerts',
            },
            { header: $t('sidebar.data_models'), link_: '/setting/knowledge/data_models' },
            { header: $t('sidebar.event_types'), link_: '/setting/knowledge/event_types' },
            { header: $t('sidebar.tags'), link_: '/setting/knowledge/tags' },
            { header: $t('sidebar.fields'), link_: '/setting/knowledge/fields' },
            { header: $t('sidebar.lookups'), link_: '/setting/knowledge/lookups' },
            { header: $t('sidebar.user_interface'), link_: '/setting/knowledge/ui' },
            {
              header: $t('sidebar.alert_action'),
              link_: '/setting/knowledge/alert_actions',
            },
            {
              header: $t('sidebar.advanced_search'),
              link_: '/setting/knowledge/advanced_search',
            },
            {
              header: $t('sidebar.all_configurations'),
              link_: '/setting/knowledge/all_config',
            },
          ]"
        />
        <!-- index: /sau setting-->
        <NavLink
          :activeItem="activeItem"
          :header="$t('sidebar.system')"
          link="/setting/system"
          iconName="fa fa-tasks"
          index="system"
          :childrenLinks="[
            {
              header: $t('sidebar.server_settings'),
              link_: '/setting/system/server_settings',
            },
            {
              header: $t('sidebar.server_controls'),
              link_: '/setting/system/server_controls',
            },
            {
              header: $t('sidebar.health_report_manager'),
              link_: '/setting/system/health',
            },
          ]"
        />

        <!-- Thay link: '/setting/data' tương ứng với chức năng-->
        <NavLink
          :activeItem="activeItem"
          :header="$t('sidebar.data')"
          link="/setting/data"
          iconName="fa fa-database"
          index="data"
          :childrenLinks="[
            { header: $t('sidebar.data_inputs'), link_: '/setting/data/inputs' },
            { header: $t('sidebar.indexes'), link_: '/setting/data/indexes' },
            { header: $t('sidebar.source_type'), link_: '/setting/data/source_types' },
          ]"
        />
        <!--             
        {
          header: 'Forwarding and receiving',
          link_: '/setting/data/forward_receive',
        },
        -->

        <!--index: Truyền vào một  content-->
        <NavLink
          :activeItem="false"
          :header="$t('sidebar.distributed')"
          link="/setting/distributed"
          iconName="fa fa-sitemap"
          index="distributed"
          :childrenLinks="[
            { header: $t('sidebar.distributed'), link_: '/setting/distributed' },
            { header: $t('sidebar.distributed'), link_: '/setting/distributed' },
          ]"
        />
        <NavLink
          :activeItem="activeItem"
          :header="$t('sidebar.user')"
          link="/setting/user"
          iconName="fa fa-user"
          index="user"
          :childrenLinks="[
            { header: $t('sidebar.roles'), link_: '/setting/roles' },
            { header: $t('sidebar.user'), link_: '/setting/user' },
          ]"
        />
      </ul>
      <!--
    <h5 class="navTitle d-sm-down-none">
      LABELS
      <a class="actionLink">
        <i class="la la-plus float-right" />
      </a>
    </h5>
    <ul class="sidebarLabels d-sm-down-none">
      <li>
        <a href="#">
          <i class="fa fa-circle text-warning mr-2" />
          <span class="labelName">My Recent</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-circle text-gray mr-2" />
          <span class="labelName">Starred</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-circle text-danger mr-2" />
          <span class="labelName">Background</span>
        </a>
      </li>
    </ul>

    <h5 class="navTitle d-sm-down-none">
      PROJECTS
    </h5>
    <div class="sidebarAlerts d-sm-down-none">
      <b-alert
        v-for="alert in alerts"
        :key="alert.id"
        class="sidebarAlert" variant="transparent"
        show dismissible
      >
        <span>{{alert.title}}</span><br />
        <b-progress class="sidebarProgress progress-xs mt-1"
          :variant="alert.color" :value="alert.value" :max="100" />
        <small>{{alert.footer}}</small>
      </b-alert>
    </div>
    --></nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: {
    NavLink,
  },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: "Sales Report",
          value: 15,
          footer: "Calculating x-axis bias... 65%",
          color: "primary",
        },
        {
          id: 1,
          title: "Personal Responsibility",
          value: 20,
          footer: "Provide required notes",
          color: "danger",
        },
      ],
    };
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split("/");
      paths.pop();
      this.changeSidebarActive(paths.join("/"));
    },
    test(){
      return "ahihi";
    }
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState("layout", {
      sidebarOpened: (state) => !state.sidebarClose,
      activeItem: (state) => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
