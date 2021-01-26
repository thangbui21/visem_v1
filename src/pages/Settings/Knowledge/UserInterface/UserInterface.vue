<template>
  <div class="tables-basic">
    <h2 class="page-title">
      <span class="fw-semi-bold">User interface</span>
      <h5>Create and edit views, dashboards, and navigation menus.</h5>
    </h2>

    <b-row>
      <b-col lg="9" sm="9" xs="12">
        <b-list-group>
          <b-list-group-item>
            <a href="#">Time ranges</a>
            <b-button size="sm" variant="default" style="float: right">+Add new</b-button>
          </b-list-group-item>
          <b-list-group-item variant="primary">
            <a href="#">Views</a>
          </b-list-group-item>
          <b-list-group-item>
            <a href="#">View PDF Scheduling</a>
            <b-button size="sm" variant="default" style="float: right">+Add new</b-button>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Tables",
  components: {},
  data() {
    return {};
  },
};
</script>

