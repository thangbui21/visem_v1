<template>
    <v-data-table
        dark
        class="elevation-1"
        style="background-color:transparent;"
        loading
        hide-default-footer
        :headers="headers"
        :items="items"
        :dense="dense"
        :single-select="single-select"
        :item-key="item_key"
        :show-select="show_select"
    >
    </v-data-table>
</template>

<script>
export default {
    name: "DataTable2",
    props: ["headers", "items", "dense", "single-select", "item_key", "show_select"],
}
</script>

<style></style>