<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="source_type"
      ref="modal-source-type"
      title="Create Source Type"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <!-- <hr style="background-color: white"> </hr>-->
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!--Name-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Name</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              style="width: 100%"
              id="name"
              v-model="name"
              :state="titleState"
              required
              invalid-feedback="Name is required"
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
              id="description"
              v-model="description"
              :state="desState"
              placeholder="optional"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <!--Destination app-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Destination app</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              ref="App"
              text="VNCS"
              variant="default"
              style="width: 100%"
              menu-class="w-100"
            >
              <b-dropdown-item
                v-for="app in destApp"
                :key="app.text"
                v-on:click="changeItem('App', app.text)"
                >{{app.text}}</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        </b-row>

        <!--Category-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Category</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              ref="Category"
              text="Category"
              variant="default"
              menu-class="w-100"
              style="width: 100%"
            >
              <b-dropdown-item
                v-for="c in Categories"
                :key="c.text"
                v-on:click="changeItem('Category', c.text)"
              >
              {{c.text}}
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>

        <!--Indexed Extractions-->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px"
              >Indexed Extractions</label
            >
          </b-col>
          <b-col cols="9" sm="9">
            <b-dropdown
              ref="Extractions"
              text="none"
              menu-class="w-100"
              variant="default"
              style="width: 100%"
            >
              <b-dropdown-item 
              v-for="e in Extractions"
                :key="e.text"
                v-on:click="changeItem('Extractions', e.text)"
              >{{e.text}}</b-dropdown-item>
              
            </b-dropdown>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-tabs v-model="tabIndex">
              <!--TAB1-->
              <b-tab title="Event Breaks" active>
                <div><p>Define event boundaries for incoming data.</p></div>
                <div>
                  <b-row>
                    <b-col cols="3" sm="3">
                      <label style="float: right; margin-top: 6px">none</label>
                    </b-col>
                    <b-col cols="9" sm="9">
                      <b-button-group style="width: 100%">
                        <b-button
                          variant="default"
                          style="margin-right: 5px"
                          :pressed="true"
                          >Auto</b-button
                        >
                        <b-button variant="default" style="margin-right: 5px"
                          >Every Line</b-button
                        >
                        <b-button variant="default" v-b-toggle.regex
                          >Regex</b-button
                        >
                      </b-button-group>

                      <b-collapse id="regex">
                        <b-row>
                          <b-col cols="2" sm="2">
                            <label style="float: right; margin-top: 6px"
                              >Pattern</label
                            >
                          </b-col>
                          <b-col cols="10" sm="10">
                            <b-form-input
                              style="width: 100%"
                              id="name"
                              v-model="name"
                              :state="titleState"
                              required
                              invalid-feedback="Name is required"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                      </b-collapse>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>

              <!--TAB2-->
              <b-tab title="Timestamp">
                <div>
                  <p>
                    Determine how timestamps for the incoming data are defined.
                  </p>
                </div>
                <div>
                  <b-row>
                    <b-col cols="2" sm="2">
                      <label style="float: right; margin-top: 6px"
                        >Extraction</label
                      >
                    </b-col>
                    <b-col cols="10" sm="10">
                      <b-button-group style="width: 100%">
                        <b-button
                          variant="default"
                          style="margin-right: 5px"
                          :pressed="true"
                          >Auto</b-button
                        >
                        <b-button variant="default" style="margin-right: 5px"
                          >Current time</b-button
                        >

                        <b-button variant="default" style="margin-right: 5px"
                          >Advanced</b-button
                        >
                        <b-button variant="default">Conguration file</b-button>
                      </b-button-group>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
            </b-tabs>
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

      destApp: [
        { text: "V ES" },
        { text: "Enterprise Security" },
        { text: "Another app" },
      ],

      Categories: [
        { text: "Custom" },
        { text: "Database" },
        { text: "Network Security" },
      ],

      Extractions: [
        { text: "json" },
        { text: "csv" },
        { text: "xml" },
      ],

      //Các biến  
      name: null,
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
      this.$refs["modal-source-type"].hide();
    },

    CreateAlert() {
      this.$refs["modal-source-type"].hide();
    },
  },
};
</script>






