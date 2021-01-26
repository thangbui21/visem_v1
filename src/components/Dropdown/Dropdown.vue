<template>
    <v-select
        small
        dark
        style="background:rgb(71, 77, 132)"
        :items="items"
    >{{label}}</v-select>
</template>

<script>
export default {
    name: "dropdown",
    props: {
        items: {
            type: Array,
            description: "data for dropdown"
        },
        label: {
            type: String,
            description: "name of dropdown"
        }
    },
    data() {
    },
    methods: {
    }
}
</script>

<style></style>