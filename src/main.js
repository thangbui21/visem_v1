// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Toasted from 'vue-toasted';
import VCalendar from 'v-calendar';
import VueApexCharts from 'vue-apexcharts';
import VModal from 'vue-js-modal/dist/index.nocss.js';
import 'vue-js-modal/dist/styles.css';
import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import i18n from "./i18n";
//For highcharts-map
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import mapInit from "highcharts/modules/map";
import mapData from "@highcharts/map-collection/custom/world.geo.json";
import GB from "@highcharts/map-collection/countries/gb/gb-all.geo.json";
import in_all from "@highcharts/map-collection/countries/in/in-all.geo.json";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";


mapInit(Highcharts);
Highcharts.maps["worldmap"] = mapData;

Highcharts.maps["gb-all"] = GB;

Highcharts.maps["in-all"] = in_all;

Vue.use(HighchartsVue);
Vue.use(BootstrapVue);
Vue.use(VCalendar, {
    firstDayOfWeek: 2
});
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
    },
});

Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.use(Toasted, {duration: 10000});

Vue.use(Vuetify)
Vue.use(VModal)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    store,
    i18n,
    router,
    render: h => h(App),
});
