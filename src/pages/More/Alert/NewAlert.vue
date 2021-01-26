<template>
  <div>
    <!--Xem lại thuộc tính: v-b-modal.modal-prevent-closing -->
    <!-- <b-button v-b-modal.modal1 v-b-modal.modal-scrollable variant="default">New Alert</b-button> -->
    <!-- 
    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0"></div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames" v-bind:key="name">{{ name }}</li>
      </ul>
    </div>
    -->
    <b-modal
      size="lg"
      scrollable
      id="modal1"
      ref="modal-alert"
      title="Create Alert"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <!-- <hr style="background-color: white"> </hr>-->
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!--Title-->
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
        <!--Description-->
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
        <!--Search -->
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

        <!--App -->
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

        <!--Permission -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Permission</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-button variant="default">Private</b-button>
              <b-button variant="default">Share in App</b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <!--Alert Type -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Alert Type</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-button variant="default">Scheduled</b-button>
              <b-button variant="default">Real-time</b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <!--RUN -->
        <b-row>
          <b-col cols="3" sm="3"></b-col>
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
          <b-col cols="3" sm="3"></b-col>
          <b-col cols="3" sm="3">
            <b-dropdown
              id="day-dropdown"
              text="Monday"
              style="float: left"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item>Tue</b-dropdown-item>
              <b-dropdown-item>Wed</b-dropdown-item>
              <b-dropdown-item>Thu</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col cols="4" sm="4">
            <b-dropdown
              id="hours-dropdown"
              text="6:00"
              style="float: right"
              menu-class="w-100"
              variant="default"
            >
              <b-dropdown-item>1:00</b-dropdown-item>
              <b-dropdown-item>1:00</b-dropdown-item>
              <b-dropdown-item>1:00</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>

        <!--Expires-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Time Range</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-input text="6:00">Yes</b-input>
              <b-dropdown
                id="hours-dropdown"
                text="6:00"
                style="float: right"
                menu-class="w-100"
                variant="default"
              >
                <b-dropdown-item>1:00</b-dropdown-item>
                <b-dropdown-item>1:00</b-dropdown-item>
                <b-dropdown-item>1:00</b-dropdown-item>
              </b-dropdown>
            </b-button-group>
          </b-col>
        </b-row>

        <!-- Tringle Action -->
        <b-row>
          <b-col cols="3" sm="3"></b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              id="alertwhen"
              text="Number of Results"
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

        <!--Trigger -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top:6px;">Alert Type</label>
          </b-col>
          <b-col cols="9" sm="9">
            <!--Code thêm xử lý sự kiện-->
            <b-button-group style="width: 100%">
              <b-button variant="default">Scheduled</b-button>
              <b-button variant="default">Real-time</b-button>
            </b-button-group>
          </b-col>
        </b-row>

        <!--
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
        -->
        <!-- <hr style="background-color: white"> </hr>-->
      </form>

      <div class="modal-footer">
        <b-button type="button" variant="default" @click="hideModal()">Close</b-button>
        <b-button type="button" variant="default" @click="CreateAlert()">Create Report</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      this.$refs["modal-alert"].hide();
    },

    CreateAlert() {
      this.$refs["modal-alert"].hide();
    },
  },
};
</script>






