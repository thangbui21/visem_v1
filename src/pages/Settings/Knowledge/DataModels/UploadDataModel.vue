<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="upload-data-model"
      ref="modal-new-data-model"
      title="Upload New Data Model"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- File -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">File</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-input-group style="width: 100%">
              <template>
                <b-form-file
                  v-model="file"
                  :state="Boolean(file)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </template>
            </b-input-group>
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
              required
              invalid-feedback="ID is required"
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
                v-on:click="changeItem('app', a.text)"
                >{{ a.text }}</b-dropdown-item
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
          >Upload</b-button
        >
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

      //value in modal.
      file: null,

      id: null,
      idState: null,

      app: 'Enterprise Security',
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






