<template>
  <div>
    <b-table
      striped
      class="b-table"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
    ></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {

      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "country", sortable: true },
        { key: "count", sortable: true },
      ],
      items: [
        {
          isActive: true,
          country: "China",
          count: 1183,
          //   _cellVariants: {
          //     count: "danger",
          //   },
        },
        {
          isActive: true,
          country: "United States",
          count: 369,
        },
        {
          isActive: true,
          country: "Japan",
          count: 206,
        },
        {
          isActive: true,
          country: "Vietnam",
          count: 97,
        },
        {
          isActive: true,
          country: "Ukraine",
          count: 91,
        },
                {
          isActive: true,
          country: "Thailand",
          count: 78,
        },
                        {
          isActive: true,
          country: "HongKong",
          count: 159,
        },
      ],
      
    };
  },
};
</script>
<style lang="scss">
.b-table {
  text-transform: capitalize;
  color: black;
}
</style>