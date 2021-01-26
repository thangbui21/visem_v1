<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="new-data-model"
      ref="modal-new-data-model"
      title="New Data Model"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Title -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Tile</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="title"
              v-model="title"
              placeholder="Enter a title"
              :state="titleState"
              required
              invalid-feedback="Title is required"
            ></b-form-input>
          </b-col>
        </b-row>

 <!-- ID -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">ID</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="id"
              v-model="id"
              :state="idState"
            ></b-form-input>
          </b-col>
        </b-row>

          <!--App-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">App</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              ref="app"
              :text="app"
              variant="default"
              style="width: 100%"
              menu-class="w-100"
            >
              <b-dropdown-item
                v-for="a in apps"
                :key="a.text"
                v-on:click="changeItem('App: ', a.text)"
                >{{ a.text }}</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        
        </b-row>
      

        <!--Description-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Description</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-textarea
              style="width: 100%"
              id="description"
              v-model="description"
              placeholder="Enter a description (optional)"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </form>

      <div class="modal-footer">
        <b-button type="button" variant="default" @click="hideModal()"
          >Cancel</b-button
        >
        
        <b-button type="button" variant="success" @click="CreateAlert()"
          >Create</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
     app: 'Enterprise Security',
     apps: [
        { text: "Enterprise Security" },
        { text: "Pending" },
        { text: "Closed" },
      ],

      owners: [
        { text: "thangbv" },
        { text: "daont" },
        { text: "duongbv" },
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
      this.app = item;
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
      this.$refs["modal-new-data-model"].hide();
    },

    CreateAlert() {
      this.$refs["modal-new-data-model"].hide();
    },
  },
};
</script>






