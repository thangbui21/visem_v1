<template>
  <div>
    <b-row>
      <b-col cols="3" md="3"></b-col>
      <b-col cols="12" md="6">
        <b-card>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-row>
              <b-col cols="3" md="3">
                <label style="float: right; margin-top: 6px"
                  ><strong>Correlation Search</strong></label
                >
              </b-col>
            </b-row>

            <!-- SearchName -->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-1"
                  label="Search Name"
                  label-for="input-1"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-form-input
                  id="input-1"
                  v-model="form.searchName"
                  required
                  placeholder=""
                ></b-form-input>
              </b-col>
            </b-row>

            <!-- App -->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-2"
                  label="App"
                  label-for="input-2"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-form-select
                  id="input-2"
                  v-model="form.app"
                  :options="apps"
                  required
                ></b-form-select>
              </b-col>
            </b-row>

            <!-- Description -->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-3"
                  label="Description"
                  label-for="input-3"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-form-textarea
                  id="input-3"
                  v-model="form.description"
                ></b-form-textarea>
              </b-col>
            </b-row>

            <!-- Mode -->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-4"
                  label="Mode"
                  label-for="input-4"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-button-group style="width: 100%">
                  <b-button
                    variant="default"
                    :pressed="form.isGuild"
                    @click="form.isGuild = true"
                    >Guild</b-button
                  >
                  <b-button
                    variant="default"
                    :pressed="!form.isGuild"
                    @click="form.isGuild = false"
                    >Manual</b-button
                  >
                </b-button-group>
              </b-col>
            </b-row>

            <!-- Search -->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-5"
                  label="search"
                  label-for="input-5"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-form-textarea
                  id="input-5"
                  v-model="form.search"
                ></b-form-textarea>
              </b-col>
            </b-row>

            <!--Time Range-->
            <b-row>
              <b-col cols="3" md="3">
                <label style="float: right; margin-top: 6px"
                  ><strong>Time Range</strong></label
                >
              </b-col>
            </b-row>

            <!--Earliest Time-->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-6"
                  label="Earliest Time"
                  label-for="input-6"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-form-input
                  id="input-5"
                  v-model="form.earliestTime"
                  required
                  placeholder=""
                ></b-form-input>
              </b-col>
            </b-row>

            <!--Latest Time-->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-7"
                  label="Earliest Time:"
                  label-for="input-7"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-form-input
                  id="input-7"
                  v-model="form.latestTime"
                  required
                  placeholder=""
                ></b-form-input>
              </b-col>
            </b-row>

            <!-- Scheduling -->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-8"
                  label="Scheduling"
                  label-for="input-8"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-button-group style="width: 100%">
                  <b-button
                    variant="default"
                    :pressed="form.isRealTime"
                    @click="form.isRealTime = true"
                    >Real Time</b-button
                  >
                  <b-button
                    variant="default"
                    :pressed="!form.isRealTime"
                    @click="form.isRealTime = false"
                    >Continuos</b-button
                  >
                </b-button-group>
              </b-col>
            </b-row>

            <!--Trigger Condition-->
            <b-row>
              <b-col cols="3" md="3">
                <label style="float: right; margin-top: 6px"
                  ><strong>Trigger Condition</strong></label
                >
              </b-col>
            </b-row>

            <!-- Condition -->
            <b-row>
              <b-col cols="3" sm="3">
                <b-form-group
                  style="float: right; margin-top: 6px"
                  id="input-group-9"
                  label="Trigger Alert When"
                  label-for="input-9"
                ></b-form-group>
              </b-col>
              <b-col cols="9" sm="9">
                <b-form-select
                  id="input-9"
                  v-model="form.condition"
                  :options="conditions"
                  required
                ></b-form-select>
              </b-col>
            </b-row>

            <div class="modal-footer">
              <b-button type="reset" variant="danger">Reset</b-button>
              <b-button type="submit" variant="primary">Submit</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        searchName: "",
        app: null,
        description: "",
        isGuild: true,
        search: "",
        earliestTime: "",
        latestTime: "",
        isRealTime: true,
        condition: null,
      },
      apps: [
        { text: "Select One", value: null },
        "Telegram Alert Action",
        "V-SIEM",
        "Enterprise Solution",
      ],
      conditions: [
        { text: "Number of Result", value: null },
        "10",
        "100",
        "1000",
      ],

      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },

    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.searchName = "";
      this.form.app = "";
      this.form.description = "";
      this.form.isGuild = true;
      this.form.search = "";
      this.form.earliestTime = "";
      this.form.latestTime = "";
      this.form.isRealTime = true;
      this.form.condition = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },

  computed: {},
};
</script>