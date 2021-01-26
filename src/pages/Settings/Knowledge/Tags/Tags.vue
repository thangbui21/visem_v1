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
            <a href="#">List by field value pair</a>
            <b-button v-b-modal.new-field-value size="sm" variant="default" style="float: right">+Add new</b-button>
            <NewValuePair />
          </b-list-group-item>
          <b-list-group-item variant="primary">
            <a href="#">List by tag name</a>
            <b-button  size="sm" variant="default" style="float: right">+Add new</b-button>
            
          </b-list-group-item>
          <b-list-group-item>
            <a href="#" >All unique tag objects</a>
            <b-button v-b-modal.modal-prevent-closing size="sm" variant="default" style="float: right">+Add new</b-button><NewTagObject />

          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NewValuePair from "./Modal/NewValuePair"
import NewTagObject from "./Modal/NewTagObject"
export default {
  name: "Tag",
  components: {NewValuePair, NewTagObject},
  data() {
    return {
      test: NewTagObject.tagName
    };
  },
  methods: {

  }
};
</script>

