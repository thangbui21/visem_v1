<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="new_index"
      ref="modal-new-index"
      title="New Index"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <!-- <hr style="background-color: white"> </hr>-->
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Index Name-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Index Name</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="name"
              v-model="name"
              :state="nameState"
              required
              invalid-feedback="Index Name is required"
            ></b-form-input>
          </b-col>
        </b-row>

        <!--Index Data Type-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Index Data Type</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-button-group style="width: 100%">
              <b-button variant="default" :pressed="is_event" @click="single_select_index_datatype($event)"
                >Event</b-button
              >
              <b-button :pressed="!is_event" @click="single_select_index_datatype($event)" variant="default">Mertrics</b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <!--Home Path-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Home Path</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              placeholder="optional"
            ></b-form-input>
          </b-col>
        </b-row>

        <!--Data Integrity Check-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px"
              >Data Integrity Check</label
            >
          </b-col>
          <b-col cols="9" sm="9">
            <b-button-group style="width: 100%">
              <b-button :pressed="is_enable" @click="single_select_data_integrity($event)" variant="default" style=""
                >Enable</b-button
              >
              <b-button :pressed="!is_enable" @click="single_select_data_integrity($event)" variant="default">Disable</b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <!--Max Size of Entire Index-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Max Size</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-input-group>
              <b-form-input placeholder="200"></b-form-input>

              <template v-slot:append>
                <b-dropdown text="TB" variant="default">
                  <b-dropdown-item>Action A</b-dropdown-item>
                  <b-dropdown-item>Action B</b-dropdown-item>
                </b-dropdown>
              </template>
            </b-input-group>
          </b-col>
        </b-row>

       <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Max Size</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-input-group>
              <b-form-input placeholder="auto"></b-form-input>

              <template v-slot:append>
                <b-dropdown text="TB" variant="default">
                  <b-dropdown-item>Action A</b-dropdown-item>
                  <b-dropdown-item>Action B</b-dropdown-item>
                </b-dropdown>
              </template>
            </b-input-group>
          </b-col>
        </b-row>


        
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Home Path</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              placeholder="optional"
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
              ref="App"
              text="Search & Reporting"
              variant="default"
              style="width: 100%"
              menu-class="w-100"
            >
              <b-dropdown-item 
                    v-for="app in Apps"
                    :key="app.text"
                    v-on:click="changeItem('App', app.text)">{{app.text}}</b-dropdown-item>

            </b-dropdown>
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
      // Tab
      tabIndex: 1,
      is_enable: true,
      is_event: true,
      Apps: [
        {text: "VNCS Web Analytics 1"},
        {text: "VNCS Web Analytics 2"},
        {text: "VNCS Web Analytics 3"},
      ],

      //value in modal.
      name: "",
      nameState: null,
      submittedNames: [],
      titleState: null,
      title: null,
      desState: null,
      description: null,
      searchState: null,
      search: null,
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
      this.$refs["modal-new-index"].hide();
    },

    CreateAlert() {
      this.$refs["modal-new-index"].hide();
    },

    single_select_index_datatype: function(event){
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed') === "true");
      if(bool != this.is_event){
        this.is_event = false;
      }else{
        this.is_event = true;
      }
    },

    single_select_data_integrity: function(event){
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed') === "true");
      if(bool != this.is_enable){
        this.is_enable = false;
      }else{
        this.is_enable = true;
      }
    }
  },
};
</script>






