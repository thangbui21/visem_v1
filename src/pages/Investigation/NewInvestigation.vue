<template>
  <div>
    <b-modal
      size="lg"
      scrollable
      id="new-inves"
      ref="modal-new-inves"
      title="Create New Investigation"
      hide-footer
    >
      <b-form @submit="onSubmit" @reset="onReset">
        <b-row>
          <b-col cols="3" sm="3">
            <b-form-group
              style="float: right; margin-top: 6px"
              id="input-group-1"
              label="Tile"
              label-for="input-1"
            ></b-form-group>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-input
              id="input-1"
              v-model="form.tile"
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
              label="Status"
              label-for="input-2"
            ></b-form-group>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-select style="width: 25%"
              id="input-2"
              v-model="form.status"
              :options="statusOpt"
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
        <div class="modal-footer">
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button type="submit" variant="primary"
            >Start Investigation</b-button
          >
          <b-button type="button" variant="success">Save</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        tile: "",
        status: "new",
        description: "",
      },
      statusOpt: [
        { text: "New", value: "new" },
        { text: "In Progress" },
        { text: "Pending" },
        { text: "Closed" },
      ],
    };
  },

  methods: {
    onReset(evt) {
      evt.preventDefault();
      this.form.tile = "";
      this.form.status = "new";
      this.form.description = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      this.$refs["modal-new-inves"].hide();
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      this.$refs["modal-new-inves"].hide();
      location.replace("/app/query")
    },
    onSave() {
      alert(JSON.stringify(this.modal));
    },
  },
};
</script>






