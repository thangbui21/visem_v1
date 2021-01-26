<template>
  <div >
    <Widget :style="status" style="height: 165px">
      <va-card class="mb-4">
        <h6>{{ title }}</h6>
        <p class="display-4" style="color: white; text-align: center">
          <strong>{{ value }}</strong>
        </p>
        <p style="text-align: center">{{ trend }}</p>
      </va-card>
    </Widget>
  </div>
</template>

<script>
import Widget from "../../components/Widget/Widget";

export default {
  name: "single-value",
  components: {
    Widget,
  },
  props: {
    title: {
      type: String,
      description: "title single chart",
    },
    value: {
      type: Number,
      description: "Value for single chart",
    },
    trend: {
      type: String,
      description: "Trend",
    },
    status: {
      type: String,
    }
  },
  data() {
    return {};
  },
};
</script>