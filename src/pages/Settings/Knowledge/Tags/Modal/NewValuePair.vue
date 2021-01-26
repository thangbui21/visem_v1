<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="new-field-value"
      ref="modal-new-field-value"
      title="Add new"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Field Value Pair -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px"
              >Field value pair</label
            >
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="field"
              v-model="field"
              placeholder="example: host=vncs.com"
              :state="fieldState"
              required
              invalid-feedback="Field value pair is required"
            ></b-form-input>
          </b-col>
        </b-row>

        <!-- Tag name -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Tag name</label>
          </b-col>
          <b-col 
          id="input"
          cols="9" sm="9">
            <p>Enter one tag per textfield</p>
            

            <b-row>
              <b-col cols="9" sm="9" id="test" @click="addAnotherField($event)">
                <div>
                  <b-form-input
                    style="width: 100%"
                    id="id"
                    v-model="id"
                    :state="idState"
                  ></b-form-input></div
              ></b-col>
              <!--Thêm action-->
              <b-col sm="2"
                ><b-button style="" variant="default" size="sm"
                  >Delete</b-button
                ></b-col
              >
            </b-row>


            <b-button style="margin-top: 15px" variant="default" size="sm"
              >+ Add another field</b-button
            >
          </b-col>
        </b-row>
      </form>

      <div class="modal-footer">
        <b-button type="button" variant="default" @click="hideModal()"
          >Cancel</b-button
        >

        <b-button type="button" variant="success" @click="CreateAlert()"
          >Save</b-button
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

      owners: [{ text: "thangbv" }, { text: "daont" }, { text: "duongbv" }],

      //value in modal.

      title: null,
      titleState: null,

      id: null,
      idState: null,

      app: null,

      description: null,
    };
  },

  methods: {
    // addAnotherField: function (event) {
    // let el = event.currentTarget;
    // let currentNode = el.innerHTML
    // el.innerHTML = currentNode+'<div><b-form-input style="width: 100%" id="id" v-model="id" :state="idState"></b-form-input></div>';
    // },

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
      this.$refs["modal-new-field-value"].hide();
    },

    CreateAlert() {
      this.$refs["modal-new-field-value"].hide();
    },
  },
};
</script>






