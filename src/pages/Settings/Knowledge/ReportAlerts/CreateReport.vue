<template>
  <div>
    <b-modal
      id="modal2"
      ref="modal-report"
      title="Create Report"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <!-- <hr style="background-color: white"> </hr>-->
      <v-divider :dark="true" style="margin-top:-10px;"></v-divider>
      <form ref="form" @submit="handleSubmit">
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Title</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="title-input"
              v-model="title"
              :state="titleState"
              required
              invalid-feedback="Title is required"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Description</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-textarea
              style="width: 100%"
              id="name-input"
              v-model="description"
              :state="desState"
              placeholder="optional"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Search</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="name-input"
              v-model="search"
              :state="searchState"
              required
              invalid-feedback="Search command is required"
              placeholder="enter search here..."
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Earliest time</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="name-input"
              v-model="earliest"
              :state="earliestState"
              required
              invalid-feedback="Time is required"
              placeholder="optional"
            ></b-form-input>
            <div>
              Optional time
              <a href="#" target="_blank">Learn more</a>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Latest time</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="name-input"
              v-model="latest"
              :state="latestState"
              required
              invalid-feedback="Time is required"
              placeholder="optional"
            ></b-form-input>
            <div>
              Optional time
              <a href="#" target="_blank">Learn more</a>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">App</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              id="app-dropdown"
              text="V-SIEM"
              style="width: 100%"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item>App 1</b-dropdown-item>
              <b-dropdown-item>App 2</b-dropdown-item>
              <b-dropdown-item>App 3</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Time Range</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-button :pressed="is_timerange_choosed" @click="single_select_timerange($event)" variant="default">Yes</b-button>
              <b-button :pressed="!is_timerange_choosed" @click="single_select_timerange($event)" variant="default">No</b-button>
            </b-button-group>
          </b-col>
        </b-row>
        <!-- <hr style="background-color: white"> </hr>-->
      </form>
      <hr />
      <div class="modal-footer">
        <b-button type="button" variant="default" @click="hideModal()">Close</b-button>
        <b-button type="button" variant="default" @click="handleSubmit()">Create Report</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
       name: "",
       is_timerange_choosed: true,
       nameState: null,
       submittedNames: [],
       desState: null,
       description: null,
       searchState: null,
       search: null,
       earliestState: null,
       earliest: null,
       latestState: null,
       latest: null,
       title: "",
       titleState: null,
       //submittedNames: [],

      // name: "",
      // nameState: null,
      // submittedNames: [],

      // name: "",
      // nameState: null,
      // submittedNames: [],
    };
  },
  methods: {
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
      this.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal2");
      });
    },
    hideModal() {
      this.$refs["modal-report"].hide();
    },

    CreateReport() {
      this.$refs["modal-report"].hide();
    },

    single_select_timerange: function(event){
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed') === "true");
      if(bool != this.is_timerange_choosed){
        this.is_timerange_choosed = false;
      }else{
        this.is_timerange_choosed = true;
      }
    }
  },
};
</script>






