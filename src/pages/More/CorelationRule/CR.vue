<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="new-cr"
      ref="new_content"
      title="New Correlation Search"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px"
              ><strong>Settings</strong></label
            >
          </b-col>
        </b-row>

        <!--Title-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Title</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="title-input"
              v-model="title"
              :state="titleState"
              required
              placeholder="Title"
              invalid-feedback="Title is required"
            ></b-form-input>
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
              id="name-input"
              v-model="description"
              :state="desState"
              placeholder="optional"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <!--Search -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Search</label>
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

        <!--App -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">App</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              id="app-dropdown"
              :text="app_dropdown"
              style="width: 100%"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item
                v-for="a in apps"
                :key="a.text"
                v-on:click="changeItem('App', a.text)"
              >{{a.text}}
              </b-dropdown-item>

            </b-dropdown>
          </b-col>
        </b-row>

        <!--Permission -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Permission</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-button :pressed="is_permission_choosed" @click="single_select_permission($event)" variant="default">Private</b-button>
              <b-button :pressed="!is_permission_choosed" @click="single_select_permission($event)" variant="default">Share in App</b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <!--Alert Type -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Alert Type</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-button :pressed="is_alerttype_choosed" @click="single_select_alert_type($event)" variant="default">Scheduled</b-button>
              <b-button :pressed="!is_alerttype_choosed" @click="single_select_alert_type($event)" variant="default">Real-time</b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <!--RUN -->
        <b-row>
          <b-col cols="3" sm="3"></b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              id="run"
              ref="Run"
              text="Run every week"
              style="width: 100%"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item
                v-for="r in runs"
                :key="r.text"
                v-on:click="changeItem('Run', r.text)"
              >{{r.text}}
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3" sm="3"></b-col>
          <b-col cols="9" sm="9">
            <label><strong>On</strong></label>
            <b-dropdown
              id="day-dropdown"
              :text="day_dropdown"
              style="float: left"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item
                v-for="d in days"
                :key="d.text"
                v-on:click="changeItem('Day', d.text)"
              >{{d.text}}
              </b-dropdown-item>
            </b-dropdown>

            <label style="margin-left: 10px"><strong>at</strong></label>
            <b-dropdown
              id="hours-dropdown"
              :text="hours_dropdown"
              style="float: right"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item>1:00</b-dropdown-item>
            </b-dropdown>
          </b-col>

 
        </b-row>

        <!--Expires-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Expires</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-input-group>
              <b-form-input placeholder="24"></b-form-input>
              <template v-slot:append>
                <b-dropdown text="hour(s)" variant="default">
                  <b-dropdown-item>8</b-dropdown-item>
                </b-dropdown>
              </template>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px"
              ><strong>Trigger Conditions</strong></label
            >
          </b-col>
        </b-row>

      <!--Trigger alert when -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Trigger alert when</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              id="app"
              ref="App"
              text="Number of Results"
              style="width: 100%"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item
                v-for="a in apps"
                :key="a.text"
                v-on:click="changeItem('App', a.text)"
              >{{a.text}}
              </b-dropdown-item>

            </b-dropdown>
          </b-col>
        </b-row>



        <b-row>
          <b-col cols="3" sm="3">
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-dropdown
                id="hours-dropdown"
                :text="time_range_dropdown"
                style="float: right"
                menu-class="w-100"
                variant="default"
              >
              </b-dropdown>
              <b-input text="6:00">Yes</b-input>
            </b-button-group>
          </b-col>
        </b-row>

        <!-- Tringle Action -->
        <b-row>
          <b-col cols="3" sm="3"></b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              id="alertwhen"
              :text="number_of_result"
              style="width: 100%"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item>App 1</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>

        <!--Trigger -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Trigger</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-button :pressed="is_alerttype_choosed" variant="default">Once</b-button>
              <b-button :pressed="!is_alerttype_choosed" variant="default">For each result</b-button>
            </b-button-group>
          </b-col>
        </b-row>
      </form>

      <div class="modal-footer">
        <b-button type="button" variant="default" @click="hideModal()"
          >Close</b-button
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
      name: "",
      is_permission_choosed: true,
      is_alerttype_choosed: true,
      app_dropdown: 'App 1',
      hours_dropdown: '1:00',
      day_dropdown: 'Tuesday',
      time_range_dropdown: '6:00',
      number_of_result: 'Number of Results',
      nameState: null,
      submittedNames: [],
      titleState: null,
      title: null,
      desState: null,
      description: null,
      searchState: null,
      search: null,


      // Values dropdown
      apps: [
        {text: "V-SIEM"},
        {text: "Enterprise Security"}
      ],

      runs: [
        {text: "week"},
        {text: "month"}
      ],

      days: [
        {text: "Monday", value: "monday"},        
        {text: "Tuesday", value: "tuesday"},     
        {text: "Wednesday"},       
      ],


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
      this.$refs["new_content"].hide();
    },

    CreateAlert() {
      this.$refs["new_content"].hide();
    },

    single_select_permission: function(event){
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed') === "true");
      if(bool != this.is_permission_choosed){
        this.is_permission_choosed = false;
      }else{
        this.is_permission_choosed = true;
      }
    },

    single_select_alert_type: function(event){
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed') === "true");
      if(bool != this.is_alerttype_choosed){
        this.is_alerttype_choosed = false;
      }else{
        this.is_alerttype_choosed = true;
      }
    },
  },
};
</script>

