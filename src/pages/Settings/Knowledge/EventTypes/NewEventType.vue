<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="new-event-type"
      ref="modal-new-event-type"
      title="New Data Model"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">

        <!-- Destination App -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Destination App</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              ref="App"
              text="Enterprise Security"
              variant="default"
              style="width: 100%"
              menu-class="w-100"
            >
              <b-dropdown-item
                v-for="a in apps"
                :key="a.text"
                v-on:click="changeItem('App', a.text)"
                >{{ a.text }}</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        </b-row>

        <!-- Name -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Name</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="name"
              v-model="name"
              :state="nameState"
              required
              invalid-feedback="Name is required"
            ></b-form-input>
          </b-col>
        </b-row>

        <!--Search string-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Search string</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-textarea
              style="width: 100%"
              id="search_string"
              v-model="search_str"
              required
              invalid-feedback="Search string is required"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <!-- Tags -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Tags</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="tags"
              v-model="tags"
              :state="tagstate"
            ></b-form-input>
          </b-col>
        </b-row>

        <!--Color-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Color</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              ref="color"
              text="primary"
              variant="default"
              style="width: 100%"
              menu-class="w-100"
            >
              <b-dropdown-item
                v-for="c in colors"
                :key="c.text"
                v-on:click="changeItem('color', c.text)"
                >{{ c.text }}</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        
        </b-row>
      
        <!-- Priority -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Priority</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              ref="priority"
              text="1(Highest)"
              variant="default"
              style="width: 100%"
              menu-class="w-100"
            >
              <b-dropdown-item
                v-for="p in priority"
                :key="p.text"
                v-on:click="changeItem('priority', p.text)"
                >{{ p.text }}</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        </b-row>
    
      </form>

      <div class="modal-footer">
        <b-button type="button" variant="default" @click="hideModal()"
          >Cancel</b-button
        >
        
        <b-button type="button" variant="success" @click="CreateAlert()"
          >Save</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
     apps: [
        { text: "Enterprise Security" },
        { text: "Pending" },
        { text: "Closed" },
      ],

             colors: [
        { text: "Enterprise Security" },
        { text: "Pending" },
        { text: "Closed" },
      ],
           priority: [
        { text: "Enterprise Security" },
        { text: "Pending" },
        { text: "Closed" },
      ],

      //value in modal.
      title: null,
      titleState: null,

      id: null,
      idState: null,

      description: null,
    };
  },

  methods: {
 changeItem: function (refName, item) {
      this.$refs[refName].text = item;
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    hideModal() {
      this.$refs["modal-new-event-type"].hide();
    },

    CreateAlert() {
      this.$refs["modal-new-event-type"].hide();
    },
  },
};
</script>






