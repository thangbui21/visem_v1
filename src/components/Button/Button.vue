<template>
    <v-btn
        small
        dark
        style="background:rgb(71, 77, 132)"
        @click="EventClick"
        :href="href"
    >{{ label }}
    </v-btn>
</template>

<script>
export default {
    name: "Button",
    props: {
        label: {
            type: String
        },
        href: {
            type: String,
        }
    },
    data() {
    },
    methods: {
        EventClick: function(){
            this.$emit('event-click');
        }
    }
}
</script>

<style></style>