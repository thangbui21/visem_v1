<template>
  <div>
    <b-modal
      id="modal-tag-object"
      ref="modal"
      title="Add new"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Tag name</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-group
              :state="tagNameState"
              label-for="tag-name"
              invalid-feedback="Tag name is required"
            >
              <b-form-input
                ref="tag_name"
                id="tag-name"
                v-model="tagName"
                :state="tagNameState"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <!--Field name -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Field name</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-group
              :state="fieldNameState"
              label-for="field-name"
              invalid-feedback="Field Name is required"
            >
              <b-form-input
                ref="field_name"
                id="field-name"
                v-model="fieldName"
                :state="fieldNameState"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <!--Field name -->
        <b-row>
          <b-col cols="3" sm="3">
            <label style="float: right; margin-top: 6px">Field value</label>
          </b-col>
          <b-col cols="9" sm="9">
            <b-form-group
              :state="fieldValueState"
              label-for="field-value"
              invalid-feedback="Field value is required"
            >
              <b-form-input
                ref="field_value"
                id="field-value"
                v-model="fieldValue"
                :state="fieldValueState"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <div class="modal-footer">
          <b-button type="button" variant="default" @click="cancel()"
            >Cancel</b-button
          >
          <b-button type="button" variant="success" @click="handleSubmit()"
            >Save</b-button
          >
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagName: "",
      tagNameState: null,
      fieldName: "",
      fieldNameState: null,
      fieldValue: "",
      fieldValueState: null,
    };
  },
  methods: {
    checkFormValidity() {
      // Ăn theo $refs
      const valid1 = this.$refs.tag_name.checkValidity();
      this.tagNameState = valid1;
      const valid2 = this.$refs.field_name.checkValidity();
      this.fieldNameState = valid2;
      const valid3 = this.$refs.field_value.checkValidity();
      this.fieldValueState = valid3;
      return valid1, valid2, valid3;
    },
    resetModal() {
      this.tagName = "";
      this.tagNameState = null;
      this.fieldName = "";
      this.fieldNameState = null;
      this.fieldValue = "";
      this.fieldValueState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    cancel() {
      this.$bvModal.hide("modal-prevent-closing");
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      alert(this.tagName + this.fieldName + this.fieldValue);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>