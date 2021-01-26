<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
    <nav :class="{sidebar: true}">
      <header class="logo">
        <router-link to="/app/dashboard">
          <img src="../../assets/signature/logo.png" alt="vncs" width="50" />
          <span class="fw-semi-bold">VSiEM</span>Search
        </router-link>
      </header>
      <ul class="nav">
        <h5 class="d-sm-down-none" style="text-align:center;margin-left:15%;margin-right:auto;">
          {{ $t('sidebar.overview') }}
          <a class="actionLink">
            <i class="fa fa-home" style="padding-left: 10px"/>
          </a>
        </h5>

    <!-- <h5 class="navTitle">OVERVIEW</h5> -->
        <NavLink
          :activeItem="activeItem"
          :header="$t('sidebar.dashboard')"
          link="/app/dashboard"
          iconName="fa fa-bar-chart-o"
          index="dashboard"
          isHeader
        />
        
        <NavLink
          :header="$t('sidebar.monitoring')"
          link="/app/monitoring"
          iconName="fa fa-eye"
          index="monitoring"
          isHeader
        />
        <NavLink
          :header="$t('sidebar.advanced_threat')"
          link="/app/advanced_threat"
          iconName="fa fa-cubes"
          index="advanced_threat"
          isHeader
        />
        <NavLink
          :header="$t('sidebar.investigation')"
          link="/app/investigation"
          iconName="fa fa-search"
          index="investigation"
          isHeader
        />
        <NavLink
          :header="$t('sidebar.executive_view')"
          link="/app/executive_view"
          iconName="fa fa-desktop"
          index="executive_view"
          isHeader
        />
        <NavLink
          :header="$t('sidebar.health')"
          link="/app/health"
          iconName="fa fa-shield"
          index="health"
          isHeader
        />
        <NavLink
          :header="$t('sidebar.query_tools')"
          link="/app/query"
          iconName="fa fa-search"
          index="query"
          isHeader
        />
        <NavLink
          :header="$t('sidebar.correlation_rules')"
          link="/app/rules"
          iconName="fa fa-retweet"
          index="rules"
          isHeader
        />
        <NavLink
          :header="$t('sidebar.alerts')"
          link="/app/alerts"
          iconName="fa fa-bell-o"
          index="alerts"
          isHeader
        />

      </ul>
      <!--throw>
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
      <-->
    </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: { NavLink },
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
